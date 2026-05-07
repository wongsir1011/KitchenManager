import fs from 'fs';

const raw = `
### 1. 蔬菜類 (Vegetables / Sayur-sayuran)

**葉菜 (Leafy Vegetable / Sayuran hijau)**
*   **唐芹** (Chinese celery) - Seledri cina
*   **白菜** (Chinese white cabbage) - Sawi putih
*   **芥菜** (Mustard leaf) - Sawi hijau
*   **西芹** (Celery) - Seledri
*   **西洋菜** (Watercress) - Selada
*   **芥蘭** (Chinese kale) - Kol cina
*   **津菜** (Tientsin cabbage) - Kol Tientsin
*   **枸杞** (Matrimony vine) - Goji berry
*   **羽衣甘藍** (Curly kale) - Kale
*   **娃娃菜** (Mini Tientsin cabbage) - Kol Tientsin mini
*   **豆苗** (Pea shoot) - Tunas kacang
*   **珍珠菜** (White mugwort) - Daun ketumbar
*   **小棠菜** (Green Chinese cabbage) - Kol
*   **油麥菜** (Indian lettuce) - Kol India
*   **皇帝菜** (Emperor vegetable) - Sayuran kaisar
*   **茼蒿** (Garland chrysanthemum) - *(印尼文未獨立標示，與菜心合併或省略)*
*   **菜心** (Flowering Chinese cabbage) - Kol Cina berbunga
*   **椰菜** (Cabbage) - Kol/Kubis
*   **莧菜** (Chinese spinach) - Bayam cina
*   **潺菜** (Indian spinach) - Bayam
*   **椰菜花** (Cauliflower) - Kembang kol
*   **馬莧菜** (Wild amaranth) - Bayam Bali
*   **塔菜** (Chinese flat cabbage) - Sawi pagoda
*   **西蘭花** (Broccoli) - Brokoli
*   **通菜** (Water spinach) - Kangkung
*   **唐生菜** (Chinese lettuce) - Selada cina/Causim
*   **韭菜** (Chinese chive) - lokio cina
*   **菠菜** (Spinach) - Bayam
*   **西生菜** (Iceberg lettuce) - Selada air
*   **韭菜花** (Bud chive) - Kembang bawang

**瓜、豆及其他蔬菜 (Gourd, Legumes and Other Vegetables / Labu, Kacang-kacangan dan Sayur-Mayur Lain)**
*   **冬瓜** (Wax gourd) - Belogo
*   **苦瓜** (Bitter cucumber) - Pare
*   **青毛豆** (Green soybean) - Kacang kedelai hijau
*   **佛手瓜** (Chayote) - Labu siam
*   **矮瓜/茄子** (Eggplant) - Terong ungu
*   **豌豆** (Garden pea) - Kapri
*   **青瓜** (Cucumber) - Ketimun
*   **絲瓜** (Angled luffa) - Oyong
*   **豆角** (Yard-long bean) - Kacang panjang
*   **老黃瓜** (Yellow cucumber) - Timun kuning
*   **節瓜** (Hairy gourd) - Labu berambut
*   **甜豆** (Sweet pea) - Kapri manis
*   **南瓜** (Pumpkin) - Labu
*   **翠玉瓜** (Zucchini) - Ketimun jepang
*   **四季豆** (Snap bean) - Buncis
*   **鮮冬菇** (Fresh Shiitake mushroom) - Jamur shiitake segar
*   **蘑菇** (Button mushroom) - Jamur kancing
*   **青蘿蔔** (Green radish) - Lobak hijau
*   **秀珍菇** (Small oyster mushroom) - Jamur tiram
*   **鮑魚菇** (Abalone mushroom) - Jamur abalone
*   **竹筍** (Bamboo shoot) - Rebung
*   **金菇** (Needle mushroom) - Enoki
*   **雞腿菇** (Shaggy mane) - Jamur rambut kusut
*   **蘆筍** (Asparagus) - Asparagus
*   **草菇** (Straw mushroom) - Jamur merang
*   **蘿蔔** (Radish) - Lobak putih
*   **珍珠筍** (Baby corn) - Jagung muda/Putren
*   **茶樹菇** (Tea tree mushroom) - Shimejo
*   **甘筍** (Carrot) - Wortel
*   **沙葛** (Yam bean) - Biji ubi
*   **粉葛** (Kudzu) - Kudzu
*   **百合** (Lily bulb) - Sayur bakung
*   **薑** (Ginger) - Jahe
*   **牛蒡** (Burdock) - Ketela Jepang
*   **芋頭** (Taro) - Ubi taro/Ubi jepang
*   **蔥** (Spring onion) - Daun bawang
*   **馬鈴薯** (Potato) - Kentang
*   **紅菜頭** (Beetroot) - Gula bit
*   **京蔥** (Green scallion) - Bawang hijau
*   **番薯** (Sweet potato) - Ubi manis
*   **蔥頭** (Shallot bulb) - Bawang merah
*   **洋蔥** (Onion) - Bawang
*   **蓮藕** (Lotus root) - Akar lotus
*   **蒜頭** (Garlic bulb) - Bawang putih kating
*   **指天椒** (Chili pepper) - Cabe rawit
*   **紅尖椒** (Red hot pepper) - Cabe merah
*   **粟米鬚** (Corn silk) - Rambut jagung
*   **馬蹄** (Water chestnuts) - Berangan air
*   **青尖椒** (Green hot pepper) - Cabe hijau
*   **韭黃** (Blanching chive) - Kucai
*   **茅根** (India Perotis) - Perotis
*   **燈籠椒** (Sweet pepper) - Merica manis
*   **芫荽** (Chinese parsley) - Peterseli cina
*   **香茅** (Lemon grass) - Sereh
*   **番茄** (Tomato) - Tomat
*   **栗子** (Chestnut) - Kacang mete
*   **臭草** (Common rue) - Ikan ingu
*   **粟米** (Corn) - Jagung
*   **竹蔗** (Sugar cane) - Tebu
*   **羅勒** (Basil) - Kemangi
*   **荷葉** (Lotus leaf) - Daun lotus
*   **木薯** (Cassava) - Singkong
*   **月桂葉** (Bay leaf) - Daun salam
*   **薄荷葉** (Mint leaf) - Daun mint
*   **番荽** (Parsley) - Peterseli
*   **肉桂** (Cinnamon) - Kayu manis
*   **西蒜** (European leek) - Bawang perai
*   **菱角** (Water caltrop) - Purun tikus
*   **枇杷葉** (Loquat leaf) - Daun biwa
*   **檸葉** (Lemon leaf) - Daun Jeruk
*   **芋絲** (Konjac noodles) - Mi konyaku
*   **龍脷葉** (Dragon's tongue leaf) - Daun lire
*   **蘆薈** (Aloe) - Lidah buaya
*   **香草** (Vanilla) - Vanila
*   **紫蘇葉** (Perilla leaf) - Daun shiso

---

### 2. 肉類 (Meat / Daging)

**豬 (Pig / Babi)**
*   **豬肉** (Pork) - Babi
*   **豬扒** (Pork chop) - Babi potongan
*   **腩排** (Pork loinrib) - Daging iga
*   **免治豬肉** (Minced pork) - Daging babi cincang
*   **豬柳** (Pork tenderloin) - Tenderloin
*   **排骨** (Pork sparerib) - Tulang iga
*   **豬膁** (Pork shin) - Betis babi
*   **豬腩肉** (Pork belly) - Perut babi
*   **豬踭** (Pork shoulder) - Punggung babi
*   **梅頭** (Pork collar butt) - Belungkang babi
*   **豬頸肉** (Pork cheek) - Pipi babi
*   **豬骨** (Pork bone) - Tulang babi
*   **瘦肉** (Lean pork) - Daging babi tipis
*   **豬肋骨** (Pork rib) - Iga babi
*   **豬手** (Pig hock) - Kaki babi bagian atas
*   **豬腳** (Pig feet) - Kaki babi
*   **豬軟骨** (Pork cartilage) - Tulang rawan babi
*   **豬腰** (Pig kidney) - Pig kidney
*   **豬舌** (Pig tongue) - Lidah babi
*   **豬腦** (Pig brain) - Pig brain
*   **豬肚** (Pig stomach) - Pig stomach
*   **豬耳** (Pig ear) - Kuping babi
*   **豬心** (Pig heart) - Jantung babi
*   **豬小腸** (Pig small intestine) - usus babi
*   **豬尾** (Pig tail) - Ekor babi
*   **豬肺** (Pig lung) - Pig lung
*   **豬大腸** (Pig large intestine) - Usus besar babi
*   **豬橫脷** (Pig spleen) - Pig spleen
*   **豬肝** (Pig liver) - Pig liver (Atau: Hati babi)
*   **豬血** (Pig blood) - Darah babi

**牛及羊 (Cattle and Sheep / Sapi dan Domba)**
*   **牛肉** (Beef) - Daging sapi
*   **牛尾** (Ox tail) - Buntut sapi
*   **肥牛肉** (Marble beef) - Daging sapi marmer
*   **牛扒** (Beef steak) - Steak sapi
*   **牛骨** (Beef bone) - Tulang sapi
*   **羊肉** (Mutton) - Domba
*   **牛膁** (Beef shin) - Sengkel sapi
*   **牛骨髓** (Beef bone marrow) - Tulang sumsum sapi
*   **羊腩** (Mutton flank) - Pinggul kambing
*   **牛腩** (Beef flank) - Pinggul sapi
*   **牛筋** (Beef tendon) - Daging paha atas
*   **羊扒** (Mutton rack) - Iga domba
*   **牛仔骨** (Veal rib) - Tulang iga muda
*   **牛肚** (Ox tripe) - Babat sapi
*   **山羊肉** (Goat meat) - Daging kambing

---

### 3. 水產類 (Aquatic Products / Produk air Ikan / Produk Laut Lainnya)

**魚 (Fish / Ikan)**
*   **九肚魚** (Bombay duck) - Bebek bombai
*   **牛鰍** (Flathead) - Ikan kepala datar
*   **白飯魚** (Noodlefish) - Ikan mie teri
*   **狗棍** (Lizard fish) - Ikan kadal
*   **鱸魚** (Seabass) - Kakap Putih
*   **白鱔** (Japanese eel) - Belut Jepang
*   **大頭魚** (Bighead carp) - Ikan mola
*   **左口** (Flounder) - Ikan gelepar
*   **白鱲** (White seabream) - Bream laut
*   **木棉/大眼雞** (Bigeye) - Ikan mata besar
*   **瓜衫** (Japanese golden thread) - Japanese golden thread
*   **石九公** (Rockfish) - Kerapu merah
*   **牙帶** (Hairtail) - Ikan ekor rambut
*   **生魚** (Snakehead) - Snakehead
*   **石蚌** (Star snapper) - Snapper bintang
*   **老虎斑** (Brown-marbled grouper) - Ikan grouper coklat
*   **泥鯭** (Rabbit fish) - Rabbitfish
*   **紅衫** (Golden thread) - Golden thread
*   **杉斑** (Camouflage grouper) - Grouper kamuflase
*   **盲鰽** (Barramundi) - Barramundi
*   **紅鮪** (Mangrove red snapper) - Ikan kakap
*   **沙鯭** (Filefish) - Ikan kikir
*   **芝麻斑** (Brown-spotted grouper) - Brown-spotted grouper
*   **紅鱲** (Two-spot red snapper) - Two-spot red snapper
*   **東星斑** (Leopard coralgrouper) - Ikan kerapu merah
*   **青衣** (Blackspot tuskfish) - Ikan napoleon
*   **桂花魚** (Mandarin fish) - Ikan Mandarin
*   **沙巴躉** (Hybrid grouper) - Kerapu hibrid
*   **青斑** (Orange-spotted grouper) - Ikan kerapu tutul
*   **烏頭** (Grey mullet) - Grey mullet
*   **馬頭** (Horsehead) - Ikan bandeng
*   **黃花魚** (Yellow croaker) - Yellow croaker
*   **鮫魚** (Mackerel) - Ikan Makarel
*   **鯭鱲** (Rudder fish) - Rudderfish
*   **黃腳鱲** (Yellowfin seabream) - Sparidae sirip kuning
*   **鯉魚** (Common carp) - Ikan karp biasa
*   **細鱗** (Sweetlip) - Sweetlip
*   **黃鱲鯧** (Pompano) - Pompano
*   **鯽魚** (Crucian carp) - Ikan karp krusia
*   **鯧魚** (Pomfret) - Pomfret
*   **塘蝨** (Catfish) - Ikan lele
*   **鯇魚** (Grass carp) - Ikan karp rumput
*   **鯪魚** (Mud carp) - Ikan karp lumpur
*   **頭鱸** (Head grunt) - Head grunt
*   **撻沙** (Tonguesole) - Ikan sebelah

**其他水產 (Other Aquatic Products)**
*   **鯪魚肉** (Minced mud carp) - Minced mud carp
*   **紅蟹** (Red crab) - Kepiting merah
*   **琵琶蝦** (Bay lobster) - Lobster
*   **三點蟹** (Three-spotted crab) - Kepiting tiga jemplok
*   **花蝦** (Striped prawn) - Udang windu
*   **龍蝦** (Lobster) - Lobster
*   **大閘蟹** (Mitten crab) - Kepiting sarung
*   **草蝦/鬼蝦** (Tiger prawn) - udang galah
*   **瀨尿蝦** (Mantis shrimp) - Udang mantis
*   **花蟹** (Flower crab) - Rajungan
*   **基圍蝦** (Greasyback shrimp) - Udang peci
*   **水魚** (Soft-shell turtle) - Kura-kura kerang lunak
*   **青蟹** (Mud crab) - Kepiting lumpur
*   **大蝦** (King prawn) - Udang susu
*   **沙蜆** (Sand clam) - Kerang pasir
*   **花蛤** (Common basket lucina) - Lucina keranjang biasa
*   **扇貝** (Fan scallop) - Kerang kipas
*   **蠔** (Oyster) - Kerang
*   **東風螺** (Spiral babylon) - Babylon spiral
*   **貴妃蚌** (Queen clam) - Kerang ratu
*   **鮑魚** (Abalone) - Tiram
*   **花螺** (Areola babylon) - Babylon areola
*   **帶子** (Scallop) - Remis
*   **八爪魚** (Octopus) - Gurita
*   **響螺** (Conch) - Siput
*   **象拔蚌** (Geoduck) - Geoduck
*   **魷魚** (Squid) - Cumi-cumi
*   **青口** (Mussel) - Remis
*   **蟶子** (Razor clam) - Kerang pisau/Kerang bamboo
*   **墨魚** (Cuttlefish) - Sotong

---

### 4. 家禽類 (Poultry / Unggas)

*   **雞** (Whole chicken) - Ayam utuh
*   **雞殼** (Chicken breast carcass) - Tulang dada ayam
*   **雞腸** (Chicken intestine) - Usus ayam
*   **雞扒** (Chicken steak) - Steak ayam
*   **雞腳** (Chicken claw) - Ceker ayam
*   **雞血** (Chicken blood) - Darah ayam
*   **雞胸** (Chicken breast) - Dada ayam
*   **雞心** (Chicken heart) - Jantung ayam
*   **竹絲雞** (Silky fowl) - Unggas sutra
*   **雞腿** (Chicken leg) - Paha ayam
*   **雞肝** (Chicken liver) - Hati ayam
*   **雞膇** (Drumstick) - Paha bawah
*   **雞翼** (Chicken wing) - Sayap ayam
*   **雞砂囊/雞腎** (Chicken gizzard) - Ampela ayam
*   **雞軟骨** (Chicken cartilage) - Tulang Rawan Ayam
*   **鴨** (Whole duck) - Bebek utuh
*   **鴿** (Whole pigeon) - Burung dara utuh
*   **鵝腸** (Goose intestine) - Usus soang
*   **鴨掌** (Duck web) - Web bebek
*   **鵝** (Whole goose) - Soang 1 ekor
*   **鴨腎** (Duck gizzard) - Empedal bebek
*   **鴨翼** (Duck wing) - Sayap bebek
*   **鵝掌** (Goose web) - Web soang
*   **鵝腎** (Goose gizzard) - Empedal angsa
*   **鴨肝** (Duck liver) - Hati bebek
*   **鵝翼** (Goose wing) - Sayap soang
*   **鷓鴣** (Partridge) - Ayam hutan
*   **鴨腸** (Duck intestine) - Usus bebek
*   **鵝肝** (Goose liver) - Hati soang
*   **鵪鶉** (Quail) - Burung puyuh

---

### 5. 水果 (Fruits / Buah-buahan)

*   **士多啤梨** (Strawberry) - Stroberi
*   **牛油果** (Avocado) - Alpukat
*   **奇異果** (Kiwi) - Kiwi
*   **大樹菠蘿** (Jackfruit) - Nangka
*   **西瓜** (Watermelon) - Semangka
*   **枇杷** (Loquat) - Buah loquat
*   **山竹** (Mangosteen) - Manggis
*   **西柚** (Grapefruit) - Grapefruit
*   **青檸** (Lime) - Jeruk nipis
*   **火龍果** (Dragon fruit) - Buah naga
*   **西梅** (Prune) - Plum
*   **青蘋果** (Green apple) - Apel hijau
*   **木瓜** (Papaya) - Pepaya
*   **芒果** (Mango) - Mangga
*   **哈密瓜** (Hami melon) - Melon hami
*   **柿** (Chinese persimmon) - Kesemek cina
*   **紅桑子** (Raspberry) - Rasberi
*   **提子** (Grape) - Anggur
*   **柑** (Mandarin) - Jeruk mandarin
*   **桃** (Peach) - Peach
*   **番石榴** (Guava) - Jambu biji
*   **柚子** (Pummelo) - Delima
*   **桃駁梨** (Nectarine) - Nektarin
*   **番荔枝** (Sugar-apple) - Srikaya
*   **紅毛丹** (Rambutan) - Rambutan
*   **荔枝** (Lychee) - Leci
*   **菠蘿** (Pineapple) - Nanas
*   **香蕉** (Banana) - Pisang
*   **梨** (Pear) - Pir
*   **黑莓** (Blackberry) - Blackberry
*   **楊桃** (Starfruit) - Belimbing
*   **橙** (Orange) - Jeruk
*   **櫻桃** (Cherry) - Ceri
*   **榴槤** (Durian) - Durian
*   **龍眼** (Longan) - Kelengkeng
*   **椰子** (Coconut) - Kelapa
*   **蜜瓜** (Honeydew-melon) - Melon
*   **檸檬** (Lemon) - Jeruk lemon
*   **黃皮** (Wampi) - Wampi
*   **熱情果** (Passion-fruit) - Markisa
*   **藍莓** (Blueberry) - Bluberi
*   **無花果** (Fig) - Buah ara
*   **蓮霧** (Wax apple) - Jambu air
*   **蘋果** (Apple) - Apel
*   **椰青** (Young coconut) - Kelapa muda

---

### 6. 燒味 / 滷味 (Siu Mei / Lo Mei / Daging Panggang / Semur)

*   **叉燒** (Barbecued pork) - Babi bumbu barbeque
*   **燒肉** (Roasted pork) - Babi bakar
*   **燒鵝** (Roasted goose) - Angsa Panggang
*   **白切雞** (Poached chicken) - Ayam rebus
*   **燒乳豬** (Roasted suckling pig) - Anak babi bakar
*   **滷水鵝** (Marinated goose) - Angsa Bumbu
*   **豉油雞** (Soy sauce chicken) - Ayam kecap
*   **燒乳鴿** (Roasted pigeon) - Burung dara bakar
*   **滷水鴨** (Marinated duck) - Bebek bumbu mentega
*   **鹽焗雞** (Salt-baked chicken) - Ayam panggang garam
*   **燒骨** (Roasted rib) - Iga panggang
*   **滷水鵝片** (Marinated sliced goose meat) - Marinated sliced goose meat
*   **貴妃雞** (Poached marinated chicken) - Ayam bumbu pop
*   **燒鴨** (Roasted duck) - Bebek bakar
*   **滷水鴨掌** (Marinated duck web) - Marinated duck web
*   **滷水鴨翼** (Marinated duck wing) - Marinated duck wing
*   **滷水鵝腸** (Marinated goose intestine) - Marinated goose intestine
*   **滷水雞翼** (Marinated chicken wing) - Sayap ayam mentega
*   **滷水鴨舌** (Marinated duck tongue) - Marinated duck tongue
*   **熟墨魚** (Marinated cuttlefish) - Cumi asin
*   **燒雞翼** (Roasted chicken wing) - Sayap ayam panggang
*   **滷水牛膁** (Marinated beef shin) - Betis sapi bumbu
*   **紅腸** (Pork sausage) - Sosis babi
*   **滷水豆腐** (Marinated bean curd) - Tahu bumbu
*   **滷水鴨腎** (Marinated duck gizzard) - Empedu bumbu mentega
*   **海蜇** (Jelly fish) - Ubur-ubur
*   **滷水蛋** (Marinated egg) - Telur bumbu
*   **滷水大腸** (Marinated pig intestine) - Marinated pig intestine
*   **燻蹄** (Marinated pig knuckle) - Buku jari babi bumbu
*   **滷水豬腩肉** (Marinated pork belly) - Sam cam bumbu

---

### 7. 冷藏食品 (Frozen Food / Makanan Beku)

*   **蟹柳** (Imitation crab meat) - Daging kepiting imitasi
*   **墨魚丸** (Cuttlefish ball) - Baso cumi
*   **多春魚** (Capelin) - Ikan telur
*   **火腿** (Ham) - Daging ham
*   **蝦丸** (Shrimp ball) - Baso udang
*   **秋刀魚** (Pacific saury) - Ikan layang
*   **豬肉丸** (Pork ball) - Baso babi
*   **龍蝦丸** (Lobster ball) - Baso kepiting
*   **銀鱈魚** (Black cod) - Ikan kod hitam
*   **牛丸** (Beef ball) - Bakso sapi
*   **魚皮餃** (Fish skin dumpling) - Pangsit kulit ikan
*   **三文魚** (Salmon) - Salmon
*   **魚丸** (Fish ball) - Bakso ikan
*   **雞肉腸** (Chicken sausage) - Sosi ayam
*   **脆皮腸** (Crispy sausage) - Sosis krispi

---

### 8. 其他食品 / 調味料 (Other Food Items / Jenis Makanan Lainnya)

**糧食及乾貨**
*   **麵粉** (Flour) - Tepung terigu
*   **紅米** (Red rice) - Beras merah
*   **紅腰豆** (Red kidney bean) - Kacang merah
*   **白米** (White rice) - Beras putih
*   **燕麥米** (Oat) - Gandum
*   **黃豆** (Soybean) - Kacang kedelai
*   **紫米** (Purple rice) - Beras ungu
*   **薏米** (Pearl barley) - Gandung mutiara
*   **三角豆** (Chickpea) - Garbanzo/Kacang arab
*   **糯米** (Glutinous rice) - Beras ketan
*   **紅豆** (Adzuki bean) - Kacang adzuki
*   **黑豆** (Black bean) - Kacang hitam
*   **糙米** (Brown rice) - Beras coklat
*   **綠豆** (Mung bean) - Kacang hijau
*   **赤小豆** (Rice bean) - Kacang uji
*   **眉豆** (Black-eyed pea) - Kacang hitam
*   **蓮子** (Lotus seed) - Biji lotus
*   **榛子** (Hazelnut) - Hazelnut
*   **扁豆** (White hyacinth bean) - Kacang komak
*   **白果** (Ginkgo) - Ginkgo
*   **開心果** (Pistachio) - Pistachio
*   **花生** (Peanut) - Kacang tanah
*   **核桃** (Walnut) - Kenari
*   **葵花子** (Sunflower seed) - Kuaci
*   **腰果** (Cashew) - Kacang mede
*   **松子仁** (Pine nut) - Kacang pinus
*   **蠶豆** (Horse bean) - Kacang koro
*   **芝麻** (Sesame seed) - Biji wijen
*   **扁桃仁** (Almond) - Almond
*   **西米** (Sago) - Sagu

**粉麵類**
*   **上海麵** (Shanghai noodles) - Mi shanghai
*   **油麵** ("Yau Mian") - Mie minyak
*   **蝦子麵** (Shrimp noodles) - Mi udang
*   **伊麵** (E-fu noodles) - E-fu Mi
*   **烏冬** (Udon) - Mi udon
*   **濛粉** (Vietnamese rice noodles) - Mi beras vietnam
*   **全蛋麵** (Egg noodles) - Mi telur
*   **通心粉** (Macaroni) - Makaroni
*   **瀨粉** ("Lai Fan") - Spageti beras
*   **米粉** (Rice noodles) - Mi beras
*   **意大利粉** (Spaghetti) - Spageti
*   **粉絲** (Mungbean vermicelli) - Bihun kacang hijau
*   **河粉** (Flat rice noodles) - Kwetiau
*   **銀針粉** (Silver pin noodles) - Mie pin perak
*   **點心皮/餃子皮** (Dim sum/dumpling wrapper) - Dim sum/kulit pangsit

**調味料**
*   **白糖** (Granulated sugar) - Gula putih
*   **花生油** (Peanut oil) - Minyak kacang
*   **老抽** (Dark soy sauce) - Kecap kedelai kental
*   **黃糖** (Brown sugar) - Gula merah
*   **粟米油** (Corn oil) - Minyak jagung
*   **醋** (Vinegar) - Cuka
*   **冰糖** (Rock sugar) - Gula batu
*   **橄欖油** (Olive oil) - Minyak zaitun
*   **蠔油** (Oyster sauce) - Saus tiram
*   **片糖** (Slab sugar) - Gula iris
*   **白胡椒粉** (White pepper powder) - Bubuk lada putih
*   **紹興酒** (Shaohsing wine) - Anggur saosin
*   **鹽** (Salt) - Garam
*   **生抽** (Light soy sauce) - Kecap kedelai encer
*   **魚露** (Fish sauce) - Kecap ikan
*   **雞粉** (Chicken powder) - Kaldu ayam
*   **番茄醬** (Ketchup) - Saus tomat
*   **黃芥末** (Mustard) - Mustard
*   **粟粉** (Cornstarch) - Tepung jagung
*   **沙爹醬** (Satay sauce) - Saus sate
*   **辣椒醬** (Chili sauce) - Saus cabai
*   **豆豉** (Fermented black soybean) - Kecap hitam fermentasi
*   **沙茶醬** (Sa cha sauce) - Saus sa cha
*   **酸梅醬** (Plum sauce) - Saus plum
*   **南乳** (Fermented red bean curd) - Tahu merah difermentasi
*   **豆瓣醬** (Broad bean paste) - Belacan kacang lebar
*   **蝦醬** (Shrimp paste) - Terasi
*   **腐乳** (Fermented bean curd) - Tahu difermentasi
*   **咖哩醬** (Curry sauce) - Saus kari
*   **麵豉醬** (Salted yellow bean paste) - tauco

**豆製品、醃製品及海味乾貨**
*   **雞蛋** (Chicken egg) - Telur ayam
*   **豆腐** (Soybean curd) - Tahu kedelai
*   **枝竹** (Soybean stick) - Stik tahu
*   **皮蛋** (Lime-preserved egg) - Telur yang diawetkan limau
*   **布包豆腐** (Wrapped bean curd) - Tahu terbungkus
*   **梅菜** (Preserved mustard) - Bumbu bubuk diawetkan
*   **鹹鴨蛋** (Salted duck egg) - Telur bebek asin
*   **豆腐卜** (Deep fried tofu puff) - Tahu basah goreng
*   **雪菜** (Preserved mustard greens) - Sawi diawetkan
*   **鹹鴨蛋黃** (Salted duck egg yolk) - Kuning telur bebek asin
*   **芽菜** (Bean sprouts) - Toge
*   **菜脯** (Dried radish) - lobak kering
*   **玉子豆腐** (Egg bean curd) - Tofu
*   **腐皮** (Soybean sheet) - Kembang tahu
*   **金針** (Dried lily bud) - Pucuk lili kering
*   **雲耳** (Black fungus) - Jamur hitam
*   **龍眼肉乾** (Dried longan pulp) - Bubur lengkeng kering
*   **金銀花** (Honeysuckle) - Honeysuckle
*   **木耳** (Wood ear fungus) - Jamur kuping kayu
*   **無花果乾** (Dried fig) - Buah ara kering
*   **夏枯草** (Spica prunellae) - Prunela spica
*   **雪耳** (White fungus) - Jamur putih
*   **杞子** (Chinese wolfberry) - Wolfberry cina
*   **雞骨草** (Herba abri) - Herba abri
*   **紅棗** (Red date) - Kurma merah
*   **南北杏** (Apricot kernel) - Biji aprikot
*   **牛油** (Butter) - Mentega
*   **蜜棗** (Candied date) - Manisan kurma
*   **淮山** (Chinese yam) - Ubi cina
*   **蜜糖** (Honey) - Madu
*   **鹹魚** (Salted fish) - Ikan asin
*   **海參** (Dried sea cucumber) - Timun laut kering
*   **柴魚** (Dried bonito) - Bonito kering
*   **廣東臘腸** (Canton style pork sausage) - Sosis babi ala Canton
*   **瑤柱** (Dried scallop) - Kerang kering
*   **乾冬菇** (Dried Shiitake mushroom) - Jamur shiitake kering
*   **膶腸** (Liver sausage) - Sosis hati
*   **蝦米** (Dried shrimp) - Udang kering
*   **紫菜** (Dried seaweed) - Rumput laut kering
*   **臘鴨** (Preserved duck) - Bebek olahan
*   **蠔豉** (Dried oyster) - Tiram kering
*   **菜乾** (Dried Chinese white cabbage) - Sawi putih kering
*   **金華火腿** (Chinese ham) - Ham cina
*   **淡菜** (Dried mussel) - Remis kering
*   **茶葉** (Tea leaf) - Daun teh
`;

