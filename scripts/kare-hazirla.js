#!/usr/bin/env node
/* Mevsim karesi hazırlayıcı: düz (krem/beyaz) fonlu JPEG/PNG'yi şeffaf, kırpılmış PNG'ye çevirir.
 * Kullanım: node scripts/kare-hazirla.js img/mevsim/badem-kis.jpeg [diğer dosyalar...]
 *   --yukseklik=1400   çıktı yüksekliği (px, varsayılan 1400)
 *   --esik=34          krem kâğıt için en yüksek renk doygunluğu (max-min), varsayılan 34
 *   --kaynak           orijinali img/mevsim/kaynak/ altına taşı
 * Gereksinim: playwright (npm i -g playwright) ve Chromium. */
const fs = require("fs"), path = require("path");
const args = process.argv.slice(2);
const opt = { yukseklik: 1400, esik: 34, kaynak: false };
const files = args.filter(a => { const m = a.match(/^--(\w+)(?:=(.*))?$/); if (!m) return true; opt[m[1]] = m[2] === undefined ? true : Number(m[2]); return false; });
if (!files.length) { console.error("Dosya verin."); process.exit(1); }
let chromium;
try { chromium = require("playwright").chromium; } catch (e) { try { chromium = require(require("child_process").execSync("npm root -g").toString().trim() + "/playwright").chromium; } catch (e2) { console.error("playwright bulunamadı: npm i -g playwright"); process.exit(1); } }

