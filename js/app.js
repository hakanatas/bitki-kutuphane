/* Katalog: arama, filtreler, kart ızgarası */
(function () {
  const PLANTS = window.PLANTS, UI = window.UI, Favs = window.Favs, esc = UI.esc;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const { KATEGORI, ISIK, SU, ZORLUK, ICONS } = UI;

  const state = { q: "", kategori: null, isik: null, su: null, zorluk: null, evcil: false, fav: false, sort: "ad" };
  const norm = (s) => s.toLocaleLowerCase("tr").replace(/ı/g, "i").replace(/İ/g, "i").normalize("NFD").replace(/[̀-ͯ]/g, "");

  function filtered() {
    const q = norm(state.q.trim());
    let list = PLANTS.filter(p => {
      if (state.kategori && p.kategori !== state.kategori) return false;
      if (state.isik && p.isik !== state.isik) return false;
      if (state.su && p.su !== state.su) return false;
      if (state.zorluk && p.zorluk !== state.zorluk) return false;
      if (state.evcil && p.toksik) return false;
      if (state.fav && !Favs.has(p.id)) return false;
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
  $("#clearBtn").addEventListener("click", () => {
    Object.assign(state, { q: "", kategori: null, isik: null, su: null, zorluk: null, evcil: false, fav: false });
    $("#q").value = ""; $("#fEvcil").checked = false; $("#fFav").checked = false; render();
  });

  const qEl = $("#q");
  qEl.addEventListener("input", () => { state.q = qEl.value; render(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== qEl && !window.Detail.isOpen()) { e.preventDefault(); qEl.focus(); qEl.scrollIntoView({ block: "center", behavior: "smooth" }); }
  });

  function card(p) {
    const on = Favs.has(p.id);
    return `<article class="card" data-id="${p.id}">
      <div class="card-art"><span class="num">${UI.num(p)}</span>${UI.art(p)}
        <button class="fav" type="button" aria-pressed="${on}" aria-label="${on ? "Koleksiyondan çıkar" : "Koleksiyona ekle"}" data-fav="${p.id}">${ICONS.heart}</button>
      </div>
      <div class="card-body">
        <div><h3>${esc(p.ad)}</h3><span class="latin">${esc(p.latince)}</span></div>
        <div class="card-meta">
          <span class="meter" title="Işık: ${ISIK[p.isik]}">${ICONS.sun}${UI.dots(p.isik)}</span>
          <span class="meter" title="Su: ${SU[p.su]}">${ICONS.drop}${UI.dots(p.su)}</span>
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
    if (!current.length) grid.innerHTML = `<div class="empty" style="grid-column:1/-1"><h3>Bu aramaya uyan bitki yok</h3><p>Filtreleri gevşetmeyi ya da farklı bir ad denemeyi deneyin.</p></div>`;
    else grid.innerHTML = current.map(card).join("");
  }

  $("#grid").addEventListener("click", (e) => {
    const f = e.target.closest("[data-fav]");
    if (f) { Favs.toggle(f.dataset.fav); return; }
    const o = e.target.closest("[data-open]");
    if (o) window.Detail.open(o.dataset.open, current);
  });
  document.addEventListener("favchange", (e) => {
    $("#favCount").textContent = Favs.size();
    if (state.fav) render();
    else $$(`[data-fav="${e.detail.id}"]`).forEach(b => b.setAttribute("aria-pressed", String(e.detail.on)));
  });

  $("#total").textContent = PLANTS.length;
  $("#favCount").textContent = Favs.size();
  $("#safeCount").textContent = PLANTS.filter(p => !p.toksik).length;
  $("#famCount").textContent = new Set(PLANTS.map(p => p.aile)).size;
  render();
})();
