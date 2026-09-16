# Bitki Kütüphanesi 🌿

Ev, balkon ve bahçe bitkileri için Türkçe, görsel bir bitki ansiklopedisi.
Tamamen statik; derleme, paket ya da sunucu gerektirmez. `index.html` dosyasını açmanız yeterli.

## Dört Mevsim Herbaryumu

Sayfanın açılış sahnesi: dört Anadolu bitkisi (Badem, Erguvan, Ortanca, Kızılcık) yan yana
durur; alttaki mevsim kaydırıcısını sürükledikçe yıl boyunca değişirler.

- **Fenoloji motoru**: her tür için tomurcuk, yaprak, çiçek, meyve ve dökülme pencereleri ay cinsinden
  tanımlıdır (`js/seasons.js` → `SPECIES`). Ara değerler yumuşak eğrilerle hesaplanır; her yaprak ve çiçek
  küçük bir rastgele gecikme taşıdığından geçişler doğal görünür.
- **Dal iskeleti** tohumlu rastgelelikle üretilir (ağaç, çok gövdeli çalı, ortanca sürgünleri); yapraklar
  ve çiçekler dallardaki düğümlere bağlanır.
- **Kaydırıcı**: sürükle, `←` `→` ile ilerle, mevsim adına tıkla, `▶` ile yılı oynat. Çentikler mevsim
  ortalarına denk gelir (Ocak · Nisan · Temmuz · Ekim · Ocak).
- Bitkiye tıklamak detay panelini açar; panelde "Kış / İlkbahar / Yaz / Sonbahar" satırı o bitkinin
  mevsimlik görünümünü özetler.

Yeni bir mevsimlik bitki eklemek için `js/plants.js` kaydına `mevsim` alanı, `js/seasons.js` içine tür
tanımı ekleyip `FEATURED` listesine kimliğini yazmanız yeterli.

## Katalog

- **45 bitki** · iç mekân, çiçekli, sukulent, kaktüs, aromatik/mutfak, ağaç & meyve
- **Anında arama** (Türkçe karakter duyarsız: "kaktus" → Kaktüs) ve `/` kısayolu
- **Filtreler**: kategori, ışık, su ihtiyacı, zorluk, yalnızca evcil dostu, koleksiyonum
- **Detay paneli**: ışık / su / nem / sıcaklık ölçekleri, köken, boy, çoğaltma, bakım notları, "Biliyor muydunuz?"
- **Koleksiyon**: kalp ile favorilere ekleme (tarayıcıda saklanır)
- **Paylaşılabilir bağlantılar**: `#bitki/monstera` gibi adresler doğrudan detayı açar
- **Klavye**: `/` ara · `←` `→` bitkiler arasında gez · `Esc` kapat
- **Açık / koyu tema** (sistem tercihini izler, elle değiştirilebilir)
- **Prosedürel illüstrasyonlar**: her bitki için form ve renk paletinden üretilen SVG; harici görsel gerekmez

## Çalıştırma

```bash
# Herhangi bir statik sunucu yeterli
npx serve .
# ya da doğrudan index.html dosyasını tarayıcıda açın
```

GitHub Pages ile yayınlamak için depo ayarlarından *Pages → Source → main / root* seçin.

## Tek dosyalık sürüm

```bash
node scripts/build-single.js   # dist/index.html üretir (CSS + JS gömülü)
```

## Bitki ekleme

`js/plants.js` içindeki diziye yeni bir nesne ekleyin:

```js
{
  id: "kucuk-harf-tire",        // benzersiz, URL'de kullanılır
  ad: "Türkçe ad", latince: "Latince ad", aile: "Familya", koken: "Köken",
  kategori: "ic-mekan",         // ic-mekan | cicekli | sukulent | kaktus | aromatik | agac
  etiketler: ["etiket"],
  isik: 2, su: 2, nem: 2,       // 1 az/gölge · 2 orta · 3 çok/tam güneş
  sicaklik: "18–27 °C", zorluk: "kolay", toksik: false, boy: "30–60 cm",
  form: "upright",              // upright | trailing | rosette | cactus | fern | flower | tree | palm | orchid | bulb
  yaprak: "#2f7a45", yaprak2: "#1e5a32", cicek: null,   // illüstrasyon renkleri
  gorsel: "img/bitki.jpg",      // isteğe bağlı: verilirse SVG yerine bu görsel kullanılır
  aciklama: "...", bakim: ["..."], ilginc: "...", cogaltma: "..."
}
```

## Dosya yapısı

```
index.html          sayfa iskeleti (herbaryum sahnesi + katalog)
css/style.css       tasarım (tokens, açık/koyu tema, responsive)
css/seasons.css     mevsim sahnesi
js/plants.js        veri seti
js/illustrate.js    katalog kartları için prosedürel SVG illüstrasyonlar
js/seasons.js       dal iskeleti + fenoloji motoru + kaydırıcı
js/detail.js        paylaşımlı detay paneli, koleksiyon, tema
js/app.js           arama, filtre, kart ızgarası
scripts/build-single.js   tek dosyalık dist derlemesi
```

Bakım değerleri genel rehber niteliğindedir; iklim ve konuma göre uyarlayın.
