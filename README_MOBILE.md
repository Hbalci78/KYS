# KHSL KYS Mobil

KHSL KYS Mobil; saha kayıtlarını telefon kamerasından yakalamak, doldurulabilir KYS formlarını mobilde tamamlamak ve oluşan kayıtları kontrollü master dokümanlardan ayrı olarak Google Drive'a aktarmak için hazırlanmıştır.

## Ana ekranlar

1. **Ana Sayfa** — Belge Tara, Form Doldur ve Doküman Ara hızlı işlemleri; taslak/yükleme/Drive durumu.
2. **Tara/Yükle** — Arka kamera veya galeri, çok sayfalı tarama, döndürme/kırpma, PDF oluşturma, metadata ve Drive kaydı.
3. **Formlar** — P.14-FR.01, P.13-FR.01, P.17-FR.01, P.16-FR.01 ve P.18-FR.01 mobil form motoru; taslak, kamera kanıtı, imza/paraf ve PDF.
4. **Dokümanlar** — P.14-LS.01 SSOT mantığıyla kontrollü kaynaklara erişim ve P.14-FR.01 değişiklik talebi başlatma.

## Drive kayıt mimarisi

- Ana mobil kayıt klasörü: `KHSL KYS MOBİL KAYITLAR`
- Belge kayıtları: `01_BELGE_YUKLEMELERI`
- Doldurulmuş form kayıtları: `02_FORM_KAYITLARI`

Bu klasörler kontrollü master doküman deposunun yerine geçmez. Mobil uygulama master dosyanın üzerine yazmaz; yeni kayıt üretir.

## Drive bağlantısı

Uygulama iki bağlantı modeli destekler:

### Google OAuth
Web/PWA kullanımında Google Drive API yetkisi olan bir OAuth Web Client ID uygulama Ayarları ekranına girilir. OAuth istemci bilgisi kaynak koda sabitlenmez.

### Apps Script köprüsü
APK/kurumsal kullanım için `apps-script/Code.gs` dosyasındaki köprü Google Apps Script Web App olarak dağıtılır. `setupApiKey()` bir gizli API anahtarı üretir. Web App URL ve API anahtarı uygulamanın Ayarlar ekranına girilir. Köprü yalnız önceden tanımlanmış KHSL mobil kayıt klasörlerine yazabilir.

## Gizlilik / doküman kontrolü

- Kamera görüntüleri işlem sonrasında uygulama belleğinden temizlenir.
- Kamera ekleri taslaklarda kalıcı saklanmaz.
- Aktivite kaydı belge/form içeriğini değil yalnız işlem metadata'sını tutar.
- Drive gerçek başarı yanıtı vermeden kayıt “yüklendi” sayılmaz.
- P.14 değişiklik talepleri yeni kayıt olarak oluşturulur; kontrollü master üzerine yazılmaz.

## Android APK

GitHub Actions hattı `KHSL-KYS-debug-apk` adlı debug APK artifact'i üretir. Capacitor yapılandırmasında uygulama kimliği `tr.gov.saglik.khsl.kys`, uygulama adı `KHSL KYS` olarak tanımlıdır.
