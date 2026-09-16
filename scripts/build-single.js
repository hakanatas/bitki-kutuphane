// Tüm CSS ve JS'i tek bir HTML dosyasına gömer: dist/index.html (paylaşım / çevrimdışı kullanım için)
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, "..");
let html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = ["css/style.css", "css/seasons.css"].map(f => fs.readFileSync(path.join(root, f), "utf8")).join("\n");
const js = ["js/plants.js", "js/illustrate.js", "js/detail.js", "js/kareler.js", "js/seasons.js", "js/app.js"].map(f => fs.readFileSync(path.join(root, f), "utf8")).join("\n");
html = html.replace(/<link rel="stylesheet" href="css\/style.css">\s*<link rel="stylesheet" href="css\/seasons.css">/, () => `<style>\n${css}\n</style>`);
html = html.replace(/<script src="js\/plants.js"><\/script>\s*<script src="js\/illustrate.js"><\/script>\s*<script src="js\/detail.js"><\/script>\s*<script src="js\/kareler.js"><\/script>\s*<script src="js\/seasons.js"><\/script>\s*<script src="js\/app.js"><\/script>/, () => `<script>\n${js}\n</script>`);
// Mevsim karelerini (img/mevsim/<id>-<mevsim>.png) veri URI'si olarak göm → tek dosya çevrimdışı da çalışır
const imgDir = path.join(root, "img/mevsim"); const kareler = {};
if (fs.existsSync(imgDir)) for (const f of fs.readdirSync(imgDir)) {
  const m = f.match(/^([a-z0-9-]+)-(kis|ilkbahar|yaz|sonbahar)\.(png|webp)$/); if (!m) continue;
  const ay = { kis: 0.5, ilkbahar: 3.5, yaz: 6.5, sonbahar: 9.5 }[m[2]];
  (kareler[m[1]] = kareler[m[1]] || []).push({ ay, dosya: `data:image/${m[3]};base64,` + fs.readFileSync(path.join(imgDir, f)).toString("base64") });
}
const tam = Object.fromEntries(Object.entries(kareler).filter(([, v]) => v.length === 4));
if (Object.keys(tam).length) html = html.replace("</head>", () => `<script>window.KARELER = ${JSON.stringify(tam)};</script>\n</head>`);
fs.mkdirSync(path.join(root, "dist"), { recursive: true });
fs.writeFileSync(path.join(root, "dist/index.html"), html);
console.log("dist/index.html yazıldı:", (html.length / 1024).toFixed(0), "KB");
