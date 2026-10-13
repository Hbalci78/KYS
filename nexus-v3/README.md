# KHSL NEXUS V3 — Tarayıcıda çalışan KYS prototipi

## Durum
Bu klasörde çalışan tek dosyalık bir web uygulaması vardır: [index.html](index.html). Kodda kuruma ait özel kayıt, personel adı, Google Drive dosya kimliği veya gerçek master doküman yoktur. Başlangıç kayıtları açıkça DEMO olarak işaretlenmiştir.

## Kullanım
1. `index.html` dosyasını tarayıcıda açın (veya GitHub Pages etkinse `/KYS/nexus-v3/` adresini kullanın).
2. GDL menüsünde `CSV / Excel içe aktar` ile Güncel Doküman Listesinin kontrol amaçlı indeksini alın. Kaynak Excel değişmez.
3. Doküman Atlası'ndan belge koduna PDF, DOCX, XLSX, boş, dolu veya master adayı dosyalarını yükleyin; aynı kod altında listelenir.
4. GDL satırında DDTF'ye tıklayın. Doküman kodu ve revizyon gelir; personel listesinden kişi seçebilirsiniz.
5. Eski/Yeni/Gerekçe alanlarını doldurun. Taslağı kaydedin. Gerekli alanlar tam ise İncelemeye gönderin.
6. Yedekleme Merkezi'nde tam JSON yedeğini indirin (indekse eklenen dosya baytları dahil).

## Güvenlik ve gerçek kullanım sınırı
**Bu sürüm eğitim ve teknik doğrulama içindir.** Kod tek sayfalık istemci uygulamasıdır; sunucu oturumu, merkezi kullanıcı/rol yetkileri, kurum ağındaki gizli dosya kasası, otomatik bulut yedeği ve Drive API eşitlemesi YOKTUR. Kayıt metaverileri tarayıcı localStorage, ek dosya baytları IndexedDB'de saklanır. Gizli/kişisel kayıt yüklemeyin. Aynı tarayıcı profilini paylaşan kişiler o profildeki verilere erişebilir; tarayıcı önbelleği temizlenirse kayıtlar kaybolabilir. Tam yedek dışa aktarma manuel ve kullanıcının sorumluluğundadır.

GDL'de görülen `Doğrulandı` alanı yalnız kullanıcının indeks doğrulama beyanını gösterir; kurum içi resmî onay değildir. DDTF içindeki `İncelemede` geçişi master veya GDL revizyonunu otomatik değiştirmez. Yazdırılan DDTF resmî master formun birebir kopyası değildir. Word/Excel özgün dosyaları önizlenemediğinde indirilir; PDF tarayıcıda açılır.

## Çalışan ekranlar
Çalışma Masası, GDL, Doküman Atlası, DDTF, Personel Sicili, İlişki Haritası, genel iş kayıtları, yedek alma/geri yükleme; masaüstü ve mobil.

## Test
Chromium üzerinde GDL XLSX okuma, belge kodu eşleştirme, revizyon çakışması, GDL → DDTF ön doldurma, DDTF taslak kaydetme ve inceleme statüsüne geçişi doğrulandı. Tarayıcıya özgü kalıcı depolama ve uzaktaki GitHub Pages yayımı farklı kurulumlarda ayrıca doğrulanmalıdır.

## Üretim geçiş kapısı
Gerçek sisteme geçmeden önce sunucu tarafı kimlik doğrulama/RBAC, kurum onaylı master-indeks seçimi, tam şablon koruma, denetim izi, şifreli depolama, bağımsız periyodik yedek, kurtarma testi, Drive eşitleme çatışması ve kurum veri güvenliği onayı tamamlanmalıdır.

## GitHub Pages yayımı — erişim sınırı (13.10.2026)
GitHub Actions ile otomatik site oluşturma denenmiş, **Create Pages site failed: Resource not accessible by integration** hatası alınmıştır. Depoda `.github/workflows/deploy-nexus-v3.yml` manuel iş akışı hazırdır. Repo sahibi GitHub'da **Settings → Pages → Build and deployment → Source: GitHub Actions** seçip Pages'i etkinleştirdikten sonra **Actions → Publish KHSL NEXUS V3 to GitHub Pages → Run workflow** ile yayını başlatabilir. Yayın başarıyla tamamlandığında yeni uygulama `https://hbalci78.github.io/KYS/nexus-v3/` adresinde sunulması beklenir; site yayına geçmeden bu adres çalışıyor kabul edilmemelidir.
