// Tüm CSS ve JS'i tek bir HTML dosyasına gömer: dist/index.html (paylaşım / çevrimdışı kullanım için)
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, "..");
let html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "css/style.css"), "utf8");
const js = ["js/plants.js", "js/illustrate.js", "js/app.js"].map(f => fs.readFileSync(path.join(root, f), "utf8")).join("\n");
html = html.replace('<link rel="stylesheet" href="css/style.css">', () => `<style>\n${css}\n</style>`);
html = html.replace(/<script src="js\/plants.js"><\/script>\s*<script src="js\/illustrate.js"><\/script>\s*<script src="js\/app.js"><\/script>/, () => `<script>\n${js}\n</script>`);
fs.mkdirSync(path.join(root, "dist"), { recursive: true });
fs.writeFileSync(path.join(root, "dist/index.html"), html);
console.log("dist/index.html yazıldı:", (html.length / 1024).toFixed(0), "KB");
