/* Bitki Kütüphanesi — veri seti
 * Alanlar:
 *  isik: 1 gölge · 2 yarı gölge / parlak dolaylı · 3 tam güneş
 *  su:   1 az · 2 orta · 3 sık
 *  nem:  1 düşük · 2 orta · 3 yüksek
 *  zorluk: "kolay" | "orta" | "zor"
 *  form: illüstrasyon şablonu (upright | trailing | rosette | cactus | fern | flower | tree | palm | orchid | bulb)
 */
window.PLANTS = [
  {
    id: "badem", ad: "Badem", latince: "Prunus dulcis", aile: "Rosaceae", koken: "Orta Asya, Anadolu",
    kategori: "agac", etiketler: ["ağaç", "erken çiçekli", "meyveli", "arı dostu"],
    isik: 3, su: 1, nem: 1, sicaklik: "-5–35 °C", zorluk: "orta", toksik: false, boy: "4–8 m",
    form: "tree", yaprak: "#5f9a4e", yaprak2: "#d9b04a", cicek: "#f3c9d6",
    aciklama: "Kış bitmeden, daha yapraklar çıkmadan çıplak dallarda açan pembe-beyaz çiçekleriyle Anadolu'da baharın ilk habercisi. Yazın kadifemsi yeşil meyveleri olgunlaşır, sonbaharda yapraklar sarıya döner.",
    bakim: ["Derin, süzek ve kireçli toprakları sever; su tutan topraktan kaçının.", "Tam güneş ve geç donlardan korunaklı bir konum seçin.", "Yerleştikten sonra kuraklığa dayanır; meyve tutumu için haziranda birkaç derin sulama yeterli.", "Kış sonunda seyreltme budaması yapın; çiçek tomurcukları geçen yılın dallarındadır."],
    ilginc: "Badem, gerçekte bir meyve değil şeftali ve kayısının akrabası olan bir sert çekirdekli meyvenin tohumudur; Datça bademi coğrafi işaretlidir.",
    cogaltma: "Aşı (acı badem anacı üzerine) veya tohum",
    mevsim: { kis: "Çıplak, kızıl kahve dallar", ilkbahar: "Şubat sonu–mart: pembe-beyaz çiçek", yaz: "Dar, parlak yapraklar ve tüylü yeşil meyve", sonbahar: "Sarı yapraklar, dökülme" }
  },
  {
    id: "erguvan", ad: "Erguvan", latince: "Cercis siliquastrum", aile: "Fabaceae", koken: "Doğu Akdeniz, Anadolu",
    kategori: "agac", etiketler: ["ağaç", "çiçekli", "İstanbul", "arı dostu"],
    isik: 3, su: 1, nem: 1, sicaklik: "-10–35 °C", zorluk: "kolay", toksik: false, boy: "4–10 m",
    form: "tree", yaprak: "#4f9450", yaprak2: "#e2c04a", cicek: "#d6479a",
    aciklama: "Nisan-mayısta yaprak açmadan gövde ve dallarını mor-pembe çiçeklerle kaplayan Boğaziçi'nin simge ağacı. Kalp biçimli yaprakları yazı, kahverengi baklaları kışı süsler.",
    bakim: ["Tam güneş; fakir ve kireçli toprakta bile iyi gelişir.", "Kazık köklüdür, yerini değiştirmeyi sevmez; küçükken dikin.", "Yerleştikten sonra sulama gerektirmez.", "Budamayı çiçekten hemen sonra, en az düzeyde yapın."],
    ilginc: "Çiçekler doğrudan yaşlı gövde üzerinde açar (kauliflori); halk arasında Yahuda ağacı olarak da bilinir ve İstanbul'da her yıl 'erguvan zamanı' kutlanır.",
    cogaltma: "Tohum (kabuğu çizilerek) veya yaz çeliği",
    mevsim: { kis: "Zikzak dallar ve sarkan kuru baklalar", ilkbahar: "Nisan: gövdeye kadar mor-pembe çiçek", yaz: "Kalp biçimli iri yapraklar, yeşil baklalar", sonbahar: "Sarı yapraklar, kahverengi baklalar" }
  },
  {
    id: "kizilcik", ad: "Kızılcık", latince: "Cornus mas", aile: "Cornaceae", koken: "Anadolu, Kafkasya, Güney Avrupa",
    kategori: "agac", etiketler: ["çalı", "erken çiçekli", "meyveli", "arı dostu"],
    isik: 2, su: 2, nem: 2, sicaklik: "-20–32 °C", zorluk: "kolay", toksik: false, boy: "3–6 m",
    form: "tree", yaprak: "#4b8f47", yaprak2: "#a4382f", cicek: "#e6c530",
    aciklama: "Şubatta, kar erimeden çıplak dallarda açan minik sarı çiçek şemsiyeleriyle yılın ilk baharını yaşatır. Eylülde parlak kırmızı, ekşi meyveleri; ekimde kızıl-mor yaprakları gelir.",
    bakim: ["Yarı gölgeden tam güneşe geniş toleranslıdır.", "İlk yıllarda düzenli sulayın, sonra kuraklığa dayanır.", "Neredeyse budama istemez; çalı ya da küçük ağaç formunda bırakılabilir.", "Meyve için farklı bir bireyle tozlaşma verimi artırır."],
    ilginc: "Odunu o kadar serttir ki suda batar; antik çağda mızrak sapı yapılırdı. 'Kızılcık şerbeti' Osmanlı mutfağının klasiğidir.",
    cogaltma: "Tohum (2 yıl çimlenme) veya aşı",
    mevsim: { kis: "Şubat: çıplak dalda sarı çiçek şemsiyeleri", ilkbahar: "Karşılıklı dizilmiş oval yapraklar", yaz: "Koyu yeşil yapraklar, yeşilden kızaran meyve", sonbahar: "Kırmızı meyveler ve kızıl-mor yapraklar" }
  },
  {
    id: "monstera", ad: "Monstera", latince: "Monstera deliciosa", aile: "Araceae", koken: "Orta Amerika",
    kategori: "ic-mekan", etiketler: ["yeşil yapraklı", "büyük yapraklı", "tropik"],
    isik: 2, su: 2, nem: 2, sicaklik: "18–27 °C", zorluk: "kolay", toksik: true, boy: "1–3 m",
    form: "upright", yaprak: "#2f7a45", yaprak2: "#1e5a32", cicek: null,
    aciklama: "Delikli, yelpaze gibi açılan yapraklarıyla tropik iç mekânın simgesi. Doğal ortamında ağaçlara tırmanır; evde bir yosun direği verirseniz yapraklar daha iri ve delikli olur.",
    bakim: ["Toprağın üst 3–4 cm'si kuruyunca sulayın; su birikmesi kök çürüğüne yol açar.", "Doğrudan güneşten uzak, parlak bir pencere kenarı idealdir.", "Yaprakları ayda bir nemli bezle silin; toz fotosentezi düşürür.", "Bahar ve yazda ayda bir sıvı gübre verin."],
    ilginc: "Yapraklardaki delikler (fenestrasyon) yağmur ormanı zeminine ışığın ulaşmasını sağlar; genç yapraklar deliksiz çıkar.",
    cogaltma: "Gövde çeliği (boğum + hava kökü ile)"
  },
  {
    id: "pasa-kilici", ad: "Paşa Kılıcı", latince: "Dracaena trifasciata", aile: "Asparagaceae", koken: "Batı Afrika",
    kategori: "ic-mekan", etiketler: ["dayanıklı", "hava temizleyici", "az su"],
    isik: 2, su: 1, nem: 1, sicaklik: "15–30 °C", zorluk: "kolay", toksik: true, boy: "40–120 cm",
    form: "upright", yaprak: "#3f8a4c", yaprak2: "#b7c86a", cicek: null,
    aciklama: "Kılıç gibi dik yaprakları ve neredeyse yok edilemez yapısıyla yeni başlayanların favorisi. Loş köşelerde de yaşar, haftalarca susuz kalabilir.",
    bakim: ["Kışın ayda bir, yazın iki haftada bir sulamak yeterli.", "Fazla su tek gerçek düşmanı; drenajı iyi kaktüs toprağı kullanın.", "Her ışık koşuluna uyum sağlar, parlak ışıkta daha hızlı büyür.", "Saksıyı küçük tutmak büyümeyi teşvik eder."],
    ilginc: "Geceleri de oksijen üretebilen az sayıdaki bitkiden biridir (CAM fotosentezi); yatak odası için sıkça önerilir.",
    cogaltma: "Yaprak çeliği veya kök ayırma"
  },
  {
    id: "baris-cicegi", ad: "Barış Çiçeği", latince: "Spathiphyllum wallisii", aile: "Araceae", koken: "Kolombiya, Venezuela",
    kategori: "cicekli", etiketler: ["çiçekli", "gölge sever", "hava temizleyici"],
    isik: 1, su: 2, nem: 2, sicaklik: "18–25 °C", zorluk: "kolay", toksik: true, boy: "40–80 cm",
    form: "flower", yaprak: "#256b3a", yaprak2: "#184a28", cicek: "#f4f1e6",
    aciklama: "Beyaz yelken gibi çiçekleriyle (spata) loş ortamlara zarafet katar. Susuz kaldığında dramatik biçimde solar, sulanınca saatler içinde toparlanır.",
    bakim: ["Toprağı hafif nemli tutun; yapraklar sarkınca sulama zamanı gelmiştir.", "Doğrudan güneş yaprakları yakar; kuzey penceresi idealdir.", "Sık sık yaprak spreyi nem ihtiyacını karşılar.", "Solan çiçekleri dipten kesin."],
    ilginc: "NASA'nın Temiz Hava Çalışması'nda benzen ve formaldehit süzen bitkiler arasında listelendi.",
    cogaltma: "Kök ayırma"
  },
  {
    id: "potos", ad: "Salon Sarmaşığı (Potos)", latince: "Epipremnum aureum", aile: "Araceae", koken: "Solomon Adaları",
    kategori: "ic-mekan", etiketler: ["sarkan", "dayanıklı", "hızlı büyür"],
    isik: 2, su: 2, nem: 2, sicaklik: "17–30 °C", zorluk: "kolay", toksik: true, boy: "2–10 m (sürgün)",
    form: "trailing", yaprak: "#3c8f4a", yaprak2: "#d8d27a", cicek: null,
    aciklama: "Kalp biçimli, sarı benekli yapraklarıyla raflardan aşağı süzülen klasik. Su dolu bir bardakta bile köklenir ve aylarca yaşar.",
    bakim: ["Toprak kuruyunca sulayın; su birikmesinden kaçının.", "Düşük ışıkta alacalı desen solar, parlak dolaylı ışıkta canlanır.", "Uzayan sürgünleri budayın; kesilen parçalar suda köklenir.", "Yılda bir kez bir boy büyük saksıya alın."],
    ilginc: "'Şeytan sarmaşığı' takma adı karanlıkta bile yeşil kalmasından gelir.",
    cogaltma: "Gövde çeliği (suda köklenir)"
  },
  {
    id: "kaucuk", ad: "Kauçuk", latince: "Ficus elastica", aile: "Moraceae", koken: "Hindistan, Malezya",
    kategori: "ic-mekan", etiketler: ["parlak yapraklı", "ağaç formu", "dayanıklı"],
    isik: 2, su: 2, nem: 2, sicaklik: "16–27 °C", zorluk: "kolay", toksik: true, boy: "1–3 m",
    form: "tree", yaprak: "#234d2c", yaprak2: "#7a2f3b", cicek: null,
    aciklama: "Kalın, cilalı gibi parlayan koyu yeşil yapraklarıyla heykelsi bir görünüm sunar. Bordo yapraklı 'Burgundy' çeşidi en çok aranan formudur.",
    bakim: ["Toprağın üst yarısı kuruyunca sulayın.", "Yerini sık değiştirmeyin; yaprak dökebilir.", "Yaprakları silmek parlaklığını korur.", "Tepesini keserek dallanmaya zorlayabilirsiniz."],
    ilginc: "Sütümsü özsuyu (lateks) tarihte gerçek kauçuk üretiminde kullanılmıştır; cilde tahriş edicidir.",
    cogaltma: "Gövde çeliği veya daldırma"
  },
  {
    id: "benjamin", ad: "Benjamin", latince: "Ficus benjamina", aile: "Moraceae", koken: "Güneydoğu Asya, Avustralya",
    kategori: "ic-mekan", etiketler: ["ağaç formu", "ofis bitkisi"],
    isik: 2, su: 2, nem: 2, sicaklik: "16–24 °C", zorluk: "orta", toksik: true, boy: "1–3 m",
    form: "tree", yaprak: "#3b8a49", yaprak2: "#9ed08e", cicek: null,
    aciklama: "Sarkan ince dallarıyla iç mekânın küçük ağacı. Yer değişikliğine ve cereyana yaprak dökerek tepki verir; yerini sevdiğinde yıllarca büyür.",
    bakim: ["Sabit, parlak ve cereyansız bir konum seçin.", "Toprağın üst 2–3 cm'si kuruyunca sulayın.", "Kışın sulamayı azaltın, gübreyi kesin.", "Bahar başında şekil budaması yapın."],
    ilginc: "Bangkok'un resmi ağacıdır ve tropik iklimde 30 m'ye ulaşabilir.",
    cogaltma: "Yarı odunsu çelik"
  },
  {
    id: "keman-yaprakli", ad: "Keman Yapraklı İncir", latince: "Ficus lyrata", aile: "Moraceae", koken: "Batı Afrika",
    kategori: "ic-mekan", etiketler: ["büyük yapraklı", "tasarım bitkisi"],
    isik: 2, su: 2, nem: 2, sicaklik: "18–26 °C", zorluk: "zor", toksik: true, boy: "1,5–3 m",
    form: "tree", yaprak: "#2b6b3a", yaprak2: "#1d4d29", cicek: null,
    aciklama: "Keman gövdesini andıran dev yapraklarıyla iç mimarların gözdesi. Güzel ama nazlı: ışık, su ve konum konusunda tutarlılık ister.",
    bakim: ["Bol parlak dolaylı ışık; birkaç saat sabah güneşi de sever.", "Sulamayı düzenli aralıklarla ve aynı miktarda yapın.", "Kahverengi lekeler genellikle aşırı sulamadan kaynaklanır.", "Ayda bir saksıyı çeyrek tur döndürün."],
    ilginc: "Doğal ortamında başka bir ağacın üstünde epifit olarak başlar, sonra konağını sarar.",
    cogaltma: "Gövde çeliği veya hava daldırma"
  },
  {
    id: "kurdele", ad: "Kurdele Çiçeği", latince: "Chlorophytum comosum", aile: "Asparagaceae", koken: "Güney Afrika",
    kategori: "ic-mekan", etiketler: ["sarkan", "hava temizleyici", "evcil dostu"],
    isik: 2, su: 2, nem: 2, sicaklik: "15–27 °C", zorluk: "kolay", toksik: false, boy: "30–60 cm",
    form: "rosette", yaprak: "#8fcf7a", yaprak2: "#f1f4dc", cicek: null,
    aciklama: "Beyaz şeritli ince yapraklarının ucunda minik yavru bitkiler sarkar. Çocuk ve evcil hayvanlı evler için güvenli, cömert bir bitki.",
    bakim: ["Haftada bir sulayın; klorlu suya duyarlı olduğundan dinlendirilmiş su kullanın.", "Yaprak uçlarının kahverengileşmesi kuru havadan kaynaklanır.", "Yavruları kesip suda köklendirerek çoğaltın.", "Asma saksıda en güzel görünümünü alır."],
    ilginc: "Tek bir bitki bir sezonda onlarca yavru üretebilir; bu yüzden 'örümcek bitkisi' de denir.",
    cogaltma: "Yavru bitkiler (stolon)"
  },
  {
    id: "zamia", ad: "Zamia", latince: "Zamioculcas zamiifolia", aile: "Araceae", koken: "Doğu Afrika",
    kategori: "ic-mekan", etiketler: ["dayanıklı", "az su", "ofis bitkisi"],
    isik: 1, su: 1, nem: 1, sicaklik: "16–27 °C", zorluk: "kolay", toksik: true, boy: "60–90 cm",
    form: "upright", yaprak: "#1f5c30", yaprak2: "#2f8a45", cicek: null,
    aciklama: "Mumlu, koyu yeşil yapraklarıyla yapay gibi görünecek kadar kusursuz. Toprak altındaki yumruları su depoladığından ihmal edilmeyi sever.",
    bakim: ["Sulamalar arasında toprağın tamamen kurumasını bekleyin.", "Kışın ayda bir sulama yeterlidir.", "Loş ortamlara dayanır ama parlak ışıkta daha hızlı büyür.", "Sararan yaprak = fazla su."],
    ilginc: "Kuraklıkta yapraklarını dökerek yumrudan yeniden sürer; aylarca susuz hayatta kalabilir.",
    cogaltma: "Yaprak çeliği veya yumru ayırma"
  },
  {
    id: "kalatea", ad: "Kalatea", latince: "Goeppertia orbifolia", aile: "Marantaceae", koken: "Bolivya",
    kategori: "ic-mekan", etiketler: ["desenli yapraklı", "evcil dostu", "nem sever"],
    isik: 1, su: 2, nem: 3, sicaklik: "18–26 °C", zorluk: "zor", toksik: false, boy: "40–80 cm",
    form: "rosette", yaprak: "#5d9e6a", yaprak2: "#cfe3c4", cicek: null,
    aciklama: "Gümüş çizgili, yuvarlak yaprakları geceleri yukarı kalkar, sabah yeniden açılır. Yüksek nem ister; banyo penceresi için biçilmiş kaftan.",
    bakim: ["Toprağı sürekli hafif nemli tutun, asla kurutmayın.", "Musluk suyundaki kireç yaprak kenarlarını yakar; yağmur veya arıtılmış su kullanın.", "Nem %60'ın altına düşerse nemlendirici ya da çakıl tepsisi kullanın.", "Doğrudan güneş desenleri soldurur."],
    ilginc: "'Dua bitkisi' ailesindendir: yaprakları yaprak sapındaki özel bir eklem (pulvinus) sayesinde günlük ritimle hareket eder.",
    cogaltma: "Kök ayırma"
  },
  {
    id: "areka", ad: "Areka Palmiyesi", latince: "Dypsis lutescens", aile: "Arecaceae", koken: "Madagaskar",
    kategori: "ic-mekan", etiketler: ["palmiye", "hava temizleyici", "evcil dostu"],
    isik: 2, su: 2, nem: 2, sicaklik: "18–27 °C", zorluk: "orta", toksik: false, boy: "1–2,5 m",
    form: "palm", yaprak: "#5fae5a", yaprak2: "#c9b45c", cicek: null,
    aciklama: "Altın sarısı saplardan fışkıran tüy gibi yapraklarıyla odaya tatil havası katar. Havayı nemlendirmesiyle bilinir.",
    bakim: ["Toprağın üstü kuruyunca sulayın; saksı altında su bırakmayın.", "Parlak ama filtreli ışık ister, öğle güneşi yaprakları soldurur.", "Kahverengi yaprak uçlarını kesmek yerine nemi artırın.", "Yazda haftada bir duş vermek örümcek akarını uzak tutar."],
    ilginc: "Yetişkin bir areka günde yaklaşık 1 litre suyu havaya buhar olarak geri verir.",
    cogaltma: "Kök ayırma"
  },
  {
    id: "boston-egreltisi", ad: "Boston Eğreltisi", latince: "Nephrolepis exaltata", aile: "Nephrolepidaceae", koken: "Tropik Amerika",
    kategori: "ic-mekan", etiketler: ["eğrelti", "nem sever", "evcil dostu"],
    isik: 1, su: 3, nem: 3, sicaklik: "16–24 °C", zorluk: "orta", toksik: false, boy: "40–90 cm",
    form: "fern", yaprak: "#4f9a4c", yaprak2: "#8ccf6f", cicek: null,
    aciklama: "Kıvrımlı, dantel gibi yapraklarıyla Viktorya döneminden bu yana ev bitkisi. Kuru hava ve unutkan sulama en büyük düşmanı.",
    bakim: ["Toprak hiç kurumamalı; ama su da birikmemeli.", "Yüksek nem gerekir: sık spreyleme veya banyo ortamı.", "Doğrudan güneş yaprakları kavurur, gölge ideal.", "Kuruyan yaprakları dipten temizleyin."],
    ilginc: "Eğreltiler tohum yerine spor üretir; yaprak altındaki kahverengi noktalar hastalık değil spor keseleridir.",
    cogaltma: "Kök ayırma veya sürgünler"
  },
  {
    id: "aloe-vera", ad: "Aloe Vera", latince: "Aloe vera", aile: "Asphodelaceae", koken: "Arap Yarımadası",
    kategori: "sukulent", etiketler: ["sukulent", "şifalı", "az su"],
    isik: 3, su: 1, nem: 1, sicaklik: "13–27 °C", zorluk: "kolay", toksik: true, boy: "30–60 cm",
    form: "rosette", yaprak: "#7fb069", yaprak2: "#bfd8a0", cicek: null,
    aciklama: "Etli yapraklarındaki jel yanık ve tahrişte ilk yardımın klasiği. Güneşli mutfak penceresinde neredeyse kendi kendine yaşar.",
    bakim: ["Sulamalar arasında toprağın tamamen kurumasını bekleyin (yazın 2–3 hafta).", "Kaktüs toprağı ve delikli saksı şart.", "Bol güneş ister; ışıksızlıkta yapraklar uzayıp incelir.", "Kışın neredeyse hiç sulamayın."],
    ilginc: "Eski Mısır'da 'ölümsüzlük bitkisi' olarak anılır, Kleopatra'nın cilt bakımında kullandığı söylenir.",
    cogaltma: "Yavru bitkiler (dip sürgünleri)"
  },
  {
    id: "altin-fici", ad: "Altın Fıçı Kaktüsü", latince: "Echinocactus grusonii", aile: "Cactaceae", koken: "Orta Meksika",
    kategori: "kaktus", etiketler: ["kaktüs", "az su", "güneş sever"],
    isik: 3, su: 1, nem: 1, sicaklik: "10–35 °C", zorluk: "kolay", toksik: false, boy: "20–90 cm",
    form: "cactus", yaprak: "#5f9d5e", yaprak2: "#e5c85a", cicek: "#f2d34d",
    aciklama: "Altın sarısı dikenlerle kaplı, kusursuz küre biçimli bir kaktüs. 'Kayınvalide koltuğu' lakabını dikenlerine borçludur.",
    bakim: ["Yazın ayda 1–2, kışın hiç sulamayın.", "Mümkün olan en güneşli yeri verin.", "Kışın serin (10–15 °C) ve kuru tutmak çiçeklenmeyi tetikler.", "Mineral ağırlıklı, hızlı süzen karışım kullanın."],
    ilginc: "Doğal ortamında neredeyse tükenmiş durumdadır, ancak dünyanın en çok yetiştirilen kaktüslerinden biridir.",
    cogaltma: "Tohum"
  },
  {
    id: "echeveria", ad: "Taş Gülü", latince: "Echeveria elegans", aile: "Crassulaceae", koken: "Meksika",
    kategori: "sukulent", etiketler: ["sukulent", "rozet", "evcil dostu"],
    isik: 3, su: 1, nem: 1, sicaklik: "10–27 °C", zorluk: "kolay", toksik: false, boy: "8–15 cm",
    form: "rosette", yaprak: "#a9c4c9", yaprak2: "#e2a0b1", cicek: "#f08a8a",
    aciklama: "Gül gibi açılan mavimsi-gri, etli yaprak rozeti. Işık ve stres altında yaprak uçları pembeye döner; en güzel hali budur.",
    bakim: ["'Kurut ve iyice sula' yöntemini uygulayın.", "Az ışıkta rozet açılır ve uzar (etiolasyon).", "Yaprakların arasında su bırakmayın; çürütür.", "Kışın sulamayı ayda bire düşürün."],
    ilginc: "Düşen tek bir yaprak toprağa konduğunda kendi başına yeni bir bitkiye dönüşür.",
    cogaltma: "Yaprak çeliği, yavru rozetler"
  },
  {
    id: "yilbasi-kaktusu", ad: "Yılbaşı Kaktüsü", latince: "Schlumbergera × buckleyi", aile: "Cactaceae", koken: "Brezilya",
    kategori: "cicekli", etiketler: ["çiçekli", "kaktüs", "evcil dostu"],
    isik: 2, su: 2, nem: 2, sicaklik: "15–24 °C", zorluk: "kolay", toksik: false, boy: "30–60 cm",
    form: "trailing", yaprak: "#4c9a5c", yaprak2: "#3a7a47", cicek: "#e8467c",
    aciklama: "Dikensiz, zincir gibi sarkan segmentlerinin ucunda kışın fuşya çiçekler açar. Çöl kaktüsü değildir; yağmur ormanı epifitidir.",
    bakim: ["Diğer kaktüslerden daha sık, toprak kuruyunca sulayın.", "Çiçek için sonbaharda 6 hafta uzun geceler ve serinlik gerekir.", "Tomurcuk döneminde yerini değiştirmeyin.", "Doğrudan güneş segmentleri kızartır."],
    ilginc: "Aynı bitki onlarca yıl yaşar; aileden aileye miras kalan 80 yaşında örnekler vardır.",
    cogaltma: "Segment çeliği"
  },
  {
    id: "orkide", ad: "Orkide", latince: "Phalaenopsis spp.", aile: "Orchidaceae", koken: "Güneydoğu Asya",
    kategori: "cicekli", etiketler: ["çiçekli", "hediyelik", "evcil dostu"],
    isik: 2, su: 2, nem: 2, sicaklik: "18–28 °C", zorluk: "orta", toksik: false, boy: "30–70 cm",
    form: "orchid", yaprak: "#3c7f46", yaprak2: "#2d6236", cicek: "#e9a3c9",
    aciklama: "Kelebek kanadını andıran çiçekleri aylarca açık kalır. Toprakta değil, ağaç kabuğunda yaşar; gümüşi kökleri ışık ister.",
    bakim: ["Haftada bir kökleri 10 dakika suya daldırıp iyice süzdürün.", "Kökler gümüş rengine dönünce sulama zamanı, yeşilken bekleyin.", "Çiçekler dökülünce sapı 2. boğumdan kesin; yeniden açabilir.", "Şeffaf saksı köklerin fotosentezine yardım eder."],
    ilginc: "Orkide tohumları toz kadar küçüktür ve çimlenmek için özel bir mantarla ortak yaşama ihtiyaç duyar.",
    cogaltma: "Keiki (çiçek sapında oluşan yavru)"
  },
  {
    id: "afrika-menekse", ad: "Afrika Menekşesi", latince: "Streptocarpus sect. Saintpaulia", aile: "Gesneriaceae", koken: "Tanzanya, Kenya",
    kategori: "cicekli", etiketler: ["çiçekli", "kompakt", "evcil dostu"],
    isik: 2, su: 2, nem: 2, sicaklik: "18–24 °C", zorluk: "orta", toksik: false, boy: "10–20 cm",
    form: "flower", yaprak: "#3f7f4c", yaprak2: "#2c5e37", cicek: "#7b4fc4",
    aciklama: "Kadife yapraklar arasında yıl boyu açan mor, pembe ya da beyaz çiçekler. Pencere pervazının minyatür yıldızı.",
    bakim: ["Yapraklara su değmesin; alttan, saksı tabağından sulayın.", "Oda sıcaklığında su kullanın; soğuk su yaprakta leke bırakır.", "Doğu penceresi gibi yumuşak sabah ışığı idealdir.", "Solan çiçek ve alt yaprakları düzenli koparın."],
    ilginc: "Tek bir yaprak sapı nemli toprağa dikilince birkaç ayda yeni bir bitki oluşturur.",
    cogaltma: "Yaprak çeliği"
  },
  {
    id: "sardunya", ad: "Sardunya", latince: "Pelargonium × hortorum", aile: "Geraniaceae", koken: "Güney Afrika",
    kategori: "cicekli", etiketler: ["çiçekli", "balkon", "güneş sever"],
    isik: 3, su: 2, nem: 1, sicaklik: "15–28 °C", zorluk: "kolay", toksik: true, boy: "30–60 cm",
    form: "flower", yaprak: "#4e9a4a", yaprak2: "#7a3d2e", cicek: "#e2413e",
    aciklama: "Akdeniz balkonlarının kırmızı imzası. Güneşi ne kadar çok görürse o kadar çok çiçek açar; kokulu çeşitleri sivrisineği uzak tutar.",
    bakim: ["Toprak kuruyunca bolca sulayın; sürekli ıslak toprak sevmez.", "Günde en az 5–6 saat güneş ister.", "Solan çiçekleri sapıyla birlikte koparın.", "Kışın serin ve az sulu tutun, ilkbaharda budayın."],
    ilginc: "Sardunya sandığımız bitki aslında Pelargonium'dur; gerçek Geranium ayrı bir cinstir.",
    cogaltma: "Gövde çeliği"
  },
  {
    id: "lavanta", ad: "Lavanta", latince: "Lavandula angustifolia", aile: "Lamiaceae", koken: "Akdeniz",
    kategori: "aromatik", etiketler: ["aromatik", "güneş sever", "arı dostu"],
    isik: 3, su: 1, nem: 1, sicaklik: "10–30 °C", zorluk: "orta", toksik: false, boy: "40–80 cm",
    form: "flower", yaprak: "#8fa38a", yaprak2: "#6f8a6b", cicek: "#8b6fc9",
    aciklama: "Gümüşi yaprakları ve mor başaklarıyla kokusu kadar görüntüsü de dinlendirici. Fakir, kuru ve kireçli toprakta en mutlu halini bulur.",
    bakim: ["Az sulayın; kök çürüğü en yaygın ölüm nedenidir.", "Tam güneş ve hava akımı ister.", "Çiçek sonrası üçte bir oranında budayın, odunsu kısma inmeyin.", "Gübre neredeyse hiç gerekmez."],
    ilginc: "Adı Latince 'lavare' (yıkamak) fiilinden gelir; Romalılar hamam suyuna katardı.",
    cogaltma: "Yarı odunsu çelik"
  },
  {
    id: "feslegen", ad: "Fesleğen", latince: "Ocimum basilicum", aile: "Lamiaceae", koken: "Tropik Asya",
    kategori: "aromatik", etiketler: ["mutfak", "aromatik", "yıllık"],
    isik: 3, su: 3, nem: 2, sicaklik: "18–30 °C", zorluk: "kolay", toksik: false, boy: "30–60 cm",
    form: "upright", yaprak: "#5cb85c", yaprak2: "#3f9142", cicek: null,
    aciklama: "Mutfak penceresinin en hoş kokulu sakini. Ne kadar çok koparırsanız o kadar sık dallanır; çiçeğe gitmesine izin vermeyin.",
    bakim: ["Toprağı nemli tutun, sabah sulayın.", "Günde 6+ saat güneş ister.", "Tepe sürgünlerini iki yaprak çiftinin üstünden koparın.", "Soğuğa çok hassastır; 10 °C altında kararır."],
    ilginc: "Yunanca 'basilikon' (kralî) sözcüğünden gelir; Hindistan'da kutsal fesleğen (tulsi) tapınaklarda yetiştirilir.",
    cogaltma: "Tohum veya suda çelik"
  },
  {
    id: "nane", ad: "Nane", latince: "Mentha spicata", aile: "Lamiaceae", koken: "Avrupa, Asya",
    kategori: "aromatik", etiketler: ["mutfak", "aromatik", "hızlı büyür"],
    isik: 2, su: 3, nem: 2, sicaklik: "13–27 °C", zorluk: "kolay", toksik: false, boy: "30–60 cm",
    form: "upright", yaprak: "#48a04d", yaprak2: "#2e7a34", cicek: null,
    aciklama: "Kök sürgünleriyle bahçeyi işgal edecek kadar güçlü. Bu yüzden her zaman saksıda yetiştirin; çay ve salata için sınırsız kaynak.",
    bakim: ["Toprağı sürekli nemli tutun.", "Yarı gölgede de mutlu olur.", "Sık hasat sık dallanma demektir.", "Her 2 yılda bir kökleri ayırıp yenileyin."],
    ilginc: "Nane uçucu yağındaki mentol, cilt reseptörlerini 'soğuk' hissedecek şekilde kandırır.",
    cogaltma: "Kök sürgünü veya çelik"
  },
  {
    id: "biberiye", ad: "Biberiye", latince: "Salvia rosmarinus", aile: "Lamiaceae", koken: "Akdeniz",
    kategori: "aromatik", etiketler: ["mutfak", "aromatik", "güneş sever"],
    isik: 3, su: 1, nem: 1, sicaklik: "10–30 °C", zorluk: "orta", toksik: false, boy: "50–150 cm",
    form: "upright", yaprak: "#5f8f6e", yaprak2: "#9cc4a5", cicek: "#9fb8e6",
    aciklama: "İğne yapraklı, çam kokulu bir Akdeniz çalısı. Kuraklığa dayanır ama saksıda susuz bırakılınca geri dönüşü zordur.",
    bakim: ["Toprağın üstü kuruyunca sulayın; asla ıslak bırakmayın.", "Tam güneş ve iyi hava sirkülasyonu şart.", "Sık uç alma sıkı ve çalı formunu korur.", "Kışın iç mekânda en parlak pencereye yerleştirin."],
    ilginc: "Adı 'ros marinus', yani 'denizin çiyi' anlamına gelir; Akdeniz kıyı kayalıklarında doğal yetişir.",
    cogaltma: "Yarı odunsu çelik"
  },
  {
    id: "kekik", ad: "Kekik", latince: "Thymus vulgaris", aile: "Lamiaceae", koken: "Batı Akdeniz",
    kategori: "aromatik", etiketler: ["mutfak", "aromatik", "arı dostu"],
    isik: 3, su: 1, nem: 1, sicaklik: "10–30 °C", zorluk: "kolay", toksik: false, boy: "15–30 cm",
    form: "upright", yaprak: "#7fa07a", yaprak2: "#b7c9a9", cicek: "#d8a7c9",
    aciklama: "Minik yapraklı, yer yer sürünen bir çalı. Fakir toprak ve bol güneşte kokusu yoğunlaşır; balkon kenarlarından sarkarak büyür.",
    bakim: ["Az sulayın; toprağı kuru tutmayı sever.", "Tam güneş ister.", "Çiçeklenmeden önce hasat etmek en aromatik zamandır.", "Bahar başında hafif budayın."],
    ilginc: "Antik Yunan'da cesaretin simgesiydi; askerler savaştan önce kekikli banyo yapardı.",
    cogaltma: "Çelik veya kök ayırma"
  },
  {
    id: "zeytin", ad: "Zeytin", latince: "Olea europaea", aile: "Oleaceae", koken: "Akdeniz Havzası",
    kategori: "agac", etiketler: ["ağaç", "güneş sever", "uzun ömürlü"],
    isik: 3, su: 1, nem: 1, sicaklik: "5–35 °C", zorluk: "orta", toksik: false, boy: "2–10 m (saksıda 1–2 m)",
    form: "tree", yaprak: "#7f9a7a", yaprak2: "#c4cfb3", cicek: null,
    aciklama: "Gümüşi yaprakları ve kıvrımlı gövdesiyle bin yıl yaşayabilen Akdeniz simgesi. Saksıda güneşli balkonda mutlu, ısıtmalı odada mutsuzdur.",
    bakim: ["Toprak kuruyunca derin sulayın; sürekli nem kök çürütür.", "Mümkün olan en güneşli konum.", "Kışın serin (5–10 °C), aydınlık ve az sulu bekletin.", "Şubat sonunda şekil budaması yapın."],
    ilginc: "Girit'teki bir zeytin ağacının 3.000 yaşın üzerinde olduğu tahmin ediliyor ve hâlâ meyve veriyor.",
    cogaltma: "Yarı odunsu çelik veya aşı"
  },
  {
    id: "limon", ad: "Limon", latince: "Citrus × limon", aile: "Rutaceae", koken: "Güney Asya",
    kategori: "agac", etiketler: ["ağaç", "meyveli", "güneş sever"],
    isik: 3, su: 2, nem: 2, sicaklik: "12–30 °C", zorluk: "orta", toksik: true, boy: "1–3 m",
    form: "tree", yaprak: "#3e8f45", yaprak2: "#f2d84a", cicek: "#fff6e0",
    aciklama: "Beyaz çiçeklerinin kokusu ve dalında sararan meyveleriyle balkonun en tatmin edici ağacı. Kışın soğuk ama donmayan bir yer ister.",
    bakim: ["Toprak üstü kuruyunca bol sulayın; tabakta su bırakmayın.", "Günde 8 saat güneş verimi belirler.", "Bahar–yaz aylarında narenciye gübresi kullanın.", "Kışın 8–12 °C'de, aydınlık ve nemli bir yerde tutun."],
    ilginc: "Aynı ağaçta aynı anda çiçek, ham ve olgun meyve bulunabilir.",
    cogaltma: "Aşı veya çelik"
  },
  {
    id: "gul", ad: "Gül", latince: "Rosa spp.", aile: "Rosaceae", koken: "Asya",
    kategori: "cicekli", etiketler: ["çiçekli", "bahçe", "kokulu"],
    isik: 3, su: 2, nem: 2, sicaklik: "10–28 °C", zorluk: "orta", toksik: false, boy: "40–200 cm",
    form: "flower", yaprak: "#3f8047", yaprak2: "#2d5f34", cicek: "#d9345a",
    aciklama: "Çiçeklerin kraliçesi. Bol güneş, derin sulama ve cesur budama ister; karşılığında haziranı kokuya boğar.",
    bakim: ["Dipten, yapraklara su sıçratmadan derin sulayın.", "Günde 6+ saat güneş şart.", "Kış sonunda sert budama sağlıklı sürgün verir.", "Küllenme için hava sirkülasyonunu artırın."],
    ilginc: "Isparta gülü (Rosa damascena) yağı, dünya parfüm endüstrisinin en değerli hammaddelerinden biridir.",
    cogaltma: "Çelik veya aşı"
  },
  {
    id: "lale", ad: "Lale", latince: "Tulipa gesneriana", aile: "Liliaceae", koken: "Orta Asya, Anadolu",
    kategori: "cicekli", etiketler: ["soğanlı", "ilkbahar", "bahçe"],
    isik: 3, su: 2, nem: 1, sicaklik: "5–20 °C", zorluk: "kolay", toksik: true, boy: "20–60 cm",
    form: "bulb", yaprak: "#5f9e62", yaprak2: "#3e7a42", cicek: "#e0413f",
    aciklama: "Sonbaharda dikilen soğan, kış soğuğunu geçirip nisanda kadeh gibi açar. Osmanlı'dan Hollanda'ya uzanan bir tutkunun bitkisi.",
    bakim: ["Soğanları ekimde 15 cm derine, sivri uç yukarı gelecek şekilde dikin.", "Çiçeklenme döneminde düzenli sulayın.", "Çiçek solunca sapı kesin, yaprakları sararana kadar bırakın.", "Soğanı yazın kuru ve serin bir yerde saklayın."],
    ilginc: "1637'de Hollanda'da tek bir 'Semper Augustus' soğanı bir Amsterdam evinden pahalıya satıldı: Lale Çılgınlığı.",
    cogaltma: "Yavru soğan"
  },
  {
    id: "sumbul", ad: "Sümbül", latince: "Hyacinthus orientalis", aile: "Asparagaceae", koken: "Anadolu, Doğu Akdeniz",
    kategori: "cicekli", etiketler: ["soğanlı", "kokulu", "ilkbahar"],
    isik: 3, su: 2, nem: 1, sicaklik: "5–20 °C", zorluk: "kolay", toksik: true, boy: "20–30 cm",
    form: "bulb", yaprak: "#4f9a52", yaprak2: "#357a3a", cicek: "#5b6ecf",
    aciklama: "Yoğun kokulu, sık dizilmiş çan biçimli çiçekler tek bir başak üstünde açar. İç mekânda su kabında bile çiçeklendirilebilir.",
    bakim: ["Soğanı sonbaharda dikin; kışın 10 hafta soğuk gerekir.", "Çiçek döneminde serin tutmak ömrünü uzatır.", "Soğana dokunurken eldiven kullanın; kaşındırabilir.", "Yapraklar tamamen sararmadan kesmeyin."],
    ilginc: "Yunan mitolojisinde Apollon'un sevgilisi Hyakinthos'un kanından doğduğuna inanılır.",
    cogaltma: "Yavru soğan"
  },
  {
    id: "ortanca", ad: "Ortanca", latince: "Hydrangea macrophylla", aile: "Hydrangeaceae", koken: "Japonya",
    kategori: "cicekli", etiketler: ["çiçekli", "gölge sever", "bahçe"],
    isik: 2, su: 3, nem: 2, sicaklik: "10–25 °C", zorluk: "orta", toksik: true, boy: "1–2 m",
    form: "flower", yaprak: "#3f8f4c", yaprak2: "#2b6a36", cicek: "#7ea3e0",
    aciklama: "Top gibi çiçek kümelerinin rengi toprağın asitliğine göre maviden pembeye değişir. Adındaki 'hydra' su ihtiyacını özetler.",
    bakim: ["Bol ve düzenli sulayın; sıcakta sabah-akşam.", "Sabah güneşi, öğleden sonra gölge.", "Asidik toprak mavi, alkali toprak pembe çiçek verir.", "Geçen yılın dallarından çiçek açar; sert budamayın."],
    ilginc: "Toprağa alüminyum sülfat eklemek çiçekleri maviye, kireç eklemek pembeye çevirir.",
    cogaltma: "Yumuşak çelik",
    mevsim: { kis: "Çıplak sürgünler ve kurumuş çiçek başları", ilkbahar: "Yeşil tomurcuklar, iri dişli yapraklar", yaz: "Haziran–ağustos: mavi top çiçekler", sonbahar: "Solgun pembe-yeşile dönen başlar, sararan yapraklar" }
  },
  {
    id: "begonvil", ad: "Begonvil", latince: "Bougainvillea glabra", aile: "Nyctaginaceae", koken: "Brezilya",
    kategori: "cicekli", etiketler: ["tırmanıcı", "güneş sever", "Akdeniz"],
    isik: 3, su: 1, nem: 1, sicaklik: "10–35 °C", zorluk: "orta", toksik: false, boy: "2–8 m",
    form: "trailing", yaprak: "#4a9a4f", yaprak2: "#357a3a", cicek: "#e0338f",
    aciklama: "Ege'nin beyaz duvarlarını fuşyaya boyayan tırmanıcı. Renkli kısımlar çiçek değil, minik beyaz çiçeği saran brakte yapraklardır.",
    bakim: ["Az sulayın; hafif stres daha çok çiçek demektir.", "Tam güneş olmadan çiçek açmaz.", "Çiçek sonrası kuvvetli budama yapabilirsiniz.", "Don görmeyen yerde dışarıda, aksi hâlde kışın içeri alın."],
    ilginc: "Adını 1768'de dünya turu yapan Fransız amiral Louis Antoine de Bougainville'den alır.",
    cogaltma: "Yarı odunsu çelik"
  },
  {
    id: "yasemin", ad: "Yasemin", latince: "Jasminum officinale", aile: "Oleaceae", koken: "Kafkasya, Himalayalar",
    kategori: "cicekli", etiketler: ["tırmanıcı", "kokulu", "evcil dostu"],
    isik: 3, su: 2, nem: 2, sicaklik: "10–28 °C", zorluk: "orta", toksik: false, boy: "2–5 m",
    form: "trailing", yaprak: "#3f8a4a", yaprak2: "#2b6634", cicek: "#fffaf0",
    aciklama: "Yaz akşamlarını kokusuyla dolduran beyaz yıldız çiçekler. Bir kafes ya da ip verildiğinde hızla tırmanır.",
    bakim: ["Büyüme döneminde düzenli sulayın, kışın azaltın.", "Tam güneş veya hafif gölge.", "Çiçek sonrası uzayan sürgünleri kısaltın.", "Destek verin; sarılacak bir şey ister."],
    ilginc: "Yasemin çiçekleri kokusunu geceleri en yoğun yayar; bu yüzden gece toplanır.",
    cogaltma: "Yarı odunsu çelik"
  },
  {
    id: "seflera", ad: "Şeflera", latince: "Schefflera arboricola", aile: "Araliaceae", koken: "Tayvan",
    kategori: "ic-mekan", etiketler: ["dayanıklı", "ofis bitkisi", "ağaç formu"],
    isik: 2, su: 2, nem: 2, sicaklik: "16–26 °C", zorluk: "kolay", toksik: true, boy: "1–2,5 m",
    form: "tree", yaprak: "#3f8f49", yaprak2: "#d4c65a", cicek: null,
    aciklama: "Şemsiye gibi açılan parmak yapraklarıyla 'şemsiye ağacı'. Alacalı çeşitleri parlak ışıkta sarı-yeşil dalgalanır.",
    bakim: ["Toprak üstü kuruyunca sulayın; fazlası yaprak döktürür.", "Parlak dolaylı ışıkta sık ve kompakt büyür.", "Bahar başında tepe budaması dallanmayı artırır.", "Örümcek akarına karşı yaprak altlarını kontrol edin."],
    ilginc: "Doğal ortamında başka ağaçların üstünde epifit olarak da büyüyebilir.",
    cogaltma: "Gövde çeliği"
  },
  {
    id: "difenbahya", ad: "Difenbahya", latince: "Dieffenbachia seguine", aile: "Araceae", koken: "Karayipler, Güney Amerika",
    kategori: "ic-mekan", etiketler: ["desenli yapraklı", "büyük yapraklı"],
    isik: 2, su: 2, nem: 2, sicaklik: "18–27 °C", zorluk: "kolay", toksik: true, boy: "60–150 cm",
    form: "upright", yaprak: "#4a9a52", yaprak2: "#e6efc2", cicek: null,
    aciklama: "Krem beneklerle boyanmış iri yapraklar. Hızlı büyür ve loşluğa dayanır, ancak özsuyu güçlü tahriş edicidir; çocuk ve evcil hayvanlardan uzak tutun.",
    bakim: ["Toprağın üst 2–3 cm'si kuruyunca sulayın.", "Doğrudan güneş yaprakları soldurur.", "Budarken eldiven takın; özsu cildi yakar.", "Alt yapraklar döküldükçe tepeyi kesip yeniden köklendirin."],
    ilginc: "'Dilsiz kamış' lakabı, özsuyunun ağızda geçici konuşma güçlüğü yaratmasından gelir.",
    cogaltma: "Gövde çeliği"
  },
  {
    id: "antoryum", ad: "Antoryum", latince: "Anthurium andraeanum", aile: "Araceae", koken: "Kolombiya, Ekvador",
    kategori: "cicekli", etiketler: ["çiçekli", "tropik", "uzun ömürlü çiçek"],
    isik: 2, su: 2, nem: 3, sicaklik: "18–28 °C", zorluk: "orta", toksik: true, boy: "40–60 cm",
    form: "flower", yaprak: "#2f6f3b", yaprak2: "#1f4f2a", cicek: "#d83a3a",
    aciklama: "Cilalı, kalp şeklinde kırmızı 'çiçeği' aslında bir yapraktır; gerçek çiçekler ortadaki sarı koçanda dizilidir. Aylarca solmaz.",
    bakim: ["Toprak hafif nemli kalsın; kabuk ağırlıklı, havadar karışım kullanın.", "Parlak dolaylı ışık; doğrudan güneş spata rengini soldurur.", "Yüksek nem ister; sprey ve nemlendiriciden hoşlanır.", "İki ayda bir seyreltilmiş gübre."],
    ilginc: "Kolombiya'da sevgi ve konukseverliğin simgesidir; kesme çiçek olarak 6 hafta taze kalır.",
    cogaltma: "Kök ayırma"
  },
  {
    id: "yukka", ad: "Yukka", latince: "Yucca gigantea", aile: "Asparagaceae", koken: "Orta Amerika",
    kategori: "ic-mekan", etiketler: ["dayanıklı", "güneş sever", "az su"],
    isik: 3, su: 1, nem: 1, sicaklik: "10–30 °C", zorluk: "kolay", toksik: true, boy: "1–3 m",
    form: "palm", yaprak: "#4f8f4f", yaprak2: "#3a6f3a", cicek: null,
    aciklama: "Kalın odunsu gövdeden fışkıran sert, kılıç yapraklar. Güneşli salonların en tembel bakımlı 'ağacı'.",
    bakim: ["Sulamalar arasında toprağın kurumasını bekleyin.", "Bol güneş; yaz aylarında balkona çıkarabilirsiniz.", "Kışın sulamayı ayda bire düşürün.", "Yaprak uçları sivridir; geçiş yollarına koymayın."],
    ilginc: "Yucca cinsinin doğadaki tozlaşması yalnızca 'yucca güvesi' adlı tek bir böcek türüne bağlıdır.",
    cogaltma: "Gövde parçası"
  },
  {
    id: "peperomya", ad: "Peperomya", latince: "Peperomia obtusifolia", aile: "Piperaceae", koken: "Karayipler, Florida",
    kategori: "ic-mekan", etiketler: ["kompakt", "evcil dostu", "masa bitkisi"],
    isik: 2, su: 1, nem: 2, sicaklik: "18–26 °C", zorluk: "kolay", toksik: false, boy: "20–30 cm",
    form: "upright", yaprak: "#3f8f4c", yaprak2: "#c9d66b", cicek: null,
    aciklama: "Kalın, kaşık gibi parlak yaprakları su depolar; masa ya da raf için ideal, evcil hayvan dostu bir minyatür.",
    bakim: ["Toprak iyice kuruyunca sulayın; yarı sukulent gibi davranın.", "Parlak dolaylı ışık; floresan altında da olur.", "Küçük saksıda kalmayı sever.", "Kışın gübre vermeyin."],
    ilginc: "Karabiberle aynı familyadandır; 1.500'den fazla türü vardır.",
    cogaltma: "Yaprak veya gövde çeliği"
  },
  {
    id: "ejder-agaci", ad: "Ejder Ağacı", latince: "Dracaena marginata", aile: "Asparagaceae", koken: "Madagaskar",
    kategori: "ic-mekan", etiketler: ["dayanıklı", "ağaç formu", "hava temizleyici"],
    isik: 2, su: 1, nem: 1, sicaklik: "16–27 °C", zorluk: "kolay", toksik: true, boy: "1–2,5 m",
    form: "palm", yaprak: "#3f8a47", yaprak2: "#b8354e", cicek: null,
    aciklama: "İnce gövdelerin ucunda kırmızı kenarlı ince yaprak demetleri. Yavaş ama emin büyür, ihmali affeder.",
    bakim: ["Toprağın üst yarısı kuruyunca sulayın.", "Florürlü suya duyarlıdır; yaprak uçları kahverengileşirse arıtılmış su deneyin.", "Orta-parlak ışık; doğrudan güneşten kaçının.", "Gövdeyi keserek dallanmasını sağlayabilirsiniz."],
    ilginc: "Akrabası Dracaena draco'nun kırmızı reçinesi 'ejder kanı' adıyla eski çağlarda boya ve ilaç olarak kullanıldı.",
    cogaltma: "Gövde çeliği"
  },
  {
    id: "inci-dizisi", ad: "İnci Dizisi", latince: "Curio rowleyanus", aile: "Asteraceae", koken: "Güneybatı Afrika",
    kategori: "sukulent", etiketler: ["sarkan", "sukulent", "az su"],
    isik: 2, su: 1, nem: 1, sicaklik: "13–26 °C", zorluk: "orta", toksik: true, boy: "60–90 cm (sarkan)",
    form: "trailing", yaprak: "#6fae62", yaprak2: "#4f8f45", cicek: "#f5f0e6",
    aciklama: "Bezelye gibi yuvarlak yaprakların dizildiği ince sürgünler saksıdan aşağı inci gibi sarkar. Her boncuk bir su deposudur.",
    bakim: ["Boncuklar hafif buruşunca sulayın; arada tamamen kurutun.", "Sabah güneşi alan parlak konum.", "Sığ ve delikli saksı kullanın.", "Kışın neredeyse hiç sulamayın."],
    ilginc: "Her boncukta ışığın içeri girmesini sağlayan şeffaf bir 'pencere' çizgisi vardır.",
    cogaltma: "Sürgün çeliği (toprağa yatırarak)"
  },
  {
    id: "kaplan-cicegi", ad: "Kaplan Çiçeği (Yaprak Begonyası)", latince: "Begonia rex", aile: "Begoniaceae", koken: "Kuzeydoğu Hindistan",
    kategori: "ic-mekan", etiketler: ["desenli yapraklı", "nem sever", "renkli"],
    isik: 2, su: 2, nem: 3, sicaklik: "18–24 °C", zorluk: "zor", toksik: true, boy: "20–40 cm",
    form: "rosette", yaprak: "#6b3a6e", yaprak2: "#c4c9d2", cicek: null,
    aciklama: "Gümüş, mor ve bordo spirallerle boyanmış yapraklar; çiçeğe ihtiyacı olmayan bir gösteri bitkisi. Nemi ve sabit sıcaklığı sever.",
    bakim: ["Toprak hafif nemli; yaprakları ıslatmadan sulayın.", "Parlak ama filtreli ışık desenleri canlı tutar.", "Yüksek nem gerekir ama sprey mantar yapar; çakıl tepsisi kullanın.", "Kışın dinlenir, sulamayı azaltın."],
    ilginc: "Tek bir yaprak parçası bile damarlarından yeni bitki üretebilir.",
    cogaltma: "Yaprak parçası çeliği"
  },
  {
    id: "papatya", ad: "Papatya", latince: "Leucanthemum vulgare", aile: "Asteraceae", koken: "Avrupa, Anadolu",
    kategori: "cicekli", etiketler: ["çiçekli", "bahçe", "arı dostu"],
    isik: 3, su: 2, nem: 1, sicaklik: "10–28 °C", zorluk: "kolay", toksik: false, boy: "30–70 cm",
    form: "flower", yaprak: "#4f9a4a", yaprak2: "#3a7a38", cicek: "#fffdf5",
    aciklama: "Beyaz taç, sarı göbek; yaz çayırlarının en tanıdık yüzü. Fakir toprakta bile kendini eker ve her yıl geri gelir.",
    bakim: ["Toprak kuruyunca sulayın; kuraklığa toleranslıdır.", "Tam güneş sever.", "Solan çiçekleri kesmek çiçeklenmeyi uzatır.", "Her 2–3 yılda bir kümeleri bölün."],
    ilginc: "Gördüğünüz 'çiçek' aslında yüzlerce minik çiçekten oluşan bir kümedir (kapitulum).",
    cogaltma: "Tohum veya kök ayırma"
  },
  {
    id: "lale-agaci", ad: "Japon Akçaağacı", latince: "Acer palmatum", aile: "Sapindaceae", koken: "Japonya, Kore",
    kategori: "agac", etiketler: ["ağaç", "sonbahar rengi", "bonsai"],
    isik: 2, su: 2, nem: 2, sicaklik: "-10–28 °C", zorluk: "orta", toksik: false, boy: "2–6 m (saksıda 1–2 m)",
    form: "tree", yaprak: "#c8412f", yaprak2: "#e58a3a", cicek: null,
    aciklama: "El gibi açılan zarif yapraklar sonbaharda alev kırmızısına döner. Yarı gölge ve rüzgârsız bir köşe ister; bonsai olarak da yetiştirilir.",
    bakim: ["Toprağı nemli ama süzek tutun.", "Öğle güneşi ve sıcak rüzgâr yaprak kenarlarını yakar.", "Budamayı kış sonunda, özsu yürümeden yapın.", "Saksıda kışın kökleri dondan koruyun."],
    ilginc: "Japonya'da sonbahar yaprak izleme geleneği 'momijigari' yüzyıllardır sürdürülür.",
    cogaltma: "Aşı veya tohum"
  }
];
