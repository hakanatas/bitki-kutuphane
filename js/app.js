/* Bitki Kütüphanesi — uygulama */
(function () {
  const PLANTS = window.PLANTS;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  const KATEGORI = { "ic-mekan": "İç mekân", "cicekli": "Çiçekli", "sukulent": "Sukulent", "kaktus": "Kaktüs", "aromatik": "Aromatik & mutfak", "agac": "Ağaç & meyve" };
  const ISIK = { 1: "Gölge", 2: "Yarı gölge", 3: "Tam güneş" };
  const SU = { 1: "Az", 2: "Orta", 3: "Sık" };
  const NEM = { 1: "Düşük", 2: "Orta", 3: "Yüksek" };
  const ZORLUK = { kolay: "Kolay", orta: "Orta", zor: "Zor" };

  const ICONS = {
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    drop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/></svg>',
    mist: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 8h10M6 12h12M4 16h9M17 16h3"/></svg>',
    temp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/></svg>',
    paw: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="6" cy="10" r="2"/><circle cx="18" cy="10" r="2"/><circle cx="9" cy="6" r="2"/><circle cx="15" cy="6" r="2"/><path d="M12 11c-3 0-6 3-6 6a3 3 0 0 0 3 3c1 0 2-.5 3-.5s2 .5 3 .5a3 3 0 0 0 3-3c0-3-3-6-6-6z"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.4-7 10-7 10z"/></svg>',
    warn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 3l10 18H2L12 3z"/><path d="M12 10v4M12 17.5v.5"/></svg>',
    ruler: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 8h18v8H3zM7 8v3M11 8v3M15 8v3M19 8v3"/></svg>'
  };

  // ----- durum -----
  const state = { q: "", kategori: null, isik: null, su: null, zorluk: null, evcil: false, fav: false, sort: "ad" };
  let favs = new Set();
  try { favs = new Set(JSON.parse(localStorage.getItem("bk-favs") || "[]")); } catch (e) {}
  function saveFavs() { try { localStorage.setItem("bk-favs", JSON.stringify([...favs])); } catch (e) {} }

  // ----- tema -----
  function applyTheme(t) {
    if (t) document.documentElement.setAttribute("data-theme", t); else document.documentElement.removeAttribute("data-theme");
    try { t ? localStorage.setItem("bk-theme", t) : localStorage.removeItem("bk-theme"); } catch (e) {}
  }
  try { const t = localStorage.getItem("bk-theme"); if (t) applyTheme(t); } catch (e) {}
  $("#themeBtn").addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme");
    const sysDark = matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = cur ? cur === "dark" : sysDark;
    applyTheme(isDark ? "light" : "dark");
  });

  // ----- yardımcılar -----
  const norm = (s) => s.toLocaleLowerCase("tr").replace(/ı/g, "i").replace(/İ/g, "i").normalize("NFD").replace(/[̀-ͯ]/g, "");
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const art = (p) => p.gorsel ? `<img src="${esc(p.gorsel)}" alt="${esc(p.ad)}" loading="lazy">` : window.illustrate(p);
  const dots = (v) => `<span class="dots">${[1, 2, 3].map(i => `<i class="${i <= v ? "on" : ""}"></i>`).join("")}</span>`;
  const scale = (v) => `<span class="scale">${[1, 2, 3].map(i => `<i class="${i <= v ? "on" : ""}"></i>`).join("")}</span>`;
  const num = (p) => "No. " + String(PLANTS.indexOf(p) + 1).padStart(3, "0");

  function filtered() {
    const q = norm(state.q.trim());
    let list = PLANTS.filter(p => {
      if (state.kategori && p.kategori !== state.kategori) return false;
      if (state.isik && p.isik !== state.isik) return false;
      if (state.su && p.su !== state.su) return false;
      if (state.zorluk && p.zorluk !== state.zorluk) return false;
      if (state.evcil && p.toksik) return false;
      if (state.fav && !favs.has(p.id)) return false;
      if (q) {
        const hay = norm([p.ad, p.latince, p.aile, p.koken, KATEGORI[p.kategori], ...p.etiketler].join(" "));
        if (!q.split(/\s+/).every(w => hay.includes(w))) return false;
      }
      return true;
    });
    const col = new Intl.Collator("tr");
    if (state.sort === "ad") list.sort((a, b) => col.compare(a.ad, b.ad));
    else if (state.sort === "latince") list.sort((a, b) => col.compare(a.latince, b.latince));
    else if (state.sort === "zorluk") { const o = { kolay: 0, orta: 1, zor: 2 }; list.sort((a, b) => o[a.zorluk] - o[b.zorluk] || col.compare(a.ad, b.ad)); }
    else if (state.sort === "su") list.sort((a, b) => a.su - b.su || col.compare(a.ad, b.ad));
    return list;
  }

  // ----- filtre çipleri -----
  function chipGroup(el, key, options, getCount) {
    el.innerHTML = options.map(([val, label]) => `<button class="chip" type="button" data-key="${key}" data-val="${val}" aria-pressed="false">${label}<span class="n">${getCount(val)}</span></button>`).join("");
    el.addEventListener("click", (e) => {
      const b = e.target.closest(".chip"); if (!b) return;
      const val = isNaN(b.dataset.val) ? b.dataset.val : Number(b.dataset.val);
      state[key] = state[key] === val ? null : val;
      render();
    });
  }
  chipGroup($("#fKategori"), "kategori", Object.entries(KATEGORI), v => PLANTS.filter(p => p.kategori === v).length);
  chipGroup($("#fIsik"), "isik", Object.entries(ISIK).map(([k, v]) => [Number(k), v]), v => PLANTS.filter(p => p.isik === v).length);
  chipGroup($("#fSu"), "su", Object.entries(SU).map(([k, v]) => [Number(k), v]), v => PLANTS.filter(p => p.su === v).length);
  chipGroup($("#fZorluk"), "zorluk", Object.entries(ZORLUK), v => PLANTS.filter(p => p.zorluk === v).length);
  $("#fEvcil").addEventListener("change", (e) => { state.evcil = e.target.checked; render(); });
  $("#fFav").addEventListener("change", (e) => { state.fav = e.target.checked; render(); });
  $("#fSort").addEventListener("change", (e) => { state.sort = e.target.value; render(); });
  $("#clearBtn").addEventListener("click", clearAll);
  function clearAll() {
    Object.assign(state, { q: "", kategori: null, isik: null, su: null, zorluk: null, evcil: false, fav: false });
    $("#q").value = ""; $("#fEvcil").checked = false; $("#fFav").checked = false; render();
  }

  // ----- arama -----
  const qEl = $("#q");
  qEl.addEventListener("input", () => { state.q = qEl.value; render(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== qEl && !$("#detail").open) { e.preventDefault(); qEl.focus(); }
  });

  // ----- kart -----
  function card(p) {
    return `<article class="card" data-id="${p.id}">
      <div class="card-art"><span class="num">${num(p)}</span>${art(p)}
        <button class="fav" type="button" aria-pressed="${favs.has(p.id)}" aria-label="${favs.has(p.id) ? "Koleksiyondan çıkar" : "Koleksiyona ekle"}" data-fav="${p.id}">${ICONS.heart}</button>
      </div>
      <div class="card-body">
        <div><h3>${esc(p.ad)}</h3><span class="latin">${esc(p.latince)}</span></div>
        <div class="card-meta">
          <span class="meter" title="Işık: ${ISIK[p.isik]}">${ICONS.sun}${dots(p.isik)}</span>
          <span class="meter" title="Su: ${SU[p.su]}">${ICONS.drop}${dots(p.su)}</span>
          <span class="badge ${p.zorluk}">${ZORLUK[p.zorluk]}</span>
          ${p.toksik ? "" : `<span class="badge safe" title="Evcil hayvanlar için güvenli">Evcil dostu</span>`}
        </div>
      </div>
      <button class="card-open" type="button" aria-label="${esc(p.ad)} detaylarını aç" data-open="${p.id}"></button>
    </article>`;
  }

  let current = [];
  function render() {
    current = filtered();
    $$(".chip[data-key]").forEach(b => { const v = isNaN(b.dataset.val) ? b.dataset.val : Number(b.dataset.val); b.setAttribute("aria-pressed", String(state[b.dataset.key] === v)); });
    $("#count").textContent = current.length === PLANTS.length ? `${PLANTS.length} bitki` : `${current.length} / ${PLANTS.length} bitki`;
    const act = [];
    if (state.kategori) act.push(KATEGORI[state.kategori]);
    if (state.isik) act.push("Işık: " + ISIK[state.isik]);
    if (state.su) act.push("Su: " + SU[state.su]);
    if (state.zorluk) act.push(ZORLUK[state.zorluk]);
    if (state.evcil) act.push("Evcil dostu");
    if (state.fav) act.push("Koleksiyonum");
    if (state.q.trim()) act.push(`“${state.q.trim()}”`);
    $("#active").innerHTML = act.map(a => `<span class="chip" aria-pressed="true">${esc(a)}</span>`).join("");
    $("#clearBtn").hidden = act.length === 0;
    const grid = $("#grid");
    if (!current.length) {
      grid.innerHTML = `<div class="empty" style="grid-column:1/-1"><h3>Bu aramaya uyan bitki yok</h3><p>Filtreleri gevşetmeyi ya da farklı bir ad denemeyi deneyin.</p></div>`;
    } else grid.innerHTML = current.map(card).join("");
  }

  $("#grid").addEventListener("click", (e) => {
    const f = e.target.closest("[data-fav]");
    if (f) { toggleFav(f.dataset.fav); return; }
    const o = e.target.closest("[data-open]");
    if (o) openDetail(o.dataset.open);
  });
  function toggleFav(id) {
    favs.has(id) ? favs.delete(id) : favs.add(id); saveFavs();
    $("#favCount").textContent = favs.size;
    if (state.fav) render();
    else $$(`[data-fav="${id}"]`).forEach(b => { b.setAttribute("aria-pressed", String(favs.has(id))); });
  }

  // ----- detay -----
  const dlg = $("#detail");
  let detailId = null;
  function openDetail(id, push = true) {
    const p = PLANTS.find(x => x.id === id); if (!p) return;
    detailId = id;
    const list = current.length ? current : PLANTS;
    const i = list.findIndex(x => x.id === id);
    const prev = list[(i - 1 + list.length) % list.length], next = list[(i + 1) % list.length];
    $("#detailBody").innerHTML = `
      <div class="detail-hero">
        <div class="detail-art">${art(p)}</div>
        <div class="detail-title">
          <span class="eyebrow">${num(p)} · ${esc(p.aile)} · ${esc(KATEGORI[p.kategori])}</span>
          <h2>${esc(p.ad)}</h2><span class="latin">${esc(p.latince)}</span>
          <p>${esc(p.aciklama)}</p>
          <div class="tags">${p.etiketler.map(t => `<span class="badge">${esc(t)}</span>`).join("")}</div>
        </div>
      </div>
      <div class="care">
        <div class="care-item"><span class="lab">${ICONS.sun} Işık</span><span class="val">${ISIK[p.isik]}</span>${scale(p.isik)}</div>
        <div class="care-item"><span class="lab">${ICONS.drop} Su</span><span class="val">${SU[p.su]}</span>${scale(p.su)}</div>
        <div class="care-item"><span class="lab">${ICONS.mist} Nem</span><span class="val">${NEM[p.nem]}</span>${scale(p.nem)}</div>
        <div class="care-item"><span class="lab">${ICONS.temp} Sıcaklık</span><span class="val">${esc(p.sicaklik)}</span></div>
      </div>
      <div class="toxic-note ${p.toksik ? "" : "safe"}">${p.toksik ? ICONS.warn : ICONS.paw}<span>${p.toksik ? "Kedi, köpek ve küçük çocuklar için zehirli olabilir. Ulaşamayacakları bir yerde tutun." : "Evcil hayvanlar için güvenli kabul edilir."}</span></div>
      <div class="facts">
        <div class="fact"><span class="eyebrow">Köken</span><span class="v">${esc(p.koken)}</span></div>
        <div class="fact"><span class="eyebrow">Boy</span><span class="v">${esc(p.boy)}</span></div>
        <div class="fact"><span class="eyebrow">Zorluk</span><span class="v">${ZORLUK[p.zorluk]}</span></div>
        <div class="fact"><span class="eyebrow">Çoğaltma</span><span class="v">${esc(p.cogaltma)}</span></div>
      </div>
      <div class="section"><h3>Bakım notları</h3><ul class="tips">${p.bakim.map(b => `<li><span>${esc(b)}</span></li>`).join("")}</ul></div>
      <div class="callout"><span class="eyebrow">Biliyor muydunuz?</span>${esc(p.ilginc)}</div>`;
    $("#prevBtn").onclick = () => openDetail(prev.id);
    $("#nextBtn").onclick = () => openDetail(next.id);
    $("#prevBtn").title = prev.ad; $("#nextBtn").title = next.ad;
    $("#detailFav").setAttribute("aria-pressed", String(favs.has(p.id)));
    $("#detailFav").onclick = () => { toggleFav(p.id); $("#detailFav").setAttribute("aria-pressed", String(favs.has(p.id))); };
    if (!dlg.open) dlg.showModal();
    $(".detail-panel").scrollTop = 0;
    if (push) history.replaceState(null, "", "#bitki/" + id);
    document.title = `${p.ad} · Bitki Kütüphanesi`;
  }
  function closeDetail() { if (dlg.open) dlg.close(); }
  dlg.addEventListener("close", () => { detailId = null; history.replaceState(null, "", location.pathname + location.search); document.title = "Bitki Kütüphanesi"; });
  dlg.addEventListener("click", (e) => { if (e.target === dlg) closeDetail(); });
  $("#closeBtn").addEventListener("click", closeDetail);
  document.addEventListener("keydown", (e) => {
    if (!dlg.open) return;
    if (e.key === "ArrowLeft") $("#prevBtn").click();
    if (e.key === "ArrowRight") $("#nextBtn").click();
  });
  $("#shareBtn").addEventListener("click", async () => {
    const url = location.href; const btn = $("#shareBtn");
    try { await navigator.clipboard.writeText(url); btn.title = "Bağlantı kopyalandı"; setTimeout(() => (btn.title = "Bağlantıyı kopyala"), 1500); } catch (e) { prompt("Bağlantı:", url); }
  });

  // ----- başlangıç -----
  $("#total").textContent = PLANTS.length;
  $("#favCount").textContent = favs.size;
  $("#safeCount").textContent = PLANTS.filter(p => !p.toksik).length;
  $("#famCount").textContent = new Set(PLANTS.map(p => p.aile)).size;
  render();
  const m = location.hash.match(/^#bitki\/([a-z0-9-]+)$/);
  if (m) openDetail(m[1], false);
  window.addEventListener("hashchange", () => { const m = location.hash.match(/^#bitki\/([a-z0-9-]+)$/); if (m) openDetail(m[1], false); else closeDetail(); });
})();