const lines = raw.split('\n');
const results = [];
let currentCategory = '';

const isVeganCategory = (cat: string) => cat.includes('蔬菜') || cat.includes('水果') || cat.includes('調味料');

for (let line of lines) {
    line = line.trim();
    if (!line) continue;
    if (line.startsWith('### ')) {
        const match = line.match(/### \d+\.\s+([^\(]+)/);
        if (match) {
            currentCategory = match[1].trim();
        }
    } else if (line.startsWith('*   **')) {
        const match = line.match(/\*\s+\*\*([^\*]+)\*\*\s+\(([^\)]+)\)\s+-\s+(.+)/);
        if (match) {
            const zh = match[1].trim();
            const en = match[2].trim();
            const id_name = match[3].trim();
            
            // Adjust categories to match our type
            let mappedCategory = currentCategory;
            if (mappedCategory.includes('蔬菜')) mappedCategory = '蔬菜類';
            else if (mappedCategory.includes('肉')) mappedCategory = '肉類';
            else if (mappedCategory.includes('水產')) mappedCategory = '水產類';
            else if (mappedCategory.includes('家禽')) mappedCategory = '家禽類';
            else if (mappedCategory.includes('水果')) mappedCategory = '水果';
            else if (mappedCategory.includes('燒味')) mappedCategory = '燒味/滷味';
            else if (mappedCategory.includes('冷藏')) mappedCategory = '冷藏食品';
            else if (mappedCategory.includes('其他') || mappedCategory.includes('調味')) mappedCategory = '其他食品/調味料';
            else mappedCategory = '其他食品/調味料';
            
            // Basic heuristic for vegan/vegetarian
            let veg = isVeganCategory(mappedCategory);
            let vegan = isVeganCategory(mappedCategory);
            
            // Overrides based on name
            if (zh.includes('蛋') || en.includes('egg') || zh.includes('奶') || en.includes('milk') || zh.includes('牛油')) {
                vegan = false;
                veg = true;
            }
            if (zh.includes('蠔油') || zh.includes('魚露') || zh.includes('蝦醬') || zh.includes('魚') || zh.includes('蝦') || zh.includes('肉') || zh.includes('臘') || zh.includes('膶') || zh.includes('瑤柱') || zh.includes('海參') || zh.includes('燕麥') || zh.includes('雞粉')) {
                vegan = false;
                if (!zh.includes('燕麥') && !zh.includes('麵')) veg = false;
            }
            
            results.push({
                category: mappedCategory,
                zh, en, id_name, isVegetarian: veg, isVegan: vegan
            });
        }
    }
}

let code = "export type Category = '蔬菜類' | '肉類' | '水產類' | '家禽類' | '水果' | '燒味/滷味' | '冷藏食品' | '其他食品/調味料';\n\n";
code += "export interface Ingredient {\n  id: string;\n  category: Category;\n  zh: string;\n  en: string;\n  id_name: string;\n  isVegetarian: boolean;\n  isVegan: boolean;\n}\n\n";
code += "export const INGREDIENTS_DATA: Ingredient[] = [\n";
results.forEach((r, i) => {
    code += "  { id: 'i" + i + "', category: '" + r.category + "', zh: '" + r.zh.replace(/'/g, "\\'") + "', en: '" + r.en.replace(/'/g, "\\'") + "', id_name: '" + r.id_name.replace(/'/g, "\\'") + "', isVegetarian: " + r.isVegetarian + ", isVegan: " + r.isVegan + " },\n";
});
code += "];\n";

fs.writeFileSync('./src/data/ingredients.ts', code);
