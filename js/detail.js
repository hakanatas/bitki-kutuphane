/* Paylaşımlı sabitler ve detay paneli (hem herbaryum sahnesi hem katalog kullanır) */
(function () {
  const PLANTS = window.PLANTS;
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const UI = window.UI = {
    esc,
    KATEGORI: { "ic-mekan": "İç mekân", "cicekli": "Çiçekli", "sukulent": "Sukulent", "kaktus": "Kaktüs", "aromatik": "Aromatik & mutfak", "agac": "Ağaç & meyve" },
    ISIK: { 1: "Gölge", 2: "Yarı gölge", 3: "Tam güneş" },
    SU: { 1: "Az", 2: "Orta", 3: "Sık" },
    NEM: { 1: "Düşük", 2: "Orta", 3: "Yüksek" },
    ZORLUK: { kolay: "Kolay", orta: "Orta", zor: "Zor" },
    ICONS: {
      sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
      drop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/></svg>',
      mist: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 8h10M6 12h12M4 16h9M17 16h3"/></svg>',
      temp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/></svg>',
      paw: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="6" cy="10" r="2"/><circle cx="18" cy="10" r="2"/><circle cx="9" cy="6" r="2"/><circle cx="15" cy="6" r="2"/><path d="M12 11c-3 0-6 3-6 6a3 3 0 0 0 3 3c1 0 2-.5 3-.5s2 .5 3 .5a3 3 0 0 0 3-3c0-3-3-6-6-6z"/></svg>',
      heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.4-7 10-7 10z"/></svg>',
      warn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 3l10 18H2L12 3z"/><path d="M12 10v4M12 17.5v.5"/></svg>'
    },
    art: (p) => p.gorsel ? `<img src="${esc(p.gorsel)}" alt="${esc(p.ad)}" loading="lazy">` : window.illustrate(p),
    num: (p) => "No. " + String(PLANTS.indexOf(p) + 1).padStart(3, "0"),
    dots: (v) => `<span class="dots">${[1, 2, 3].map(i => `<i class="${i <= v ? "on" : ""}"></i>`).join("")}</span>`
  };
  const scale = (v) => `<span class="scale">${[1, 2, 3].map(i => `<i class="${i <= v ? "on" : ""}"></i>`).join("")}</span>`;

  // ----- koleksiyon -----
  let favs = new Set();
  try { favs = new Set(JSON.parse(localStorage.getItem("bk-favs") || "[]")); } catch (e) {}
  const Favs = window.Favs = {
    has: (id) => favs.has(id),
    size: () => favs.size,
    toggle(id) {
      favs.has(id) ? favs.delete(id) : favs.add(id);
      try { localStorage.setItem("bk-favs", JSON.stringify([...favs])); } catch (e) {}
      document.dispatchEvent(new CustomEvent("favchange", { detail: { id, on: favs.has(id) } }));
    }
  };

  // ----- detay -----
  const dlg = $("#detail");
  let list = PLANTS;
  function open(id, ctx) {
    const p = PLANTS.find(x => x.id === id); if (!p) return;
    if (ctx && ctx.length) list = ctx;
    const i = list.findIndex(x => x.id === id);
    const prev = list[(i - 1 + list.length) % list.length], next = list[(i + 1) % list.length];
    const K = UI;
    $("#detailBody").innerHTML = `
      <div class="detail-hero">
        <div class="detail-art">${K.art(p)}</div>
        <div class="detail-title">
          <span class="eyebrow">${K.num(p)} · ${esc(p.aile)} · ${esc(K.KATEGORI[p.kategori])}</span>
          <h2>${esc(p.ad)}</h2><span class="latin">${esc(p.latince)}</span>
          <p>${esc(p.aciklama)}</p>
          <div class="tags">${p.etiketler.map(t => `<span class="badge">${esc(t)}</span>`).join("")}</div>
        </div>
      </div>
      <div class="care">
        <div class="care-item"><span class="lab">${K.ICONS.sun} Işık</span><span class="val">${K.ISIK[p.isik]}</span>${scale(p.isik)}</div>
        <div class="care-item"><span class="lab">${K.ICONS.drop} Su</span><span class="val">${K.SU[p.su]}</span>${scale(p.su)}</div>
        <div class="care-item"><span class="lab">${K.ICONS.mist} Nem</span><span class="val">${K.NEM[p.nem]}</span>${scale(p.nem)}</div>
        <div class="care-item"><span class="lab">${K.ICONS.temp} Sıcaklık</span><span class="val">${esc(p.sicaklik)}</span></div>
      </div>
      ${p.mevsim ? `<div class="seasons-row">${[["kis", "Kış"], ["ilkbahar", "İlkbahar"], ["yaz", "Yaz"], ["sonbahar", "Sonbahar"]].map(([k, l]) => `<div class="season-cell"><span class="eyebrow">${l}</span><span>${esc(p.mevsim[k])}</span></div>`).join("")}</div>` : ""}
      <div class="toxic-note ${p.toksik ? "" : "safe"}">${p.toksik ? K.ICONS.warn : K.ICONS.paw}<span>${p.toksik ? "Kedi, köpek ve küçük çocuklar için zehirli olabilir. Ulaşamayacakları bir yerde tutun." : "Evcil hayvanlar için güvenli kabul edilir."}</span></div>
      <div class="facts">
        <div class="fact"><span class="eyebrow">Köken</span><span class="v">${esc(p.koken)}</span></div>
        <div class="fact"><span class="eyebrow">Boy</span><span class="v">${esc(p.boy)}</span></div>
        <div class="fact"><span class="eyebrow">Zorluk</span><span class="v">${K.ZORLUK[p.zorluk]}</span></div>
        <div class="fact"><span class="eyebrow">Çoğaltma</span><span class="v">${esc(p.cogaltma)}</span></div>
      </div>
      <div class="section"><h3>Bakım notları</h3><ul class="tips">${p.bakim.map(b => `<li><span>${esc(b)}</span></li>`).join("")}</ul></div>
      <div class="callout"><span class="eyebrow">Biliyor muydunuz?</span>${esc(p.ilginc)}</div>`;
    $("#prevBtn").onclick = () => open(prev.id);
    $("#nextBtn").onclick = () => open(next.id);
    $("#prevBtn").title = prev.ad; $("#nextBtn").title = next.ad;
    const fb = $("#detailFav");
    fb.setAttribute("aria-pressed", String(favs.has(p.id)));
    fb.onclick = () => { Favs.toggle(p.id); fb.setAttribute("aria-pressed", String(favs.has(p.id))); };
    if (!dlg.open) dlg.showModal();
    $(".detail-panel").scrollTop = 0;
    history.replaceState(null, "", "#bitki/" + id);
    document.title = `${p.ad} · Bitki Kütüphanesi`;
  }
  function close() { if (dlg.open) dlg.close(); }
  dlg.addEventListener("close", () => { history.replaceState(null, "", location.pathname + location.search); document.title = "Bitki Kütüphanesi"; });
  dlg.addEventListener("click", (e) => { if (e.target === dlg) close(); });
  $("#closeBtn").addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (!dlg.open) return;
    if (e.key === "ArrowLeft") { e.preventDefault(); $("#prevBtn").click(); }
    if (e.key === "ArrowRight") { e.preventDefault(); $("#nextBtn").click(); }
  });
  $("#shareBtn").addEventListener("click", async () => {
    const url = location.href; const btn = $("#shareBtn");
    try { await navigator.clipboard.writeText(url); btn.title = "Bağlantı kopyalandı"; setTimeout(() => (btn.title = "Bağlantıyı kopyala"), 1500); } catch (e) { prompt("Bağlantı:", url); }
  });
  window.Detail = { open, close, isOpen: () => dlg.open };

  // ----- tema -----
  function applyTheme(t) {
    if (t) document.documentElement.setAttribute("data-theme", t); else document.documentElement.removeAttribute("data-theme");
    try { t ? localStorage.setItem("bk-theme", t) : localStorage.removeItem("bk-theme"); } catch (e) {}
  }
  try { const t = localStorage.getItem("bk-theme"); if (t) applyTheme(t); } catch (e) {}
  $("#themeBtn").addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme");
    const isDark = cur ? cur === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(isDark ? "light" : "dark");
  });

  // ----- bağlantı ile açılış -----
  const m = location.hash.match(/^#bitki\/([a-z0-9-]+)$/);
  if (m) open(m[1]);
  window.addEventListener("hashchange", () => { const m = location.hash.match(/^#bitki\/([a-z0-9-]+)$/); if (m) open(m[1]); else close(); });
})();
