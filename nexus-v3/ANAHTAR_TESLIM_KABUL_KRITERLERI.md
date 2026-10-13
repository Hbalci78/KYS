# KHSL NEXUS — Anahtar Teslim Kabul Kriterleri
**Durum: KABUL EDİLMEDİ / üretim yayını yok.** Bu dosya geliştirme için kabul kapılarını belirler; geçildiğini iddia etmez.

## Tek ve bütünleşik çalışma ortamı
- [ ] HTTPS altında çalışan, kurumca erişimi onaylanan web adresi; mobil ve masaüstü için kullanılabilir arayüz.
- [ ] Üretim veritabanı, sunucu tarafı oturum ve yetki yönetimi; kullanıcı bazlı görev/sorumluluk ekranı.
- [ ] Kalite yöneticisi için günlük iş kuyruğu ve global arama; tek kaynağa bağlı ilişkili kayıtlar.
- [ ] Türkçe hata mesajları, boş durumlar, arama/filtreleme, işlem iptali ve sürüm geçmişi.

## GDL, belge ve form yönetimi
- [ ] P.14-LS.01 Güncel Doküman Listesi kaynak kaydı ve geçerli sürümü kalite yöneticisi tarafından doğrulanır; indeks resmî GDL yerine geçmez.
- [ ] Belge koduna tek tıkla ana ekrana; ikinci tıkla seçili sürümü PDF önizleme veya DOCX/XLSX açma/indirme.
- [ ] Tek belge kimliğinde onaylı master, boş şablon, dolu kayıt, çalışma kopyası, PDF yayımlama kopyası, iptal/arşiv ayrı.
- [ ] Drive'dan içe alma salt-okunur başlar; mükerrer/sürüm ihtilafı tespit edilir, yalnız dosya adına göre otomatik master seçilmez.
- [ ] Orijinal dosya adı, byte bütünlüğü, MIME biçimi, revizyon ve değişiklik izleri korunur.
- [ ] Özgün Word/Excel şablonu bozulmadan resmî çıktılar elde edilir; ayrı görsel taslak resmî form diye sunulmaz.

## DDTF, personel ve otomatik ilişkiler
- [ ] GDL kaydı seçildiğinde kod/ad/aktif revizyon/tarih doğrulanmış kaynaktan alınır.
- [ ] Personel seçimi kanonik listeden gelir; geçici görev ayrımı, aktif/pasif durum ve yetki kuralları uygulanır.
- [ ] Eski / Yeni / Gerekçe ve bağlı dokümanlar, değerlendirme, karar, faaliyet, kayıt, izleme, etkinlik ve kapanış ilişkilidir.
- [ ] Taslak → İnceleme → Onay/İade → Uygulama → Kapanış, yetkilendirilmiş rol bazlıdır; onaysız master ve GDL değiştirilmez.
- [ ] Doküman, DDTF, risk, DF, tetkik, eğitim ve kalibrasyon faaliyetleri arasında çift yönlü izlenebilirlik vardır.

## Veri güvenliği, yedek ve denetim
- [ ] Personel/uygunsuzluk verisi herkese açık sayfalarda ve kod deposunda bulunmaz.
- [ ] Yetkiler sunucuda denetlenir; dosya indirme/önizleme de aynı erişim denetiminden geçer.
- [ ] Giriş, değiştirme, silme, onay, erişim ve sürüm olayları için değiştirilemez/tahrif izli denetim günlüğü.
- [ ] Günlük otomatik, bağımsız yedekleme: veritabanı + dosya baytları + belge ilişkileri + sürüm geçmişi.
- [ ] Yedekten bağımsız geri yükleme testi, veri bütünlüğü ve kurtarma raporu.
- [ ] Google Drive entegrasyonu yetkili OAuth/API erişimiyle kurulur; durum 'Bağlı' yalnız doğrulanmışsa gösterilir.
- [ ] Çevrimdışı taslakta senkronizasyon çakışması ve veri kaybı kontrolü.

## Operasyon devri ve kabul testi
- [ ] Gerçek kullanıcı rolleriyle masaüstü + mobil kabul testi.
- [ ] En az bir gerçek ancak yetkilendirilmiş belgeyle: GDL → master → DDTF → inceleme/onay → revizyon → arşiv → yayımlama → yedek → geri yükleme zinciri.
- [ ] Kaynak ve hedefte dosya byte/hash/doğru sürüm eşleşmesi.
- [ ] Yazılı işletim, kullanıcı, yönetici, yetki ve kurtarma rehberi.
- [ ] Yayın URL'si, TLS durumu, erişim yöntemi, son başarılı yedek ve restorasyon kanıtı kayıtlı.

## Mevcut durum / engeller (13.10.2026)
- NEXUS V3: tarayıcıda çalışan yerel prototip; üretim sayılmaz.
- GitHub Pages: site etkinleştirme API yetki hatası nedeniyle yayımlanamadı; GitHub Actions manuel kurulum hazırlığı var.
- Lovable: veritabanı kuruldu; UI derleme hataları ve kredi sınırı nedeniyle çalışır sürüm tamamlanamadı.
- Replit: yeni uygulama oluşturma sınırı nedeniyle yayın yapılamadı.
- Yukarıdaki hiçbir kutu üretim kabul testleriyle tamamlandı diye işaretlenemez.

> Anahtar teslim, kabul testleri ve erişim/yedek kanıtlarıyla doğrulanan **çalışır üretim sistemi** demektir. Kodun depoda bulunması veya ekranın açılması tek başına yeterli değildir.
