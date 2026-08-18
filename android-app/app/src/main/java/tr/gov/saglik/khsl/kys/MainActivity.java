package tr.gov.saglik.khsl.kys;

import android.app.*;
import android.content.*;
import android.graphics.*;
import android.graphics.drawable.GradientDrawable;
import android.net.Uri;
import android.os.Bundle;
import android.text.InputType;
import android.view.*;
import android.widget.*;
import java.util.*;

public class MainActivity extends Activity {
    static class Module {
        final String code,title,rev,driveId,r1,r2; final int docs,records;
        Module(String c,String t,String r,String d,int ds,int rs,String a,String b){code=c;title=t;rev=r;driveId=d;docs=ds;records=rs;r1=a;r2=b;}
    }
    private final Module[] modules = new Module[]{
        new Module("P.01","Tarafsızlık ve Gizlilik Prosedürü","02","1lipQorpr3ubsTOFwyJUSUJHveB11NJT3",13,1,"Tarafsızlık ve gizlilik tüm laboratuvar faaliyetlerinde uygulanır.","Tarafsızlık riskleri YGG ve önemli süreç değişikliklerinde yeniden değerlendirilir."),
        new Module("P.02","Personel Yönetimi ve Eğitimi Prosedürü","02","1tHTBAbfsn_QB0XbY9Yiu61B6ODaThS1P",9,2,"Yetkinlik; eğitim, uygulama, gözlem, teknik kayıt ve kalite kontrol delilleriyle değerlendirilir.","Eğitim başarısı tek başına teknik yetkilendirme anlamına gelmez."),
        new Module("P.05","Satın Alma Prosedürü","04","1GkjUzYEmqDC09z5SzCHpWxfehc8mq0ao",5,2,"Satın alma ihtiyacı kayıtlı talep ve gerektiğinde teknik şartname ile yürütülür.","Tedarikçiler yıllık değerlendirilir ve onaylı tedarikçi statüsü izlenir."),
        new Module("P.06","Taleplerin, Tekliflerin ve Sözleşmelerin Gözden Geçirilmesi Prosedürü","03","1J8KOqDOMnWnxtToH3bTxQW6R08EexLXQ",7,1,"Deney talebi işe başlamadan şartlar, kaynak, yeterlilik ve metot açısından gözden geçirilir.","Uygunluk beyanı varsa şartname ve karar kuralı sözleşmede açıkça tanımlanır."),
        new Module("P.10","Kalite Kontrol Prosedürü","02","1P124N40iF9X7Ui-T1FqVg8uXeRc2zpJl",5,1,"İç kalite kontrol faaliyetleri planlanır ve sonuçların geçerliliği eğilimlerle izlenir.","Kontrol kartlarında limit yanında eğilim ve kayma kuralları değerlendirilir."),
        new Module("P.11","Rapor Yönetimi Prosedürü","04","10j9GvDHCeRhiPywKlFidgFuq2IDnupgW",6,1,"Raporlar doğru, açık, tarafsız, izlenebilir ve zamanında hazırlanır.","Akredite ve kapsam dışı sonuçlar raporda açıkça ayrılır."),
        new Module("P.13","Uygun Olmayan Deney İşinin Kontrolü Prosedürü","01","1YTFUZhpCbWXWvk5x6HwHSSQV93kr0o4z",5,2,"UODİ kaynakları teknik ve yönetim süreçlerinin tamamından gelebilir.","UODİ kayıtları yıl/sıra mantığıyla numaralandırılır ve takip listesinde izlenir."),
        new Module("P.14","Doküman Hazırlama ve Kontrolü Prosedürü","04","1_khG2htr5OQiH1joaNdX0ZHJ8EkH_BdY",5,2,"KYS dokümanları kod, revizyon, onay, dağıtım ve geçersiz nüsha kontrolüyle yönetilir.","Form, liste, plan, talimat ve rapor formatları P.14’e göre kontrol edilir."),
        new Module("P.15","Kayıtların Kontrolü Prosedürü","03","1WODjjrEkBNC7PdnnNv_BLA9nrulfsRlq",6,3,"Teknik ve kalite kayıtları yapıldıkları anda oluşturulur ve personele izlenebilir bağlanır.","Elektronik değişiklikler audit trail/log ile izlenebilir; yedekleme ve geri yükleme testleri kayıt altına alınır."),
        new Module("P.16","Risk ve Fırsatların Yönetimi Prosedürü","02","1s91p7XMvX9ozNOCRJaRWD8IqI87v3cGY",5,3,"Risk ve fırsatlar en az 12 ayda bir ve önemli değişikliklerde yeniden değerlendirilir.","Riskler 5x5 yaklaşımıyla değerlendirilir ve risk cevabı kayıt altına alınır."),
        new Module("P.17","Düzeltici Faaliyet Prosedürü","03","1JC87K34h6XXR0BgQxZ8ezxdj5E1gRYVA",7,2,"DF zinciri uygunsuzluk, kaplam, kök neden, faaliyet, delil, risk güncellemesi ve etkinlikten oluşur.","Kaplam analizi benzer süreç, cihaz, metot, personel ve kayıtları kapsar."),
        new Module("P.19","İç Tetkik Prosedürü","02","1UyODRo9GP2D9dICo9AHPZivQZP9b1dUQ",5,2,"KYS ve teknik faaliyetler risk temelli olarak en az yılda bir tetkik edilir.","Tetkikçi kendi faaliyet veya sorumluluk alanını tetkik edemez."),
        new Module("P.20","Yönetimin Gözden Geçirmesi Prosedürü","01","1Tr_OZGFcpMqQLhEixuqGsms6wBcnHJAz",4,3,"YGG en az 12 ayda bir yapılır ve performans girdileri önceden hazırlanır.","DF, risk, kalite kontrol, tetkik ve geri bildirimler YGG girdisi olarak değerlendirilir.")
    };
    private int dp; private LinearLayout list; private EditText search;

