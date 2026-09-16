# Mevsim kareleri — görsel üretim rehberi

Bu klasöre her bitki için **dört şeffaf PNG** koyun; sayfa dosyaları bulduğu anda o bitkiyi
illüstrasyondan fotoğraf moduna geçirir. Eksik kare varsa SVG illüstrasyon kullanılmaya devam eder.

## Dosya adları

| Bitki    | Kış                | İlkbahar                | Yaz                | Sonbahar                |
|----------|--------------------|-------------------------|--------------------|-------------------------|
| Badem    | `badem-kis.png`    | `badem-ilkbahar.png`    | `badem-yaz.png`    | `badem-sonbahar.png`    |
| Erguvan  | `erguvan-kis.png`  | `erguvan-ilkbahar.png`  | `erguvan-yaz.png`  | `erguvan-sonbahar.png`  |
| Ortanca  | `ortanca-kis.png`  | `ortanca-ilkbahar.png`  | `ortanca-yaz.png`  | `ortanca-sonbahar.png`  |
| Kızılcık | `kizilcik-kis.png` | `kizilcik-ilkbahar.png` | `kizilcik-yaz.png` | `kizilcik-sonbahar.png` |

## Teknik şartlar

- **Şeffaf arka planlı PNG.** Model düz beyaz/krem fonda üretiyorsa arka planı kaldırın (remove.bg,
  Photoshop "Remove Background", Photopea vb.). Sayfanın zemini krem-yeşil ve koyu temada koyu olduğundan
  fon şeffaf olmalı.
- **Dikey, 3:4 oran, en az 1200×1600 px.** Bitki ortalanmış, gövde/sap alt kenara kadar uzanmalı; sayfa alt
  %18'i yumuşakça soldurur (videodaki gibi).
- **Aynı bitkinin dört karesinde aynı dal biçimi ve aynı kadraj.** Bunun için önce ilkbahar (ya da yaz) karesini
  üretin, sonra diğer mevsimleri o görseli referans vererek üretin:
  - Midjourney: `--cref <ilkbahar görsel URL> --cw 100 --ar 3:4 --style raw`
  - Ideogram / Leonardo / Firefly: "reference image / image guidance" alanına ilkbahar karesini verin
  - ChatGPT / Nano Banana gibi sohbet tabanlı modeller: ilkbahar karesini yükleyip "aynı dal, aynı açı, sadece
    mevsimi değiştir" deyin.
- Her karede **tek bir dal/sürgün demeti**, gölge yok, saksı yok, toprak yok, yazı yok.

## Ortak üslup eki (her prompt'un sonuna ekleyin)

```
single cut branch specimen, herbarium style botanical illustration, realistic watercolor and gouache
on smooth paper, fine botanical detail, soft natural light, no cast shadow, isolated on plain
flat white background, centered, vertical composition, stem reaching the bottom edge, no pot,
no soil, no text, no border, 3:4
```

Negatif prompt destekleyen modeller için: `pot, vase, soil, ground, text, watermark, frame, shadow,
multiple branches scattered, blurry, photo background`

---

## Badem — *Prunus dulcis*

**Kış** `badem-kis.png`
```
bare almond tree branch in mid-winter, leafless, reddish-brown bark with small dormant flower
buds along the twigs, elegant upright branching, no flowers, no leaves
```
**İlkbahar** `badem-ilkbahar.png`
```
almond branch in full bloom in March, densely covered with pale pink and white five-petal
blossoms with deep pink centers, flowers open directly on bare reddish-brown wood, no leaves yet
```
**Yaz** `badem-yaz.png`
```
almond branch in summer, narrow glossy lance-shaped green leaves, a few velvety green almond
fruits hanging from the twigs, lush and healthy
```
**Sonbahar** `badem-sonbahar.png`
```
almond branch in late autumn, narrow leaves turned golden yellow and ochre, some leaves
sparse and thinning, reddish-brown twigs showing through
```

## Erguvan — *Cercis siliquastrum*

**Kış** `erguvan-kis.png`
```
bare Judas tree branch in winter, dark zigzag twigs, leafless, a few dry brown flat seed pods
hanging from the branch, dormant
```
**İlkbahar** `erguvan-ilkbahar.png`
```
Judas tree branch in April, clusters of vivid magenta pink pea-shaped flowers growing directly
on the bare dark wood and old branches (cauliflory), no leaves, abundant bloom
```
**Yaz** `erguvan-yaz.png`
```
Judas tree branch in summer, large rounded heart-shaped bright green leaves with smooth
edges, a few flat green seed pods, dense foliage
```
**Sonbahar** `erguvan-sonbahar.png`
```
Judas tree branch in autumn, heart-shaped leaves turned clear yellow and gold, brown flat
seed pods hanging, some leaves fallen
```

## Ortanca — *Hydrangea macrophylla*

**Kış** `ortanca-kis.png`
```
hydrangea in winter, a fan of bare woody upright canes with visible nodes, leafless, each cane
topped with a dried papery brown flower head, dormant
```
**İlkbahar** `ortanca-ilkbahar.png`
```
hydrangea in spring, upright woody canes with fresh bright green new shoots and young
serrated leaves unfolding in opposite pairs, no flowers yet
```
**Yaz** `ortanca-yaz.png`
```
hydrangea macrophylla in July, large round blue mophead flower heads made of many
four-petal florets, big glossy dark green serrated leaves in opposite pairs, upright canes
```
**Sonbahar** `ortanca-sonbahar.png`
```
hydrangea in October, flower heads faded to dusty pink, mauve and green antique tones,
leaves turning yellow-brown, canes upright
```

## Kızılcık — *Cornus mas*

**Kış** `kizilcik-kis.png`
```
cornelian cherry dogwood branch in late winter, bare grey-brown twigs covered with small
round clusters of tiny bright yellow flowers, blooming before the leaves, no foliage
```
**İlkbahar** `kizilcik-ilkbahar.png`
```
cornelian cherry dogwood branch in spring, fresh light green oval leaves with curved veins
arranged in opposite pairs, no flowers, no fruit
```
**Yaz** `kizilcik-yaz.png`
```
cornelian cherry dogwood branch in summer, dark green oval leaves, oblong fruits ripening
from green to bright red, hanging in small clusters
```
**Sonbahar** `kizilcik-sonbahar.png`
```
cornelian cherry dogwood branch in autumn, glossy bright red oblong cornelian cherry fruits,
leaves turned purple-red and burgundy
```

## Kontrol listesi

1. Dört karenin dal biçimi ve kadrajı aynı mı? (Kaydırıcı geçişinde dal "zıplamamalı".)
2. Arka plan gerçekten şeffaf mı? (Beyaz kutu görünüyorsa PNG'de alfa kanalı yoktur.)
3. Sap alt kenara kadar iniyor mu?
4. Dosya adları küçük harf ve Türkçe karaktersiz mi? (`kizilcik`, `kis`)

Dosyaları bu klasöre koyup sayfayı yenilemeniz yeterlidir; kod değişikliği gerekmez.
