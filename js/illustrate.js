/* Prosedürel bitki illüstrasyonları — her bitki için form + renk paletinden SVG üretir.
 * Harici görsel gerektirmez; p.gorsel alanı varsa uygulama onu tercih eder. */
(function () {
  function rng(seed) {
    let h = 2166136261;
    for (let i = 0; i < seed.length; i++) { h ^= seed.charCodeAt(i); h = Math.imul(h, 16777619); }
    return function () { h += 0x6D2B79F5; let t = h; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  const W = 200, H = 220;
  function shade(hex, amt) {
    const n = parseInt(hex.slice(1), 16);
    let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    r = Math.max(0, Math.min(255, r + amt)); g = Math.max(0, Math.min(255, g + amt)); b = Math.max(0, Math.min(255, b + amt));
    return "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
  }
  function pot(x, y, w, h, color) {
    const c = color || "#b9805a";
    return `<g class="pot">
      <path d="M${x - w / 2} ${y} L${x - w / 2 + w * 0.12} ${y + h} L${x + w / 2 - w * 0.12} ${y + h} L${x + w / 2} ${y} Z" fill="${c}"/>
      <rect x="${x - w / 2 - 4}" y="${y - 7}" width="${w + 8}" height="9" rx="2" fill="${shade(c, -22)}"/>
      <path d="M${x - w / 2 + w * 0.12} ${y + h} L${x + w / 2 - w * 0.12} ${y + h} L${x + w / 2 - w * 0.16} ${y + h - 6} L${x - w / 2 + w * 0.16} ${y + h - 6} Z" fill="${shade(c, -35)}"/>
      <ellipse cx="${x}" cy="${y + 1}" rx="${w / 2 - 2}" ry="3" fill="#4a3728"/>
    </g>`;
  }
  function leaf(x, y, len, wid, angle, fill, stroke) {
    return `<path d="M0 0 C ${wid} ${-len * 0.35}, ${wid} ${-len * 0.75}, 0 ${-len} C ${-wid} ${-len * 0.75}, ${-wid} ${-len * 0.35}, 0 0 Z" transform="translate(${x} ${y}) rotate(${angle})" fill="${fill}" stroke="${stroke}" stroke-width="0.6"/>
      <path d="M0 0 L0 ${-len * 0.9}" transform="translate(${x} ${y}) rotate(${angle})" stroke="${stroke}" stroke-width="0.7" fill="none" opacity="0.7"/>`;
  }
  function petalFlower(x, y, r, n, color, center) {
    let s = "";
    for (let i = 0; i < n; i++) {
      const a = (360 / n) * i;
      s += `<ellipse cx="0" cy="${-r * 0.6}" rx="${r * 0.32}" ry="${r * 0.6}" transform="translate(${x} ${y}) rotate(${a})" fill="${color}" stroke="${shade(color, -40)}" stroke-width="0.5"/>`;
    }
    s += `<circle cx="${x}" cy="${y}" r="${r * 0.25}" fill="${center || "#e9c04a"}"/>`;
    return s;
  }
  const forms = {
    upright(p, R) {
      let s = ""; const base = { x: 100, y: 176 };
      const stems = 4 + Math.floor(R() * 3);
      for (let i = 0; i < stems; i++) {
        const ang = -28 + (56 / (stems - 1)) * i + (R() - 0.5) * 8;
        const len = 80 + R() * 50;
        const rad = ang * Math.PI / 180;
        const tx = base.x + Math.sin(rad) * len, ty = base.y - Math.cos(rad) * len;
        s += `<path d="M${base.x} ${base.y} Q ${base.x + Math.sin(rad) * len * 0.5} ${base.y - Math.cos(rad) * len * 0.55} ${tx} ${ty}" stroke="${shade(p.yaprak, -50)}" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;
        const leaves = 2 + Math.floor(R() * 3);
        for (let j = 0; j <= leaves; j++) {
          const t = 0.35 + (0.65 / leaves) * j;
          const lx = base.x + Math.sin(rad) * len * t, ly = base.y - Math.cos(rad) * len * t;
          const side = j % 2 ? 1 : -1;
          const col = R() > 0.6 ? p.yaprak2 : p.yaprak;
          s += leaf(lx, ly, 26 + R() * 18, 10 + R() * 5, ang + side * (35 + R() * 20), col, shade(col, -45));
        }
      }
      return s + pot(100, 178, 74, 34);
    },
    tree(p, R) {
      let s = pot(100, 182, 70, 30);
      s += `<path d="M96 182 L97 110 M104 182 L103 110" stroke="#6b4a33" stroke-width="5" stroke-linecap="round"/>`;
      s += `<path d="M100 130 Q 80 110 62 100 M100 120 Q 120 100 140 95 M100 110 Q 95 85 100 70" stroke="#6b4a33" stroke-width="3" fill="none" stroke-linecap="round"/>`;
      const pts = [[62, 100], [140, 95], [100, 68], [78, 78], [124, 72], [100, 100]];
      pts.forEach(([x, y], i) => {
        const n = 6 + Math.floor(R() * 4);
        for (let k = 0; k < n; k++) {
          const a = R() * 360; const col = (i + k) % 3 === 0 ? p.yaprak2 : p.yaprak;
          s += leaf(x + (R() - 0.5) * 20, y + (R() - 0.5) * 16, 20 + R() * 12, 8 + R() * 4, a, col, shade(col, -40));
        }
      });
      return s;
    },
    trailing(p, R) {
      let s = `<path d="M100 8 L70 46 M100 8 L130 46 M100 8 L100 46" stroke="#8a6b4f" stroke-width="1.4"/>`;
      s += pot(100, 50, 68, 30);
      const strands = 6;
      for (let i = 0; i < strands; i++) {
        const x0 = 72 + (56 / (strands - 1)) * i;
        const len = 90 + R() * 70;
        const drift = (R() - 0.5) * 50;
        const x1 = x0 + drift;
        s += `<path d="M${x0} 46 C ${x0} ${46 + len * 0.4}, ${x1} ${46 + len * 0.6}, ${x1} ${46 + len}" stroke="${shade(p.yaprak, -45)}" stroke-width="1.6" fill="none"/>`;
        const n = Math.floor(len / 16);
        for (let k = 1; k <= n; k++) {
          const t = k / n;
          const cx = x0 + (x1 - x0) * (t * t), cy = 46 + len * t;
          const col = R() > 0.7 ? p.yaprak2 : p.yaprak;
          if (p.cicek && R() > 0.78) s += petalFlower(cx, cy, 6, 5, p.cicek, shade(p.cicek, -60));
          else s += leaf(cx, cy, 12 + R() * 8, 6 + R() * 3, 100 + (k % 2 ? 60 : -60) + (R() - 0.5) * 30, col, shade(col, -40));
        }
      }
      return s;
    },
    rosette(p, R) {
      let s = pot(100, 178, 76, 34);
      const rings = 3;
      for (let r = rings; r >= 1; r--) {
        const n = 6 + r * 3;
        for (let i = 0; i < n; i++) {
          const a = (360 / n) * i + r * 9;
          const len = 30 + r * 22 + R() * 10;
          const col = r === 1 ? p.yaprak2 : p.yaprak;
          const rad = a * Math.PI / 180;
          const tilt = Math.cos(rad); // ön/arka derinlik
          const lx = 100 + Math.sin(rad) * 6, ly = 150 - tilt * 4;
          s += leaf(lx, ly, len * (0.55 + 0.45 * (1 - Math.abs(tilt)) + 0.2), 9 + (3 - r) * 3, a * 0.62 - 0, col, shade(col, -45));
        }
      }
      return s;
    },
    cactus(p, R) {
      let s = pot(100, 178, 84, 34);
      s += `<circle cx="100" cy="122" r="52" fill="${p.yaprak}"/>`;
      for (let i = -3; i <= 3; i++) {
        const dx = i * 14;
        s += `<path d="M${100 + dx * 0.55} 74 Q ${100 + dx * 1.35} 122 ${100 + dx * 0.6} 172" stroke="${shade(p.yaprak, -35)}" stroke-width="2" fill="none" opacity="0.8"/>`;
        for (let k = 0; k < 6; k++) {
          const t = k / 5; const x = 100 + dx * (0.55 + (1.35 - 0.55) * Math.sin(t * Math.PI)) ; const y = 78 + t * 92;
          s += `<path d="M${x - 4} ${y - 1} L${x + 4} ${y + 1} M${x - 1} ${y - 4} L${x + 1} ${y + 4}" stroke="${p.yaprak2}" stroke-width="1.2" stroke-linecap="round"/>`;
        }
      }
      if (p.cicek) s += petalFlower(100, 72, 12, 9, p.cicek, "#8a5b12");
      return s;
    },
    fern(p, R) {
      let s = pot(100, 180, 72, 32);
      const fronds = 9;
      for (let i = 0; i < fronds; i++) {
        const ang = -75 + (150 / (fronds - 1)) * i;
        const rad = ang * Math.PI / 180;
        const len = 95 + R() * 35;
        const ex = 100 + Math.sin(rad) * len, ey = 176 - Math.cos(rad) * len * 0.9;
        const cx = 100 + Math.sin(rad) * len * 0.5, cy = 176 - Math.cos(rad) * len * 0.75;
        s += `<path d="M100 176 Q ${cx} ${cy} ${ex} ${ey}" stroke="${shade(p.yaprak, -40)}" stroke-width="1.4" fill="none"/>`;
        const n = 12;
        for (let k = 2; k < n; k++) {
          const t = k / n;
          const x = (1 - t) * (1 - t) * 100 + 2 * (1 - t) * t * cx + t * t * ex;
          const y = (1 - t) * (1 - t) * 176 + 2 * (1 - t) * t * cy + t * t * ey;
          const sz = (1 - t) * 11 + 3;
          const col = i % 2 ? p.yaprak : p.yaprak2;
          s += `<ellipse cx="${x}" cy="${y}" rx="${sz}" ry="${sz * 0.35}" transform="rotate(${ang + 90} ${x} ${y})" fill="${col}" opacity="0.95"/>`;
        }
      }
      return s;
    },
    flower(p, R) {
      let s = "";
      const stems = 3 + Math.floor(R() * 2);
      for (let i = 0; i < stems; i++) {
        const ang = -22 + (44 / (stems - 1)) * i + (R() - 0.5) * 6;
        const rad = ang * Math.PI / 180;
        const len = 95 + R() * 40;
        const tx = 100 + Math.sin(rad) * len, ty = 176 - Math.cos(rad) * len;
        s += `<path d="M100 176 Q ${100 + Math.sin(rad) * len * 0.5} ${176 - Math.cos(rad) * len * 0.5} ${tx} ${ty}" stroke="${shade(p.yaprak, -50)}" stroke-width="2" fill="none"/>`;
        s += leaf(100 + Math.sin(rad) * len * 0.45, 176 - Math.cos(rad) * len * 0.45, 30, 11, ang - 55, p.yaprak, shade(p.yaprak, -45));
        s += leaf(100 + Math.sin(rad) * len * 0.3, 176 - Math.cos(rad) * len * 0.3, 26, 10, ang + 55, p.yaprak2, shade(p.yaprak2, -45));
        const col = p.cicek || "#e57b8a";
        s += petalFlower(tx, ty, 14 + R() * 6, 5 + Math.floor(R() * 4), col, shade(col, -70));
      }
      // dip yaprakları
      for (let k = 0; k < 5; k++) s += leaf(100 + (k - 2) * 12, 176, 34 + R() * 12, 12, (k - 2) * 22, k % 2 ? p.yaprak2 : p.yaprak, shade(p.yaprak, -45));
      return s + pot(100, 178, 76, 34);
    },
    palm(p, R) {
      let s = pot(100, 182, 70, 30);
      s += `<path d="M100 182 L100 92" stroke="#7d5a3c" stroke-width="7" stroke-linecap="round"/>`;
      for (let y = 100; y < 176; y += 12) s += `<path d="M96 ${y} L104 ${y + 4}" stroke="#5e4029" stroke-width="1.5"/>`;
      const fronds = 11;
      for (let i = 0; i < fronds; i++) {
        const ang = -85 + (170 / (fronds - 1)) * i;
        const rad = ang * Math.PI / 180;
        const len = 62 + R() * 26;
        const ex = 100 + Math.sin(rad) * len, ey = 92 - Math.cos(rad) * len * 0.75 + Math.abs(Math.sin(rad)) * 16;
        const col = i % 3 === 0 ? p.yaprak2 : p.yaprak;
        s += `<path d="M100 92 Q ${100 + Math.sin(rad) * len * 0.6} ${92 - Math.cos(rad) * len * 0.9} ${ex} ${ey}" stroke="${col}" stroke-width="4.5" fill="none" stroke-linecap="round"/>`;
        s += `<path d="M100 92 Q ${100 + Math.sin(rad) * len * 0.6} ${92 - Math.cos(rad) * len * 0.9} ${ex} ${ey}" stroke="${shade(col, -45)}" stroke-width="0.8" fill="none"/>`;
      }
      return s;
    },
    orchid(p, R) {
      let s = pot(100, 178, 66, 32);
      s += leaf(92, 172, 62, 17, -58, p.yaprak, shade(p.yaprak, -45)) + leaf(108, 172, 62, 17, 58, p.yaprak2, shade(p.yaprak2, -45)) + leaf(100, 172, 44, 14, 0, p.yaprak, shade(p.yaprak, -45));
      s += `<path d="M104 160 C 104 120, 130 110, 142 60" stroke="${shade(p.yaprak, -50)}" stroke-width="1.8" fill="none"/>`;
      s += `<path d="M104 160 L104 40" stroke="#a5a08d" stroke-width="1.2" stroke-dasharray="3 3" opacity="0.7"/>`;
      const col = p.cicek || "#e9a3c9";
      [[112, 128], [124, 104], [134, 82], [141, 60]].forEach(([x, y], i) => {
        s += petalFlower(x, y, 12 - i, 5, col, shade(col, -80));
      });
      return s;
    },
    bulb(p, R) {
      let s = "";
      for (let k = 0; k < 6; k++) {
        const a = (k - 2.5) * 12;
        s += leaf(100 + (k - 2.5) * 9, 178, 70 + R() * 30, 9, a, k % 2 ? p.yaprak2 : p.yaprak, shade(p.yaprak, -45));
      }
      const col = p.cicek || "#e0413f";
      const heads = 3;
      for (let i = 0; i < heads; i++) {
        const x = 78 + i * 22, top = 58 + (i === 1 ? -10 : 6);
        s += `<path d="M${x} 176 L${x} ${top + 18}" stroke="${shade(p.yaprak, -45)}" stroke-width="2.2"/>`;
        if (p.id === "sumbul") {
          for (let j = 0; j < 8; j++) s += petalFlower(x + (j % 2 ? 5 : -5), top + 18 - j * 5, 5, 6, col, shade(col, -60));
        } else {
          s += `<path d="M${x - 12} ${top + 18} Q ${x - 14} ${top - 4} ${x - 5} ${top - 8} Q ${x} ${top - 2} ${x + 5} ${top - 8} Q ${x + 14} ${top - 4} ${x + 12} ${top + 18} Z" fill="${col}" stroke="${shade(col, -60)}" stroke-width="0.6"/>
                <path d="M${x - 5} ${top - 8} L${x - 6} ${top + 18} M${x + 5} ${top - 8} L${x + 6} ${top + 18}" stroke="${shade(col, -50)}" stroke-width="0.6" fill="none"/>`;
        }
      }
      return s + pot(100, 178, 76, 34);
    }
  };
  window.illustrate = function (p) {
    const R = rng(p.id);
    const fn = forms[p.form] || forms.upright;
    const tint = p.yaprak;
    return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${p.ad} illüstrasyonu">
      <defs><radialGradient id="g-${p.id}" cx="50%" cy="40%" r="70%"><stop offset="0" stop-color="${tint}" stop-opacity="0.22"/><stop offset="1" stop-color="${tint}" stop-opacity="0"/></radialGradient></defs>
      <rect width="${W}" height="${H}" fill="url(#g-${p.id})"/>
      ${fn(p, R)}
    </svg>`;
  };
})();