    @Override public void onCreate(Bundle b){super.onCreate(b);dp=(int)getResources().getDisplayMetrics().density;setContentView(mainView());render("");}
    private View mainView(){
        LinearLayout root=v(); root.setBackgroundColor(Color.rgb(246,248,247));
        LinearLayout head=v(); head.setPadding(20*dp,22*dp,20*dp,16*dp); head.setBackgroundColor(Color.WHITE);
        head.addView(txt("KHSL KYS Mobil",25,true,Color.rgb(24,54,46)));
        TextView s=txt("Google Drive SSOT • TS EN ISO/IEC 17025 kontrol merkezi",13,false,Color.DKGRAY);s.setPadding(0,4*dp,0,0);head.addView(s);
        TextView st=txt("13 prosedür entegre • P.15 + AI Asistan aktif",12,true,Color.rgb(31,92,74));st.setPadding(0,10*dp,0,0);head.addView(st);root.addView(head);
        LinearLayout body=v(); body.setPadding(14*dp,14*dp,14*dp,28*dp);
        search=new EditText(this);search.setHint("Prosedür ara");search.setSingleLine(true);search.setInputType(InputType.TYPE_CLASS_TEXT);search.setPadding(14*dp,12*dp,14*dp,12*dp);search.setBackground(round(Color.WHITE,Color.rgb(216,223,220),12));
        search.addTextChangedListener(new android.text.TextWatcher(){public void beforeTextChanged(CharSequence x,int a,int c,int d){} public void onTextChanged(CharSequence x,int a,int b,int c){render(x.toString());} public void afterTextChanged(android.text.Editable e){}});body.addView(search);
        Button ai=btn("AI KYS Asistanı"); ai.setOnClickListener(x->aiDialog()); LinearLayout.LayoutParams alp=lp();alp.topMargin=10*dp;body.addView(ai,alp);
        list=v(); LinearLayout.LayoutParams llp=lp();llp.topMargin=12*dp;body.addView(list,llp);
        ScrollView sc=new ScrollView(this);sc.addView(body);root.addView(sc,new LinearLayout.LayoutParams(-1,0,1));return root;
    }
    private void render(String q){if(list==null)return;list.removeAllViews();String x=q.trim().toLowerCase(new Locale("tr","TR"));for(Module m:modules){String hay=(m.code+" "+m.title+" "+m.r1+" "+m.r2).toLowerCase(new Locale("tr","TR"));if(x.isEmpty()||hay.contains(x))list.addView(card(m));}}
    private View card(Module m){LinearLayout c=v();c.setPadding(16*dp,15*dp,16*dp,14*dp);c.setBackground(round(Color.WHITE,Color.rgb(224,230,227),14));LinearLayout.LayoutParams cp=lp();cp.bottomMargin=10*dp;c.setLayoutParams(cp);
        LinearLayout r=h();r.addView(txt(m.code,17,true,Color.rgb(31,92,74)),new LinearLayout.LayoutParams(0,-2,1));r.addView(txt("Rev."+m.rev,12,true,Color.GRAY));c.addView(r);
        TextView t=txt(m.title,16,true,Color.rgb(34,42,39));t.setPadding(0,5*dp,0,6*dp);c.addView(t);c.addView(txt(m.docs+" alt doküman • "+m.records+" güncel/dolu kayıt",12,false,Color.DKGRAY));
        LinearLayout a=h();a.setPadding(0,10*dp,0,0);Button o=btn("Prosedürü Aç");o.setOnClickListener(v->open(m.driveId));a.addView(o,new LinearLayout.LayoutParams(0,44*dp,1));Button d=btn("Detaylar");d.setOnClickListener(v->detail(m));LinearLayout.LayoutParams dl=new LinearLayout.LayoutParams(0,44*dp,1);dl.leftMargin=8*dp;a.addView(d,dl);c.addView(a);return c;}
    private void detail(Module m){LinearLayout b=v();b.setPadding(18*dp,8*dp,18*dp,18*dp);b.addView(txt("İş Kuralları",15,true,Color.rgb(24,54,46)));TextView r1=txt("• "+m.r1,13,false,Color.DKGRAY);r1.setPadding(0,8*dp,0,6*dp);b.addView(r1);b.addView(txt("• "+m.r2,13,false,Color.DKGRAY));TextView c=txt("Alt doküman: "+m.docs+"  •  Güncel/dolu kayıt: "+m.records+"\nKontrollü içerik Google Drive SSOT üzerinden açılır.",13,true,Color.rgb(31,92,74));c.setPadding(0,14*dp,0,0);b.addView(c);new AlertDialog.Builder(this).setTitle(m.code+"  "+m.title).setView(b).setPositiveButton("Kapat",null).show();}
    private void aiDialog(){SharedPreferences p=getSharedPreferences("kys_ai",MODE_PRIVATE);LinearLayout b=v();b.setPadding(18*dp,8*dp,18*dp,18*dp);TextView status=txt("",11,true,Color.GRAY);refresh(status,p);b.addView(status);Button cfg=btn("AI Sunucu Ayarı");cfg.setOnClickListener(v->config(status,p));b.addView(cfg);EditText q=new EditText(this);q.setHint("Örn: P.15 kayıt kontrolünde hangi objektif delilleri aramalıyım?");q.setMinLines(3);q.setGravity(Gravity.TOP);q.setInputType(InputType.TYPE_CLASS_TEXT|InputType.TYPE_TEXT_FLAG_MULTI_LINE);LinearLayout.LayoutParams ql=lp();ql.topMargin=10*dp;b.addView(q,ql);Button ask=btn("KYS Asistanına Sor");b.addView(ask);TextView ans=txt("",13,false,Color.DKGRAY);ans.setTextIsSelectable(true);ans.setPadding(0,10*dp,0,0);b.addView(ans);ask.setOnClickListener(v->{String qq=q.getText().toString().trim();if(qq.isEmpty())return;String ep=p.getString("proxy_url","").trim();if(ep.isEmpty()){ans.setText("AI için kurumca yönetilen HTTPS proxy adresi tanımlanmalıdır.\n\nYerel eşleşme: "+localMatch(qq));return;}ask.setEnabled(false);ans.setText("Analiz ediliyor…");AiAssistantClient.ask(ep,qq,context(),new AiAssistantClient.Callback(){public void onSuccess(String a){runOnUiThread(()->{ask.setEnabled(true);ans.setText(a);});}public void onError(String e){runOnUiThread(()->{ask.setEnabled(true);ans.setText("AI bağlantı hatası: "+e+"\n\n"+localMatch(qq));});}});});ScrollView sc=new ScrollView(this);sc.addView(b);new AlertDialog.Builder(this).setTitle("AI KYS Asistanı").setView(sc).setPositiveButton("Kapat",null).show();}
    private void config(TextView s,SharedPreferences p){EditText i=new EditText(this);i.setHint("https://kurum-sunucusu/api/kys-assistant");i.setText(p.getString("proxy_url",""));AlertDialog d=new AlertDialog.Builder(this).setTitle("AI Proxy Adresi").setView(i).setNegativeButton("İptal",null).setPositiveButton("Kaydet",null).create();d.setOnShowListener(x->d.getButton(AlertDialog.BUTTON_POSITIVE).setOnClickListener(v->{String z=i.getText().toString().trim();if(!z.startsWith("https://")){i.setError("HTTPS gerekli");return;}p.edit().putString("proxy_url",z).apply();refresh(s,p);d.dismiss();}));d.show();}
    private void refresh(TextView s,SharedPreferences p){String e=p.getString("proxy_url","").trim();s.setText(e.isEmpty()?"AI bağlantısı: yapılandırılmadı":"AI bağlantısı: "+e);}
    private String context(){StringBuilder s=new StringBuilder("KHSL KYS; Drive SSOT. Prosedürler:\n");for(Module m:modules)s.append(m.code).append(' ').append(m.title).append(" Rev.").append(m.rev).append(" — ").append(m.r1).append(' ').append(m.r2).append('\n');return s.toString();}
    private String localMatch(String q){String x=q.toLowerCase(new Locale("tr","TR"));for(Module m:modules){String h=(m.code+" "+m.title+" "+m.r1+" "+m.r2).toLowerCase(new Locale("tr","TR"));for(String z:x.split("\\s+"))if(z.length()>3&&h.contains(z))return m.code+" — "+m.title+"\n• "+m.r1+"\n• "+m.r2;}return "Doğrudan eşleşme bulunamadı.";}
    private void open(String id){startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse("https://drive.google.com/open?id="+Uri.encode(id))));}
    private TextView txt(String s,int sp,boolean bold,int color){TextView t=new TextView(this);t.setText(s);t.setTextSize(sp);t.setTextColor(color);if(bold)t.setTypeface(android.graphics.Typeface.DEFAULT,android.graphics.Typeface.BOLD);return t;}
    private Button btn(String s){Button b=new Button(this);b.setText(s);b.setAllCaps(false);return b;} private LinearLayout v(){LinearLayout l=new LinearLayout(this);l.setOrientation(LinearLayout.VERTICAL);return l;} private LinearLayout h(){LinearLayout l=new LinearLayout(this);l.setOrientation(LinearLayout.HORIZONTAL);l.setGravity(Gravity.CENTER_VERTICAL);return l;} private LinearLayout.LayoutParams lp(){return new LinearLayout.LayoutParams(-1,-2);} private GradientDrawable round(int fill,int stroke,int r){GradientDrawable g=new GradientDrawable();g.setColor(fill);g.setCornerRadius(r*dp);g.setStroke(dp,stroke);return g;}
}
