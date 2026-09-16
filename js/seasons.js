/* Dört Mevsim Herbaryumu — dal iskeleti + fenoloji ile canlı SVG bitkiler
 * Ay ekseni m ∈ [0,12): 0 = 1 Ocak … 11 = 1 Aralık. Kaydırıcı v ∈ [0,1], Aralık'tan Aralık'a.
 */
(function () {
  const PLANTS = window.PLANTS;
  const $ = (s, r = document) => r.querySelector(s);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const ss = (m, a, b) => { const t = clamp((m - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
  const wrapMax = (fn, m) => Math.max(fn(m), fn(m + 12), fn(m - 12));
  const bump = (m, w) => wrapMax(x => ss(x, w[0], w[1]) * (1 - ss(x, w[2], w[3])), m);
  function rng(seed) { let h = 2166136261; for (let i = 0; i < seed.length; i++) { h ^= seed.charCodeAt(i); h = Math.imul(h, 16777619); } return () => { h += 0x6D2B79F5; let t = h; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  const hex2 = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  const rgb = (c) => `rgb(${c[0] | 0},${c[1] | 0},${c[2] | 0})`;
  const mixc = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
  function stops(list, m) { // renk durakları: [{m, c}] ; ilk duraktan önce son durağın rengi (kışa taşan kuru başlar)
    if (m < list[0].m) return list[list.length - 1].c;
    for (let i = 0; i < list.length - 1; i++) if (m <= list[i + 1].m) return mixc(list[i].c, list[i + 1].c, (m - list[i].m) / (list[i + 1].m - list[i].m));
    return list[list.length - 1].c;
  }

  // ---------- yaprak / çiçek biçimleri (yerel koordinat: sap 0,0 · uç 0,-1) ----------
  const SHAPES = {
    lanceolate: "M0 0 C0.22 -0.22 0.24 -0.7 0 -1 C-0.24 -0.7 -0.22 -0.22 0 0Z",
    ovate: "M0 0 C0.5 -0.15 0.55 -0.7 0 -1 C-0.55 -0.7 -0.5 -0.15 0 0Z",
    ovateSerr: "M0 0 C0.5 -0.12 0.6 -0.3 0.52 -0.45 L0.58 -0.5 C0.55 -0.7 0.4 -0.9 0 -1 C-0.4 -0.9 -0.55 -0.7 -0.58 -0.5 L-0.52 -0.45 C-0.6 -0.3 -0.5 -0.12 0 0Z",
    cordate: "M0 -0.12 C0.08 -0.02 0.28 0.04 0.44 -0.12 C0.78 -0.45 0.58 -0.9 0 -1 C-0.58 -0.9 -0.78 -0.45 -0.44 -0.12 C-0.28 0.04 -0.08 -0.02 0 -0.12Z",
    elliptic: "M0 0 C0.38 -0.2 0.4 -0.75 0 -1 C-0.4 -0.75 -0.38 -0.2 0 0Z"
  };

  // ---------- tür tanımları ----------
  const SPECIES = {
    badem: {
      skeleton: { type: "tree", trunks: 1, depth: 4, len: 118, shrink: 0.68, spread: 30, wobble: 0.12, width: 6, kids: [2, 3], color: "#6d4a3a", tip: "#8a5e48" },
      leaf: { shape: "lanceolate", size: [22, 32], per: 2, green: "#5e9a4c", young: "#a7cf74", autumn: "#d8ad3f", bud: [2.8, 4.3], drop: [10.2, 11.0], color: [8.8, 9.6], edge: "#3e6b32" },
      flower: { type: "prunus", color: "#f4cdd8", center: "#c65d84", size: 8, density: 0.85, window: [1.5, 2.3, 3.2, 3.9], minDepth: 1 },
      fruit: { type: "almond", color: "#93b56d", size: 7, density: 0.2, window: [4.6, 5.6, 8.1, 8.9], minDepth: 2 }
    },
    erguvan: {
      skeleton: { type: "tree", trunks: 1, depth: 4, len: 108, shrink: 0.72, spread: 32, wobble: 0.32, width: 7, kids: [2, 2], color: "#5b4236", tip: "#7a5a48" },
      leaf: { shape: "cordate", size: [17, 25], per: 1, green: "#4f9350", young: "#b6cf6a", autumn: "#e4c24b", bud: [3.8, 5.1], drop: [10.3, 11.1], color: [8.9, 9.8], edge: "#33652f", midrib: true },
      flower: { type: "cercis", color: "#d5479b", center: "#a12b73", size: 7, density: 1.2, window: [2.7, 3.4, 4.6, 5.3], minDepth: 0 },
      fruit: { type: "pod", color: "#8fbf72", dry: "#7d5a3f", size: 26, density: 0.18, window: [6.2, 7.2, 14.6, 15.6], colorT: [8.5, 10], minDepth: 1 }
    },
    ortanca: {
      skeleton: { type: "canes", canes: 5, len: 250, spread: 13, width: 3.6, color: "#a48a5a", tip: "#b39a68" },
      leaf: { shape: "ovateSerr", size: [30, 42], per: 2, green: "#3f8a45", young: "#9ccc68", autumn: "#b9a04a", bud: [3.4, 4.8], drop: [10.2, 11.0], color: [8.8, 9.7], edge: "#2c6531", midrib: true },
      flower: { type: "hydrangea", size: 46, density: 1, window: [5.0, 6.0, 15.2, 16.2], minDepth: 0,
        stops: [{ m: 5.0, c: "#c6dd9f" }, { m: 6.0, c: "#8fb2e6" }, { m: 6.8, c: "#6d8fd8" }, { m: 8.3, c: "#7d95cf" }, { m: 9.4, c: "#b39ab7" }, { m: 10.4, c: "#a88f78" }, { m: 11.6, c: "#8b7458" }] }
    },
    kizilcik: {
      skeleton: { type: "tree", trunks: 3, depth: 3, len: 105, shrink: 0.7, spread: 26, wobble: 0.15, width: 4.5, kids: [2, 3], color: "#6a5343", tip: "#87705a" },
      leaf: { shape: "elliptic", size: [20, 28], per: 2, green: "#488c45", young: "#a0cc6c", autumn: "#a8382f", bud: [3.0, 4.4], drop: [10.4, 11.2], color: [8.8, 9.7], edge: "#2f6330", midrib: true },
      flower: { type: "cornus", color: "#e8c930", center: "#b9930f", size: 6, density: 1.1, window: [0.6, 1.4, 2.4, 3.1], minDepth: 1 },
      fruit: { type: "berry", color: "#c8332a", size: 7, density: 0.35, window: [6.8, 7.8, 9.8, 10.5], minDepth: 2 }
    }
  };
  const FEATURED = ["badem", "erguvan", "ortanca", "kizilcik"];

  // ---------- iskelet üreteçleri ----------
  function tree(R, o) {
    const paths = [], nodes = [];
    function branch(x, y, ang, len, w, depth) {
      const rad = ang * Math.PI / 180;
      const ex = x + Math.sin(rad) * len, ey = y - Math.cos(rad) * len;
      const nx = Math.cos(rad), ny = Math.sin(rad); // normal
      const off = (R() - 0.5) * len * o.wobble * 2;
      const cx = (x + ex) / 2 + nx * off, cy = (y + ey) / 2 + ny * off;
      paths.push({ d: `M${x.toFixed(1)} ${y.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`, w, depth });
      const steps = Math.max(2, Math.round(len / 13));
      for (let k = 1; k <= steps; k++) {
        const t = k / steps;
        const px = (1 - t) * (1 - t) * x + 2 * (1 - t) * t * cx + t * t * ex;
        const py = (1 - t) * (1 - t) * y + 2 * (1 - t) * t * cy + t * t * ey;
        const tx = 2 * (1 - t) * (cx - x) + 2 * t * (ex - cx), ty = 2 * (1 - t) * (cy - y) + 2 * t * (ey - cy);
        const tang = Math.atan2(tx, -ty) * 180 / Math.PI;
        if (depth > 0 || t > 0.5) nodes.push({ x: px, y: py, ang: tang, depth, t, apex: depth === o.depth && k === steps });
      }
      if (depth < o.depth) {
        const n = o.kids[0] + Math.floor(R() * (o.kids[1] - o.kids[0] + 1));
        for (let i = 0; i < n; i++) {
          const a = ang + o.spread * (i - (n - 1) / 2) * (1 + (R() - 0.5) * 0.5) + (R() - 0.5) * 10;
          branch(ex, ey, a, len * o.shrink * (0.85 + R() * 0.3), w * 0.62, depth + 1);
        }
      }
    }
    for (let i = 0; i < o.trunks; i++) {
      const a = o.trunks === 1 ? (R() - 0.5) * 6 : (i - (o.trunks - 1) / 2) * 16 + (R() - 0.5) * 6;
      branch(150 + (i - (o.trunks - 1) / 2) * 10, 400, a, o.len * (0.9 + R() * 0.2), o.width, 0);
    }
    return { paths, nodes };
  }
  function canes(R, o) {
    const paths = [], nodes = [];
    for (let i = 0; i < o.canes; i++) {
      const a = (i - (o.canes - 1) / 2) * o.spread + (R() - 0.5) * 4;
      const rad = a * Math.PI / 180, len = o.len * (0.82 + R() * 0.25);
      const x = 150 + (i - (o.canes - 1) / 2) * 6, y = 400;
      const ex = x + Math.sin(rad) * len, ey = y - Math.cos(rad) * len;
      const cx = (x + ex) / 2 + Math.cos(rad) * (R() - 0.5) * 18, cy = (y + ey) / 2;
      paths.push({ d: `M${x} ${y} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`, w: o.width, depth: 0 });
      const joints = 4;
      for (let k = 1; k <= joints; k++) {
        const t = 0.35 + (0.65 / joints) * k;
        const px = (1 - t) * (1 - t) * x + 2 * (1 - t) * t * cx + t * t * ex;
        const py = (1 - t) * (1 - t) * y + 2 * (1 - t) * t * cy + t * t * ey;
        const tx = 2 * (1 - t) * (cx - x) + 2 * t * (ex - cx), ty = 2 * (1 - t) * (cy - y) + 2 * t * (ey - cy);
        nodes.push({ x: px, y: py, ang: Math.atan2(tx, -ty) * 180 / Math.PI, depth: 1, t, apex: k === joints, joint: true });
      }
    }
    return { paths, nodes };
  }

  // ---------- SVG elemanları ----------
  const NS = "http://www.w3.org/2000/svg";
  const el = (n, attrs) => { const e = document.createElementNS(NS, n); for (const k in attrs) e.setAttribute(k, attrs[k]); return e; };

  function makeFlower(f, R) {
    const g = el("g", {});
    if (f.type === "prunus") {
      for (let i = 0; i < 5; i++) g.appendChild(el("circle", { cx: (Math.sin(i * 1.2566) * 0.62).toFixed(2), cy: (-Math.cos(i * 1.2566) * 0.62).toFixed(2), r: 0.45, fill: f.color }));
      g.appendChild(el("circle", { cx: 0, cy: 0, r: 0.22, fill: f.center }));
    } else if (f.type === "cercis") {
      for (let i = 0; i < 3; i++) g.appendChild(el("ellipse", { cx: (i - 1) * 0.45, cy: -0.1 * i, rx: 0.42, ry: 0.65, transform: `rotate(${(i - 1) * 28})`, fill: f.color, stroke: f.center, "stroke-width": 0.08 }));
    } else if (f.type === "cornus") {
      for (let i = 0; i < 7; i++) { const a = i * 0.9, r = i ? 0.6 : 0; g.appendChild(el("circle", { cx: (Math.cos(a) * r).toFixed(2), cy: (Math.sin(a) * r).toFixed(2), r: 0.3, fill: f.color })); }
      g.appendChild(el("circle", { cx: 0, cy: 0, r: 0.18, fill: f.center }));
    } else if (f.type === "hydrangea") {
      for (let i = 0; i < 16; i++) {
        const a = R() * 6.283, r = Math.sqrt(R()) * 0.8;
        const fl = el("g", { transform: `translate(${(Math.cos(a) * r).toFixed(2)} ${(Math.sin(a) * r * 0.85).toFixed(2)}) rotate(${(R() * 90) | 0}) scale(${(0.24 + R() * 0.1).toFixed(2)})` });
        for (let k = 0; k < 4; k++) fl.appendChild(el("ellipse", { cx: 0, cy: -0.55, rx: 0.36, ry: 0.55, transform: `rotate(${k * 90})`, class: "floret" }));
        fl.appendChild(el("circle", { r: 0.2, class: "floret-c" }));
        g.appendChild(fl);
      }
    }
    return g;
  }
  function makeFruit(f) {
    if (f.type === "pod") return el("path", { d: "M0 0 C0.16 0.3 0.16 0.75 0.05 1 L-0.05 1 C-0.16 0.75 -0.16 0.3 0 0Z", "stroke-width": 0.04 });
    if (f.type === "almond") return el("ellipse", { cx: 0, cy: 0.55, rx: 0.42, ry: 0.6 });
    return el("ellipse", { cx: 0, cy: 0.55, rx: 0.36, ry: 0.55 }); // berry
  }

  // ---------- bitki nesnesi ----------
  function buildPlant(id) {
    const sp = SPECIES[id], R = rng(id + "-2026");
    const sk = sp.skeleton.type === "canes" ? canes(R, sp.skeleton) : tree(R, sp.skeleton);
    const svg = el("svg", { viewBox: "0 0 300 420", class: "hb-svg", role: "img" });
    svg.setAttribute("aria-label", PLANTS.find(p => p.id === id).ad);
    const defs = el("defs", {});
    defs.innerHTML = `<linearGradient id="fade-${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0.82" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient><mask id="mask-${id}"><rect width="300" height="420" fill="url(#fade-${id})"/></mask>`;
    svg.appendChild(defs);
    const root = el("g", { mask: `url(#mask-${id})`, class: "sway" });
    svg.appendChild(root);
    const gBark = el("g", { fill: "none", "stroke-linecap": "round" });
    sk.paths.forEach(p => gBark.appendChild(el("path", { d: p.d, stroke: p.depth === 0 ? sp.skeleton.color : sp.skeleton.tip, "stroke-width": p.w.toFixed(2) })));
    if (sp.skeleton.type === "canes") sk.nodes.forEach(n => gBark.appendChild(el("ellipse", { cx: n.x.toFixed(1), cy: n.y.toFixed(1), rx: 2.6, ry: 1.4, fill: "#8b7048", stroke: "none", transform: `rotate(${n.ang.toFixed(1)} ${n.x.toFixed(1)} ${n.y.toFixed(1)})` })));
    root.appendChild(gBark);
    const gFruit = el("g", {}), gLeaf = el("g", {}), gFlower = el("g", {});
    root.appendChild(gFruit); root.appendChild(gLeaf); root.appendChild(gFlower);

    const items = { leaves: [], flowers: [], fruits: [] };
    const L = sp.leaf, F = sp.flower, FR = sp.fruit;
    sk.nodes.forEach(n => {
      const per = L.per === 2 ? 2 : (R() > 0.35 ? 1 : 0);
      for (let s = 0; s < per; s++) {
        if (sp.skeleton.type === "tree" && n.depth < 1) continue;
        const side = per === 2 ? (s ? 1 : -1) : (R() > 0.5 ? 1 : -1);
        const ang = n.ang + side * (48 + R() * 30) + (R() - 0.5) * 16;
        const size = L.size[0] + R() * (L.size[1] - L.size[0]);
        const g = el("g", { transform: `translate(${n.x.toFixed(1)} ${n.y.toFixed(1)}) rotate(${ang.toFixed(1)})` });
        const inner = el("g", {});
        inner.appendChild(el("path", { d: SHAPES[L.shape], "stroke-width": 0.03, "stroke-linejoin": "round" }));
        if (L.midrib) inner.appendChild(el("path", { d: "M0 0 L0 -0.92", fill: "none", "stroke-width": 0.035, opacity: 0.55 }));
        g.appendChild(inner); gLeaf.appendChild(g);
        items.leaves.push({ inner, size, delay: (R() - 0.5) * 0.9, paths: Array.from(inner.children) });
      }
      if (F && n.depth >= F.minDepth && (F.type === "hydrangea" ? n.apex : R() < F.density)) {
        const size = F.size * (0.75 + R() * 0.5);
        const g = el("g", { transform: `translate(${n.x.toFixed(1)} ${n.y.toFixed(1)}) rotate(${(R() * 360) | 0})` });
        const inner = makeFlower(F, R); g.appendChild(inner); gFlower.appendChild(g);
        items.flowers.push({ inner, size, delay: (R() - 0.5) * (F.type === "hydrangea" ? 0.4 : 0.8), florets: F.type === "hydrangea" ? Array.from(inner.querySelectorAll(".floret, .floret-c")) : null });
      }
      if (FR && n.depth >= FR.minDepth && R() < FR.density) {
        const size = FR.size * (0.8 + R() * 0.4);
        const g = el("g", { transform: `translate(${n.x.toFixed(1)} ${n.y.toFixed(1)}) rotate(${((R() - 0.5) * 26).toFixed(1)})` });
        const inner = el("g", {}); const shape = makeFruit(FR); inner.appendChild(shape); g.appendChild(inner); gFruit.appendChild(g);
        items.fruits.push({ inner, shape, size, delay: (R() - 0.5) * 0.7 });
      }
    });

    const cGreen = hex2(L.green), cYoung = hex2(L.young), cAut = hex2(L.autumn), cEdge = hex2(L.edge);
    const colorCache = new Map();
    function leafColor(m) {
      const key = Math.round(m * 20);
      let c = colorCache.get(key);
      if (!c) {
        const grow = ss(m, L.bud[1] - 0.3, L.bud[1] + 1.1), aut = ss(m, L.color[0], L.color[1]);
        const fill = mixc(mixc(cYoung, cGreen, grow), cAut, aut);
        c = { fill: rgb(fill), edge: rgb(mixc(mixc(cEdge, fill, 0.35), cAut, aut * 0.6)) };
        colorCache.set(key, c);
      }
      return c;
    }
    const fruitC = FR ? hex2(FR.color) : null, fruitDry = FR && FR.dry ? hex2(FR.dry) : null;

    function update(m) {
      for (const lf of items.leaves) {
        const mm = m + lf.delay;
        const s = ss(mm, L.bud[0], L.bud[1]) * (1 - ss(mm, L.drop[0], L.drop[1]));
        if (s < 0.01) { if (!lf.hidden) { lf.inner.setAttribute("display", "none"); lf.hidden = true; } continue; }
        if (lf.hidden) { lf.inner.removeAttribute("display"); lf.hidden = false; }
        const c = leafColor(mm);
        lf.inner.setAttribute("transform", `scale(${(lf.size * s).toFixed(2)})`);
        lf.paths[0].setAttribute("fill", c.fill); lf.paths[0].setAttribute("stroke", c.edge);
        if (lf.paths[1]) lf.paths[1].setAttribute("stroke", c.edge);
      }
      for (const fl of items.flowers) {
        const mm = m + fl.delay;
        const s = bump(mm, F.window);
        if (s < 0.01) { if (!fl.hidden) { fl.inner.setAttribute("display", "none"); fl.hidden = true; } continue; }
        if (fl.hidden) { fl.inner.removeAttribute("display"); fl.hidden = false; }
        fl.inner.setAttribute("transform", `scale(${(fl.size * (0.4 + 0.6 * s)).toFixed(2)})`);
        fl.inner.setAttribute("opacity", s.toFixed(2));
        if (fl.florets) {
          const c = stops(F.stops.map(x => ({ m: x.m, c: hex2(x.c) })), ((mm % 12) + 12) % 12);
          const fill = rgb(c), dark = rgb(mixc(c, [40, 30, 20], 0.35)), light = rgb(mixc(c, [255, 255, 255], 0.55));
          fl.florets.forEach(f => { if (f.classList.contains("floret")) { f.setAttribute("fill", fill); f.setAttribute("stroke", dark); f.setAttribute("stroke-width", 0.06); } else f.setAttribute("fill", light); });
        }
      }
      if (FR) for (const fr of items.fruits) {
        const mm = m + fr.delay;
        const s = bump(mm, FR.window);
        if (s < 0.01) { if (!fr.hidden) { fr.inner.setAttribute("display", "none"); fr.hidden = true; } continue; }
        if (fr.hidden) { fr.inner.removeAttribute("display"); fr.hidden = false; }
        fr.inner.setAttribute("transform", `scale(${(fr.size * (0.5 + 0.5 * s)).toFixed(2)})`);
        fr.inner.setAttribute("opacity", s.toFixed(2));
        let c = fruitC;
        if (fruitDry) c = mixc(fruitC, fruitDry, wrapMax(x => ss(x, FR.colorT[0], FR.colorT[1]), mm) );
        if (FR.type === "berry") c = mixc([150, 190, 110], fruitC, ss(mm, FR.window[0] + 0.4, FR.window[2] - 0.4));
        fr.shape.setAttribute("fill", rgb(c)); fr.shape.setAttribute("stroke", rgb(mixc(c, [0, 0, 0], 0.35)));
      }
    }
    return { id, svg, update };
  }

  // ---------- sahne ----------
  const AYLAR = ["OCAK", "ŞUBAT", "MART", "NİSAN", "MAYIS", "HAZİRAN", "TEMMUZ", "AĞUSTOS", "EYLÜL", "EKİM", "KASIM", "ARALIK"];
  const stage = $("#hbPlants");
  const plants = FEATURED.map(id => {
    const p = PLANTS.find(x => x.id === id);
    const fig = document.createElement("figure");
    fig.className = "hb-plant"; fig.dataset.id = id; fig.tabIndex = 0;
    fig.setAttribute("role", "button"); fig.setAttribute("aria-label", `${p.ad} detaylarını aç`);
    const obj = buildPlant(id);
    fig.appendChild(obj.svg);
    const cap = document.createElement("figcaption");
    cap.innerHTML = `<span class="hb-cap">${p.ad}</span><span class="hb-cap-latin">${p.latince}</span>`;
    fig.appendChild(cap);
    stage.appendChild(fig);
    const focus = () => { $("#hbName").innerHTML = `<b>${p.ad}</b><i>${p.latince}</i>`; };
    fig.addEventListener("mouseenter", focus); fig.addEventListener("focus", focus);
    fig.addEventListener("click", () => window.Detail.open(id, FEATURED.map(i => PLANTS.find(x => x.id === i))));
    fig.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fig.click(); } });
    return obj;
  });
  { const p = PLANTS.find(x => x.id === FEATURED[0]); $("#hbName").innerHTML = `<b>${p.ad}</b><i>${p.latince}</i>`; }

  // kaydırıcı
  const slider = $("#hbSlider"), knob = $("#hbKnob"), fill = $("#hbFill"), monthEl = $("#hbMonth"), wordEl = $("#hbSeason");
  let v = 0.21, playing = false, raf = null, lastWord = "";
  const monthOf = (v) => (0.5 + v * 12) % 12;
  const seasonOf = (m) => m >= 11 || m < 2 ? "Kış" : m < 5 ? "İlkbahar" : m < 8 ? "Yaz" : "Sonbahar";
  function setValue(nv, silent) {
    v = clamp(nv, 0, 1);
    const m = monthOf(v);
    knob.style.left = (v * 100) + "%"; fill.style.width = (v * 100) + "%";
    slider.setAttribute("aria-valuenow", Math.round(v * 1000) / 10);
    slider.setAttribute("aria-valuetext", `${AYLAR[Math.floor(m) % 12]} · ${seasonOf(m)}`);
    monthEl.textContent = AYLAR[Math.floor(m) % 12];
    const w = seasonOf(m);
    if (w !== lastWord) { lastWord = w; wordEl.textContent = w; wordEl.classList.remove("swap"); void wordEl.offsetWidth; wordEl.classList.add("swap"); document.documentElement.dataset.season = { "Kış": "kis", "İlkbahar": "ilkbahar", "Yaz": "yaz", "Sonbahar": "sonbahar" }[w]; }
    document.querySelectorAll(".hb-tick").forEach((t, i) => t.classList.toggle("on", Math.abs(i / 4 - v) < 0.125 || (i === 4 && v > 0.875) || (i === 0 && v < 0.125)));
    plants.forEach(p => p.update(m));
  }
  function posToValue(clientX) { const r = slider.getBoundingClientRect(); return (clientX - r.left) / r.width; }
  let dragging = false;
  slider.addEventListener("pointerdown", (e) => { dragging = true; stopPlay(); slider.setPointerCapture(e.pointerId); slider.classList.add("drag"); setValue(posToValue(e.clientX)); });
  slider.addEventListener("pointermove", (e) => { if (dragging) setValue(posToValue(e.clientX)); });
  const endDrag = () => { dragging = false; slider.classList.remove("drag"); };
  slider.addEventListener("pointerup", endDrag); slider.addEventListener("pointercancel", endDrag);
  slider.addEventListener("keydown", (e) => {
    const step = e.shiftKey ? 1 / 12 : 1 / 48;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") { e.preventDefault(); stopPlay(); setValue(v + step); }
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") { e.preventDefault(); stopPlay(); setValue(v - step); }
    if (e.key === "Home") { e.preventDefault(); setValue(0); } if (e.key === "End") { e.preventDefault(); setValue(1); }
  });
  document.querySelectorAll(".hb-tick").forEach((t, i) => t.addEventListener("click", () => { stopPlay(); animateTo(i / 4); }));
  document.addEventListener("keydown", (e) => {
    if (window.Detail.isOpen() || e.target.matches("input, select, textarea") || document.activeElement === slider) return;
    if (e.key === "ArrowRight") { stopPlay(); setValue(v + 1 / 48); } if (e.key === "ArrowLeft") { stopPlay(); setValue(v - 1 / 48); }
    if (e.key === " " && !e.target.closest("button, a, [role=button]")) { e.preventDefault(); togglePlay(); }
  });
  let tween = null;
  function animateTo(target) {
    cancelAnimationFrame(tween); const from = v, t0 = performance.now(), dur = 900;
    const step = (now) => { const t = clamp((now - t0) / dur, 0, 1), e = 1 - Math.pow(1 - t, 3); setValue(from + (target - from) * e); if (t < 1) tween = requestAnimationFrame(step); };
    tween = requestAnimationFrame(step);
  }
  const playBtn = $("#hbPlay");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function tick() { setValue(v >= 1 ? 0 : v + 0.00075); raf = requestAnimationFrame(tick); }
  function togglePlay() { playing ? stopPlay() : startPlay(); }
  function startPlay() { playing = true; playBtn.setAttribute("aria-pressed", "true"); playBtn.title = "Durdur"; raf = requestAnimationFrame(tick); }
  function stopPlay() { if (!playing) return; playing = false; playBtn.setAttribute("aria-pressed", "false"); playBtn.title = "Yılı oynat"; cancelAnimationFrame(raf); }
  playBtn.addEventListener("click", togglePlay);
  document.addEventListener("visibilitychange", () => { if (document.hidden) stopPlay(); });
  setValue(v, true);
  if (!reduced) { /* kısa bir açılış: kıştan bahara süzül */ v = 0.04; setValue(v); setTimeout(() => animateTo(0.21), 400); }
  window.Seasons = { setValue, get value() { return v; } };
})();
