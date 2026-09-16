# Bitki Kütüphanesi 🌿

Ev, balkon ve bahçe bitkileri için Türkçe, görsel bir bitki ansiklopedisi.
Tamamen statik; derleme, paket ya da sunucu gerektirmez. `index.html` dosyasını açmanız yeterli.

## Özellikler

- **42 bitki** · iç mekân, çiçekli, sukulent, kaktüs, aromatik/mutfak, ağaç & meyve
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
index.html          sayfa iskeleti
css/style.css       tasarım (tokens, açık/koyu tema, responsive)
js/plants.js        veri seti
js/illustrate.js    prosedürel SVG illüstrasyon üreteci
js/app.js           arama, filtre, detay paneli, koleksiyon, tema
scripts/build-single.js   tek dosyalık dist derlemesi
```

Bakım değerleri genel rehber niteliğindedir; iklim ve konuma göre uyarlayın.
