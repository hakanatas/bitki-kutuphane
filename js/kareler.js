/* İsteğe bağlı: mevsim kareleri için özel tanımlar.
 * Varsayılan olarak her öne çıkan bitki için şu dört dosya aranır (img/mevsim/ içinde):
 *   <id>-kis.png  <id>-ilkbahar.png  <id>-yaz.png  <id>-sonbahar.png
 * Dördü de yüklenirse fotoğraf modu açılır; biri eksikse SVG illüstrasyon kullanılır.
 *
 * Daha fazla ara kare istiyorsanız (ör. badem için ayrı bir "çiçek" karesi) burada tanımlayın.
 * "ay" değeri 0 = 1 Ocak, 12 = 31 Aralık; kareler arasında kaydırıcı çapraz geçiş yapar.
 *
 * window.KARELER = {
 *   badem: [
 *     { ay: 0.5, dosya: "badem-kis.png" },
 *     { ay: 2.6, dosya: "badem-cicek.png" },
 *     { ay: 4.2, dosya: "badem-ilkbahar.png" },
 *     { ay: 6.5, dosya: "badem-yaz.png" },
 *     { ay: 9.5, dosya: "badem-sonbahar.png" }
 *   ]
 * };
 */
window.KARELER = window.KARELER || {};