(async () => {
  const b = await chromium.launch();
  const pg = await b.newPage();
  pg.on("console", m => { if (m.type() === "log") process.stdout.write("   " + m.text() + "\n"); });
  for (const f of files) {
    const ext = path.extname(f).toLowerCase();
    const mime = ext === ".png" ? "image/png" : ext === ".webp" ? "image/webp" : "image/jpeg";
    const dataUri = `data:${mime};base64,` + fs.readFileSync(f).toString("base64");
    const out = await pg.evaluate(async ({ dataUri, H, esik }) => {
      const img = new Image(); img.src = dataUri; await img.decode();
      const W0 = img.naturalWidth, H0 = img.naturalHeight;
      const c = document.createElement("canvas"); c.width = W0; c.height = H0;
      const ctx = c.getContext("2d", { willReadFrequently: true }); ctx.drawImage(img, 0, 0);
      const d = ctx.getImageData(0, 0, W0, H0), px = d.data, N = W0 * H0;
      // Sınıflar: (a) sıcak krem kâğıt → her yerde fon; (b) nötr beyaz/gri (dış fon, kâğıt kenarı, gölge) → yalnızca kenardan bağlantılıysa fon
      const warm = new Uint8Array(N), neutral = new Uint8Array(N);
      for (let i = 0; i < N; i++) {
        const r = px[i * 4], g = px[i * 4 + 1], bb = px[i * 4 + 2];
        const mx = Math.max(r, g, bb), mn = Math.min(r, g, bb), ch = mx - mn;
        if (mn > 190 && ch < esik && r - bb >= 8 && g - bb >= 4 && r - g <= 8) warm[i] = 1; // krem kâğıt: sıcak ama pembe değil (pembede r-g büyür)
        else if (ch < 10 && mn > 105) neutral[i] = 1;                                     // nötr beyaz / gri
      }
      const bg = new Uint8Array(N); const q = new Int32Array(N); let qh = 0, qt = 0;
      const push = (i) => { if ((neutral[i] || warm[i]) && !bg[i]) { bg[i] = 1; q[qt++] = i; } };
      for (let x = 0; x < W0; x++) { push(x); push((H0 - 1) * W0 + x); }
      for (let y = 0; y < H0; y++) { push(y * W0); push(y * W0 + W0 - 1); }
      while (qh < qt) { const i = q[qh++], x = i % W0; if (x > 0) push(i - 1); if (x < W0 - 1) push(i + 1); if (i >= W0) push(i - W0); if (i < N - W0) push(i + W0); }
      for (let i = 0; i < N; i++) if (warm[i]) bg[i] = 1; // kapalı iç boşluklardaki kâğıt da gitsin
      // krem kâğıda bitişik nötr açık pikseller (kâğıt üstündeki JPEG gürültüsü) → 2 tur genişleme
      for (let pass = 0; pass < 2; pass++) for (let i = 0; i < N; i++) if (neutral[i] && !bg[i]) {
        const x = i % W0;
        if ((x > 0 && bg[i - 1]) || (x < W0 - 1 && bg[i + 1]) || (i >= W0 && bg[i - W0]) || (i < N - W0 && bg[i + W0])) bg[i] = 1;
      }
      // kâğıt dokusu kırıntıları: açık, düşük doygunluklu ve 11×11 komşuluğu ağırlıkla krem kâğıt olan pikseller de fondur
      {
        const sat = new Int32Array((W0 + 1) * (H0 + 1));
        for (let y = 1; y <= H0; y++) { let row = 0; for (let x = 1; x <= W0; x++) { row += warm[(y - 1) * W0 + (x - 1)]; sat[y * (W0 + 1) + x] = sat[(y - 1) * (W0 + 1) + x] + row; } }
        const R = 5; let flipped = 0;
        for (let y = 0; y < H0; y++) for (let x = 0; x < W0; x++) {
          const i = y * W0 + x; if (bg[i]) continue;
          const r = px[i * 4], g = px[i * 4 + 1], bb = px[i * 4 + 2], mn = Math.min(r, g, bb), ch = Math.max(r, g, bb) - mn;
          if (mn < 170 || ch >= esik + 10 || r - g > 16) continue;
          const x0 = Math.max(0, x - R), y0 = Math.max(0, y - R), x1 = Math.min(W0, x + R + 1), y1 = Math.min(H0, y + R + 1);
          const cnt = sat[y1 * (W0 + 1) + x1] - sat[y0 * (W0 + 1) + x1] - sat[y1 * (W0 + 1) + x0] + sat[y0 * (W0 + 1) + x0];
          if (cnt >= 0.5 * (x1 - x0) * (y1 - y0)) { bg[i] = 1; flipped++; }
        }
        console.log("kırıntı:", flipped);
      }
      // 7×7 komşuluğunun ≥%80'i fon olan ön plan pikselleri fona katılır (2 tur; 3 px'lik ince dallar korunur)
      for (let pass = 0; pass < 2; pass++) {
        const sat = new Int32Array((W0 + 1) * (H0 + 1));
        for (let y = 1; y <= H0; y++) { let row = 0; for (let x = 1; x <= W0; x++) { row += bg[(y - 1) * W0 + (x - 1)]; sat[y * (W0 + 1) + x] = sat[(y - 1) * (W0 + 1) + x] + row; } }
        const R = 3, next = new Uint8Array(bg);
        for (let y = 0; y < H0; y++) for (let x = 0; x < W0; x++) {
          const i = y * W0 + x; if (bg[i]) continue;
          const x0 = Math.max(0, x - R), y0 = Math.max(0, y - R), x1 = Math.min(W0, x + R + 1), y1 = Math.min(H0, y + R + 1);
          const cnt = sat[y1 * (W0 + 1) + x1] - sat[y0 * (W0 + 1) + x1] - sat[y1 * (W0 + 1) + x0] + sat[y0 * (W0 + 1) + x0];
          if (cnt >= 0.8 * (x1 - x0) * (y1 - y0)) next[i] = 1;
        }
        bg.set(next);
      }
      // küçük / ince ön plan parçaları (kâğıt kenarı kırıntıları, lekeler) → fon
      const seen = new Uint8Array(N); const comp = new Int32Array(N);
      for (let s0 = 0; s0 < N; s0++) {
        if (bg[s0] || seen[s0]) continue;
        let ch0 = 0, ct = 0; comp[ct++] = s0; seen[s0] = 1; let minx = W0, maxx = 0, miny = H0, maxy = 0;
        while (ch0 < ct) { const i = comp[ch0++], x = i % W0, y = (i / W0) | 0; if (x < minx) minx = x; if (x > maxx) maxx = x; if (y < miny) miny = y; if (y > maxy) maxy = y;
          const nb = [x > 0 ? i - 1 : -1, x < W0 - 1 ? i + 1 : -1, i >= W0 ? i - W0 : -1, i < N - W0 ? i + W0 : -1];
          for (const j of nb) if (j >= 0 && !bg[j] && !seen[j]) { seen[j] = 1; comp[ct++] = j; } }
        const w = maxx - minx + 1, h = maxy - miny + 1;
        const thin = (w < 30 && h / w > 12) || (h < 30 && w / h > 12); // kâğıt kenarı çizgileri
        const sparse = ct < N * 0.02 && ct / (w * h) < 0.35;            // dantel gibi kırıntı kümeleri, eğik çizgiler
        if (ct < N * 0.0004 || w < 8 || h < 8 || thin || sparse || (ct < N * 0.004 && (w < 14 || h < 14))) for (let k = 0; k < ct; k++) bg[comp[k]] = 1;
      }
      // alfa: fon 0, diğer 255; kenarda 3x3 yumuşatma
      const alpha = new Uint8ClampedArray(N);
      for (let i = 0; i < N; i++) alpha[i] = bg[i] ? 0 : 255;
      const soft = new Uint8ClampedArray(N);
      for (let y = 0; y < H0; y++) for (let x = 0; x < W0; x++) {
        let s = 0, n = 0;
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const yy = y + dy, xx = x + dx; if (yy < 0 || yy >= H0 || xx < 0 || xx >= W0) continue; s += alpha[yy * W0 + xx]; n++; }
        soft[y * W0 + x] = s / n;
      }
      // fon renk sızmasını azalt: yarı saydam kenar piksellerinde krem karışımını çıkar
      let bgR = 0, bgG = 0, bgB = 0, bgN = 0;
      for (let i = 0; i < N; i += 97) if (bg[i]) { bgR += px[i * 4]; bgG += px[i * 4 + 1]; bgB += px[i * 4 + 2]; bgN++; }
      bgR /= bgN || 1; bgG /= bgN || 1; bgB /= bgN || 1;
      let minX = W0, minY = H0, maxX = 0, maxY = 0;
      for (let i = 0; i < N; i++) {
        const a = soft[i];
        if (a > 0 && a < 255) {
          const t = a / 255;
          for (let k = 0; k < 3; k++) { const bgc = [bgR, bgG, bgB][k]; px[i * 4 + k] = Math.max(0, Math.min(255, (px[i * 4 + k] - bgc * (1 - t)) / t)); }
        }
        px[i * 4 + 3] = a;
        if (a > 8) { const x = i % W0, y = (i / W0) | 0; if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y; }
      }
      ctx.putImageData(d, 0, 0);
      const pad = 10; minX = Math.max(0, minX - pad); minY = Math.max(0, minY - pad); maxX = Math.min(W0 - 1, maxX + pad); maxY = Math.min(H0 - 1, maxY + pad);
      const cw = maxX - minX + 1, chh = maxY - minY + 1;
      const scale = Math.min(1, H / chh);
      const o = document.createElement("canvas"); o.width = Math.round(cw * scale); o.height = Math.round(chh * scale);
      const octx = o.getContext("2d"); octx.imageSmoothingQuality = "high";
      octx.drawImage(c, minX, minY, cw, chh, 0, 0, o.width, o.height);
      return { png: o.toDataURL("image/png"), w: o.width, h: o.height, bgPct: Math.round(100 * bgN * 97 / N) };
    }, { dataUri, H: opt.yukseklik, esik: opt.esik });
    const outPath = path.join(path.dirname(f), path.basename(f, ext) + ".png");
    fs.writeFileSync(outPath, Buffer.from(out.png.split(",")[1], "base64"));
    console.log(`${f} → ${outPath}  ${out.w}×${out.h}  fon ~%${out.bgPct}  ${(fs.statSync(outPath).size / 1024).toFixed(0)} KB`);
    if (opt.kaynak && outPath !== f) { const dir = path.join(path.dirname(f), "kaynak"); fs.mkdirSync(dir, { recursive: true }); fs.renameSync(f, path.join(dir, path.basename(f))); }
  }
  await b.close();
})();
