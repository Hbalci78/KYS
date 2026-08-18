package tr.gov.saglik.khsl.kys;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.text.InputType;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;
import android.webkit.JavascriptInterface;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

public class MainActivity extends Activity {
    private WebView webView;
    private SharedPreferences prefs;

    private static final String[][] PROCEDURES = new String[][]{
            {"P.01", "Tarafsızlık ve Gizlilik Prosedürü", "Rev.02", "https://docs.google.com/document/d/1lipQorpr3ubsTOFwyJUSUJHveB11NJT3/edit"},
            {"P.02", "Personel Yönetimi ve Eğitimi Prosedürü", "Rev.02", "https://docs.google.com/document/d/1tHTBAbfsn_QB0XbY9Yiu61B6ODaThS1P/edit"},
            {"P.05", "Satın Alma Prosedürü", "Rev.04", "https://docs.google.com/document/d/1GkjUzYEmqDC09z5SzCHpWxfehc8mq0ao/edit"},
            {"P.06", "Taleplerin, Tekliflerin ve Sözleşmelerin Gözden Geçirilmesi Prosedürü", "Rev.03", "https://docs.google.com/document/d/1J8KOqDOMnWnxtToH3bTxQW6R08EexLXQ/edit"},
            {"P.10", "Kalite Kontrol Prosedürü", "Rev.02", "https://docs.google.com/document/d/1P124N40iF9X7Ui-T1FqVg8uXeRc2zpJl/edit"},
            {"P.11", "Rapor Yönetimi Prosedürü", "Rev.04", "https://docs.google.com/document/d/10j9GvDHCeRhiPywKlFidgFuq2IDnupgW/edit"},
            {"P.13", "Uygun Olmayan Deney İşinin Kontrolü Prosedürü", "Rev.01", "https://docs.google.com/document/d/1YTFUZhpCbWXWvk5x6HwHSSQV93kr0o4z/edit"},
            {"P.14", "Doküman Hazırlama ve Kontrolü Prosedürü", "Rev.04", "https://docs.google.com/document/d/1_khG2htr5OQiH1joaNdX0ZHJ8EkH_BdY/edit"},
            {"P.15", "Kayıtların Kontrolü Prosedürü", "Rev.03", "https://drive.google.com/file/d/11SJJqJ4mx2p_kHrkaHdsOHijgmjc3i1M/view"},
            {"P.16", "Risk ve Fırsatların Yönetimi Prosedürü", "Rev.02", "https://docs.google.com/document/d/1s91p7XMvX9ozNOCRJaRWD8IqI87v3cGY/edit"},
            {"P.17", "Düzeltici Faaliyet Prosedürü", "Rev.03", "https://docs.google.com/document/d/1JC87K34h6XXR0BgQxZ8ezxdj5E1gRYVA/edit"},
            {"P.19", "İç Tetkik Prosedürü", "Rev.02", "https://docs.google.com/document/d/1UyODRo9GP2D9dICo9AHPZivQZP9b1dUQ/edit"},
            {"P.20", "Yönetimin Gözden Geçirmesi Prosedürü", "Rev.01", "https://docs.google.com/document/d/1Tr_OZGFcpMqQLhEixuqGsms6wBcnHJAz/edit"}
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        prefs = getSharedPreferences("khsl_kys", MODE_PRIVATE);

        webView = new WebView(this);
        WebSettings s = webView.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setAllowFileAccess(true);
        s.setAllowContentAccess(false);
        s.setBuiltInZoomControls(false);
        s.setDisplayZoomControls(false);
        webView.setBackgroundColor(Color.rgb(245, 247, 251));
        webView.addJavascriptInterface(new Bridge(this), "KHSLAndroid");
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                Uri uri = request.getUrl();
                String url = uri.toString();
                if (url.startsWith("file:///android_asset/")) {
                    if (url.contains("/egitimler/")) {
                        String relative = url.substring("file:///android_asset/".length());
                        openExternal("https://github.com/Hbalci78/KYS/blob/main/" + relative);
                        return true;
                    }
                    return false;
                }
                if (url.startsWith("http://") || url.startsWith("https://")) {
                    openExternal(url);
                    return true;
                }
                return false;
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                injectPreservingEnhancements();
            }
        });
        setContentView(webView);
        webView.loadUrl("file:///android_asset/index.html");
    }

    private void injectPreservingEnhancements() {
        String js = """
                (function(){
                  if(window.__khslPreservedEnhanced) return;
                  window.__khslPreservedEnhanced = true;

                  const list = document.getElementById('documentList');
                  if(list && !document.getElementById('p15NativeRow')){
                    const row = document.createElement('a');
                    row.id = 'p15NativeRow';
                    row.className = 'document-row';
                    row.href = 'https://drive.google.com/file/d/11SJJqJ4mx2p_kHrkaHdsOHijgmjc3i1M/view';
                    row.innerHTML = '<span class="doc-code">P.15</span><span class="doc-info"><strong>Kayıtların Kontrolü Prosedürü</strong><small>Rev.03 · kayıt, arşiv, yedekleme ve veri bütünlüğü</small></span><span class="doc-status current">Yürürlükte</span><span class="arrow">›</span>';
                    list.appendChild(row);
                  }

                  const allButton = document.querySelector('.text-button');
                  if(allButton){
                    allButton.textContent = 'Tüm prosedürler →';
                    allButton.onclick = function(e){ e.preventDefault(); KHSLAndroid.showProcedureCatalog(); };
                  }

                  const actions = document.querySelector('.topbar-actions');
                  if(actions && !document.getElementById('aiKysNativeButton')){
                    const b = document.createElement('button');
                    b.id = 'aiKysNativeButton';
                    b.type = 'button';
                    b.textContent = '✦ AI KYS Asistanı';
                    b.style.border = '0';
                    b.style.background = '#11233f';
                    b.style.color = '#fff';
                    b.style.borderRadius = '10px';
                    b.style.padding = '10px 13px';
                    b.style.fontWeight = '700';
                    b.style.fontSize = '11px';
                    b.style.cursor = 'pointer';
                    b.onclick = function(){ KHSLAndroid.openAi(); };
                    actions.insertBefore(b, actions.firstChild);
                  }

                  const search = document.getElementById('globalSearch');
                  if(search){
                    search.addEventListener('input', function(){
                      setTimeout(function(){
                        const q = search.value.toLocaleLowerCase('tr-TR').trim();
                        let visible = 0;
                        document.querySelectorAll('.document-row').forEach(function(r){
                          const ok = r.textContent.toLocaleLowerCase('tr-TR').includes(q);
                          r.hidden = !ok;
                          if(ok) visible++;
                        });
                        const empty = document.getElementById('emptyState');
                        if(empty) empty.hidden = visible !== 0;
                      }, 0);
                    });
                  }
                })();
                """;
        webView.evaluateJavascript(js, null);
    }

    private void openExternal(String url) {
        try {
            startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(url)));
        } catch (Exception e) {
            Toast.makeText(this, "Bağlantı açılamadı.", Toast.LENGTH_SHORT).show();
        }
    }

    private void showProcedureCatalog() {
        runOnUiThread(() -> {
            LinearLayout items = new LinearLayout(this);
            items.setOrientation(LinearLayout.VERTICAL);
            int p = dp(10);
            items.setPadding(p, p, p, p);

            for (String[] procedure : PROCEDURES) {
                Button button = new Button(this);
                button.setAllCaps(false);
                button.setText(procedure[0] + " · " + procedure[1] + "\n" + procedure[2]);
                button.setTextSize(12f);
                button.setGravity(android.view.Gravity.START | android.view.Gravity.CENTER_VERTICAL);
                button.setPadding(dp(14), dp(10), dp(14), dp(10));
                LinearLayout.LayoutParams lp = new LinearLayout.LayoutParams(
                        LinearLayout.LayoutParams.MATCH_PARENT,
                        LinearLayout.LayoutParams.WRAP_CONTENT
                );
                lp.setMargins(0, 0, 0, dp(7));
                button.setLayoutParams(lp);
                button.setOnClickListener(v -> openExternal(procedure[3]));
                items.addView(button);
            }

            ScrollView scroll = new ScrollView(this);
            scroll.addView(items);
            new AlertDialog.Builder(this)
                    .setTitle("KHSL KYS · Prosedürler")
                    .setMessage("Ana ekran değiştirilmeden, prosedürler kontrollü Drive kaynaklarına bağlanmıştır.")
                    .setView(scroll)
                    .setNegativeButton("Kapat", null)
                    .show();
        });
    }

    private void showAiDialog() {
        runOnUiThread(() -> {
            LinearLayout box = new LinearLayout(this);
            box.setOrientation(LinearLayout.VERTICAL);
            int p = dp(16);
            box.setPadding(p, dp(8), p, 0);

            TextView note = new TextView(this);
            note.setText("KYS dokümanları esas alınır. AI, kontrollü dokümanı kendiliğinden değiştirmez; analiz ve öneri üretir.");
            note.setTextSize(12f);
            note.setTextColor(Color.DKGRAY);
            note.setPadding(0, 0, 0, dp(10));
            box.addView(note);

            EditText endpoint = new EditText(this);
            endpoint.setHint("AI proxy HTTPS adresi");
            endpoint.setSingleLine(true);
            endpoint.setText(prefs.getString("ai_endpoint", ""));
            box.addView(endpoint);

            EditText question = new EditText(this);
            question.setHint("KYS ile ilgili sorunuzu yazın…");
            question.setInputType(InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_FLAG_MULTI_LINE);
            question.setMinLines(4);
            question.setGravity(android.view.Gravity.TOP);
            box.addView(question);

            TextView answer = new TextView(this);
            answer.setTextSize(13f);
            answer.setTextColor(Color.rgb(23, 32, 51));
            answer.setPadding(0, dp(12), 0, dp(8));
            box.addView(answer);

            AlertDialog dialog = new AlertDialog.Builder(this)
                    .setTitle("✦ AI KYS Asistanı")
                    .setView(box)
                    .setPositiveButton("Sor", null)
                    .setNegativeButton("Kapat", null)
                    .create();

            dialog.setOnShowListener(d -> dialog.getButton(AlertDialog.BUTTON_POSITIVE).setOnClickListener(v -> {
                String ep = endpoint.getText().toString().trim();
                String q = question.getText().toString().trim();
                if (ep.isEmpty()) {
                    answer.setText("AI sunucu adresi tanımlanmadı. Kurumsal HTTPS proxy adresini girin.");
                    return;
                }
                if (!ep.startsWith("https://")) {
                    answer.setText("Güvenlik nedeniyle AI sunucu adresi HTTPS olmalıdır.");
                    return;
                }
                if (q.isEmpty()) {
                    answer.setText("Önce bir soru yazın.");
                    return;
                }
                prefs.edit().putString("ai_endpoint", ep).apply();
                answer.setText("Yanıt hazırlanıyor…");
                askAi(ep, q, answer);
            }));
            dialog.show();
        });
    }

    private void askAi(String endpoint, String question, TextView answerView) {
        new Thread(() -> {
            HttpURLConnection connection = null;
            try {
                URL url = new URL(endpoint);
                connection = (HttpURLConnection) url.openConnection();
                connection.setRequestMethod("POST");
                connection.setConnectTimeout(20000);
                connection.setReadTimeout(90000);
                connection.setDoOutput(true);
                connection.setRequestProperty("Content-Type", "application/json; charset=utf-8");
                connection.setRequestProperty("Accept", "application/json");
                connection.setRequestProperty("Cache-Control", "no-store");

                JSONObject payload = new JSONObject();
                payload.put("question", question);
                payload.put("context", aiContext());
                payload.put("client", "KHSL KYS Mobil · Korunan Ana Arayüz");

                byte[] bytes = payload.toString().getBytes(StandardCharsets.UTF_8);
                try (OutputStream out = connection.getOutputStream()) {
                    out.write(bytes);
                }

                int status = connection.getResponseCode();
                InputStream stream = status >= 200 && status < 300
                        ? connection.getInputStream() : connection.getErrorStream();
                String body = readAll(stream);
                JSONObject response = body.isEmpty() ? new JSONObject() : new JSONObject(body);
                String answer = status >= 200 && status < 300
                        ? response.optString("answer", "")
                        : response.optString("detail", response.optString("error", "HTTP " + status));
                if (answer.isEmpty()) answer = "AI sunucusu boş yanıt döndürdü.";
                String finalAnswer = answer;
                runOnUiThread(() -> answerView.setText(finalAnswer));
            } catch (Exception e) {
                String msg = e.getMessage() == null ? e.getClass().getSimpleName() : e.getMessage();
                runOnUiThread(() -> answerView.setText("AI bağlantı hatası: " + msg));
            } finally {
                if (connection != null) connection.disconnect();
            }
        }).start();
    }

    private String aiContext() {
        StringBuilder sb = new StringBuilder();
        sb.append("Konya Halk Sağlığı Laboratuvarı Kalite Yönetim Sistemi. ");
        sb.append("Uygulamanın amacı kalite yöneticisinin doküman, risk, denetim, eğitim ve faaliyet süreçlerini bütünleşik izlemesidir. ");
        sb.append("Kontrollü Google Drive/KYS nüshaları tekil doğruluk kaynağıdır. Prosedürde bulunmayan kavram veya kategori uydurma. ");
        sb.append("Objektif delil dilinde gerektiğinde görüldü, incelendi, tespit edildi ifadelerini kullan. Prosedürler: ");
        for (String[] p : PROCEDURES) sb.append(p[0]).append(' ').append(p[1]).append("; ");
        sb.append("P.15 kayıtların oluşturulması, izlenebilirliği, erişim kontrolü, yedekleme, veri bütünlüğü, arşiv ve imha süreçlerini kapsar.");
        return sb.toString();
    }

    private String readAll(InputStream input) throws Exception {
        if (input == null) return "";
        StringBuilder sb = new StringBuilder();
        try (BufferedReader r = new BufferedReader(new InputStreamReader(input, StandardCharsets.UTF_8))) {
            String line;
            while ((line = r.readLine()) != null) sb.append(line).append('\n');
        }
        return sb.toString().trim();
    }

    private int dp(int v) {
        return Math.round(v * getResources().getDisplayMetrics().density);
    }

    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) webView.goBack();
        else super.onBackPressed();
    }

    private final class Bridge {
        private final Context context;
        Bridge(Context context) { this.context = context; }

        @JavascriptInterface
        public void openAi() { showAiDialog(); }

        @JavascriptInterface
        public void showProcedureCatalog() { MainActivity.this.showProcedureCatalog(); }
    }
}
