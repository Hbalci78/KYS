# KHSL P.16-FR.01 Risk Analizi Web Arayüzü

P.16-FR.01 Excel master şablonunu bozmadan risk kayıtlarını web üzerinden düzenleyen ve yeniden `.xlsx` üreten statik Firebase Hosting uygulamasıdır.

## Temel özellikler

- Excel şablonundaki `Risk Analizi` sayfasını okuyarak mevcut kayıtları arayüze aktarır.
- Risk kodu, ISO/IEC 17025 maddesi, süreç, kaynak, başlangıç/hedef/gerçekleşen puanlar, faaliyet, sorumlu, termin, YGG ve izleme alanlarını düzenler.
- Risk skorunu ve risk düzeyini arayüzde anlık hesaplar.
- Şablonu ZIP/XML düzeyinde günceller; kenarlık, hücre stili, sütun genişliği, satır yüksekliği, birleşimler, görseller ve yazdırma ayarlarına müdahale etmez.
- Çalışmayı tarayıcı `localStorage` alanında taslak olarak korur.
- Firebase Hosting için hazırdır. Firestore kuralı, yalnız oturum açmış kullanıcı erişimi esasına göre hazırlanmıştır.

## Yerel çalıştırma

```bash
python -m http.server 8080 --directory public
```

Ardından `http://localhost:8080` adresini açın.

## Firebase yayımlama

```bash
npm install -g firebase-tools
firebase login
firebase use --add
firebase deploy --only hosting
```

## Master şablon

`public/templates/P16-FR01_MASTER.xlsx.b64` kontrollü kopyanın Base64 gösterimidir. Uygulama bunu tarayıcıda yeniden `.xlsx` verisine dönüştürür. Orijinal Drive master dosyası değiştirilmez.

## Hücre eşleştirmesi

Risk kayıtları `Risk Analizi` sayfasında 11-60. satırlar arasında A-AI sütunlarına yazılır. Formül sütunları M, N, W, X, AA, AB ve AC dışa aktarım sırasında yeniden kurulur ve Excel hesaplama modu otomatik olarak işaretlenir.
