(() => {
  "use strict";

  const DRIVE = {
    root: "1tp5TyoUbAt0kpDlCr0cREkffzL1JAbs8",
    documents: "1S-4FCSwuWvva3tbj0Lo2WyMg8s4EEo6B",
    forms: "1sIfSxMzAUN7GB4asohGq8TCovYU6zZOx",
    ssot: "1p6hSQgGNS6idlngBtGWKbzrZaiJ8bKJY",
    ssotMirror: "1BSVV2l9nbfHbClISZ93rgP6H9uHBtVs4",
    uodiDfList: "1msvF0Z0k4Gk0QHJ2uhmFfEh-zx8wY8mH"
  };

  const FORMS = [
    {
      code: "P.14-FR.01", name: "Doküman Değişiklik ve Talep Formu", revision: "Rev.03 / 29.06.2026",
      driveId: "1aszPtThaVNfG9_c90wv6PpNj4DEJh4Cg", signature: true,
      description: "Yeni doküman, revizyon ve iptal taleplerinin kontrollü kaydı. Master dokümanın üzerine yazmaz.",
      sections: [
        {title:"1. Talep ve Doküman Bilgileri", fields:[
          {key:"talepEden",label:"Talep Eden / Unvan",type:"text",required:true},
          {key:"birim",label:"Birim",type:"text",required:true},
          {key:"talepTarihi",label:"Talep Tarihi",type:"date",required:true},
          {key:"talepTuru",label:"Talep Türü",type:"select",required:true,options:["Yeni Doküman","Revizyon","İptal"]},
          {key:"dokumanKodu",label:"Doküman Kodu",type:"text",required:true},
          {key:"dokumanAdi",label:"Doküman Adı",type:"text",required:true},
          {key:"mevcutRevizyon",label:"Mevcut Revizyon Tarih / No",type:"text"}
        ]},
        {title:"2. Değişiklik / Talep Detayı", fields:[
          {key:"talepGerekcesi",label:"Talep Gerekçesi",type:"textarea",required:true},
          {key:"etkilenenBolum",label:"Etkilenen Bölüm / Madde / Sayfa",type:"textarea"},
          {key:"mevcutDurum",label:"Mevcut Durum",type:"textarea",required:true},
          {key:"yeniDurum",label:"Talep Edilen Yeni Durum",type:"textarea",required:true}
        ]},
        {title:"İlgili Birim Sorumlusu Değerlendirmesi", fields:[
          {key:"birimKarari",label:"Değerlendirme",type:"select",options:["Değerlendirilmedi","Uygun","Uygun Değil"]},
          {key:"birimSorumlusu",label:"Adı Soyadı",type:"text"},
          {key:"birimDegerlendirmeTarihi",label:"Tarih",type:"date"}
        ]},
        {title:"3. Karar ve Yeni Revizyon Bilgileri", fields:[
          {key:"karar",label:"Karar",type:"select",options:["Değerlendirmede","Kabul Edildi","Düzeltme Gerekli","Reddedildi"]},
          {key:"kararTarihi",label:"Karar Tarihi",type:"date"},
          {key:"yeniRevizyon",label:"Yeni Revizyon No / Tarih",type:"text"}
        ]},
        {title:"4. Bildirim", fields:[
          {key:"bildirimYontemi",label:"Bildirim Yöntemi",type:"text",value:"KYS Doküman Bildirim WhatsApp (WP) grubu"},
          {key:"bildirimTarihi",label:"Bildirim Tarihi",type:"date"}
        ]}
      ]
    },
    {
      code:"P.13-FR.01", name:"Uygunsuzluk Formu", revision:"Rev.02", driveId:"1_VG1RngvwFrbOzAlELwUd5CUu90PN8KL",
      signature:true, description:"Uygun olmayan işin/uygunsuzluğun kaydı ve takip sürecine bağlanması.",
      sections:[{title:"Uygunsuzluk Kaydı",fields:[
        {key:"uodiNo",label:"UODİ / Uygunsuzluk No",type:"text",required:true},
        {key:"tespitTarihi",label:"Tespit Tarihi",type:"date",required:true},
        {key:"tespitEden",label:"Tespit Eden",type:"text",required:true},
        {key:"birimSurec",label:"Birim / Süreç",type:"text"},
        {key:"kaynak",label:"Kaynak",type:"select",options:["İç Tetkik","Dış Denetim","Müşteri Şikâyeti","Dış Yeterlilik","Kalite Kontrol","Personel Bildirimi","Diğer"]},
        {key:"uygunsuzlukTanimi",label:"Uygunsuzluk Tanımı",type:"textarea",required:true},
        {key:"acilOnlem",label:"Alınan Acil Önlem / Düzeltme",type:"textarea"},
        {key:"etkilenenSonuclar",label:"Etkilenen Sonuç / Kapsam",type:"textarea"},
        {key:"dfGerekli",label:"Düzeltici Faaliyet Gerekli",type:"boolean"},
        {key:"ilgiliDf",label:"İlgili DF Numarası",type:"text"},
        {key:"degerlendirme",label:"Değerlendirme",type:"textarea"}
      ]}]
    },
    {
      code:"P.17-FR.01", name:"Düzeltici Faaliyet Formu", revision:"KYS güncel nüsha esas", driveId:null,
      signature:true, description:"Uygunsuzluk nedeninin giderilmesi, tekrarın önlenmesi ve etkinlik değerlendirmesinin kaydı.",
      sections:[
        {title:"Tanımlama",fields:[
          {key:"dfNo",label:"DF Numarası",type:"text",required:true},
          {key:"tespitTarihi",label:"Tespit Tarihi",type:"date",required:true},
          {key:"kaynak",label:"Kaynak",type:"select",options:["İç Tetkik","Dış Denetim","Müşteri Şikâyeti","Dış Yeterlilik","Kalite Kontrol","Personel Bildirimi","Diğer"]},
          {key:"uygunsuzluk",label:"Uygunsuzluk / Problem Tanımı",type:"textarea",required:true},
          {key:"kapsam",label:"Kapsam ve Yayılım",type:"textarea"}
        ]},
        {title:"Kök Neden ve Faaliyet",fields:[
          {key:"kokNeden",label:"Kök Neden",type:"textarea",required:true},
          {key:"planlanan",label:"Planlanan Faaliyetler",type:"textarea",required:true},
          {key:"sorumlu",label:"Sorumlu",type:"text",required:true},
          {key:"termin",label:"Termin Tarihi",type:"date",required:true},
          {key:"gerceklesen",label:"Gerçekleşen Faaliyetler",type:"textarea"}
        ]},
        {title:"Etkinlik ve Kapanış",fields:[
          {key:"etkinlikOlcutu",label:"Etkinlik Ölçütü",type:"textarea",required:true},
          {key:"etkinlikSonucu",label:"Etkinlik Sonucu",type:"textarea"},
          {key:"riskBaglantisi",label:"İlişkili Risk / Risk Değerlendirmesi",type:"text"},
          {key:"durum",label:"Durum",type:"select",options:["Açık","Faaliyet Planlandı","Uygulamada","Etkinlik Bekliyor","Kapanış Bekliyor","Kapalı"]}
        ]}
      ]
    },
    {
      code:"P.16-FR.01", name:"Risk Analiz Formu", revision:"Rev.01 / Gün.12 / 11.07.2026",
      driveId:"1H1_MbFdtDqKyU1zKPFuJIjTaxXd8MzmZ", signature:false,
      description:"Risk/fırsat, mevcut kontroller, faaliyet ve faaliyet sonrası değerlendirme kaydı.",
      sections:[
        {title:"Risk Tanımı",fields:[
          {key:"riskKodu",label:"Risk Kodu",type:"text",required:true},
          {key:"surec",label:"Süreç",type:"text",required:true},
          {key:"riskTanimi",label:"Risk Tanımı",type:"textarea",required:true},
          {key:"neden",label:"Neden",type:"textarea"},
          {key:"olasiEtki",label:"Olası Etkiler",type:"textarea"},
          {key:"mevcutKontrol",label:"Mevcut Kontroller",type:"textarea",required:true}
        ]},
        {title:"Başlangıç Risk Düzeyi",fields:[
          {key:"olasilik",label:"Olasılık",type:"number",min:1,max:5,required:true},
          {key:"etki",label:"Etki",type:"number",min:1,max:5,required:true},
          {key:"puan",label:"Risk Puanı (otomatik)",type:"computed"}
        ]},
        {title:"Faaliyet ve İzleme",fields:[
          {key:"faaliyet",label:"Planlanan Faaliyet",type:"textarea"},
          {key:"sorumlu",label:"Birincil Sorumlu",type:"text"},
          {key:"termin",label:"Termin / Periyot",type:"text"},
          {key:"basari",label:"Başarı Göstergesi",type:"textarea"},
          {key:"sonOlasilik",label:"Faaliyet Sonrası Olasılık",type:"number",min:1,max:5},
          {key:"sonEtki",label:"Faaliyet Sonrası Etki",type:"number",min:1,max:5},
          {key:"sonPuan",label:"Faaliyet Sonrası Puan (otomatik)",type:"computed"},
          {key:"izleme",label:"İzleme Sonucu",type:"textarea"}
        ]}
      ]
    },
    {
      code:"P.18-FR.01", name:"İç Yazışma Formu", revision:"Rev.00", driveId:"1x5GKExd9Ypqo5xs4UtDmbN4r888_2UPP",
      signature:true, description:"KYS kapsamında izlenebilir iç yazışma kaydı.",
      sections:[{title:"Yazışma Bilgileri",fields:[
        {key:"tarih",label:"Tarih",type:"date",required:true},
        {key:"sayi",label:"Sayı",type:"text"},
        {key:"gonderen",label:"Gönderen Birim / Kişi",type:"text",required:true},
        {key:"alici",label:"Alıcı Birim / Kişi",type:"text",required:true},
        {key:"konu",label:"Konu",type:"text",required:true},
        {key:"metin",label:"Yazı Metni",type:"textarea",required:true},
        {key:"ekler",label:"Ekler",type:"textarea"},
        {key:"imzalayan",label:"İmzalayan",type:"text"}
      ]}]
    }
  ];

  const OTHER_FORMS = [
    ["P.10-FR.03","Laboratuvar İçi Personel Karşılaştırma Formu","1Hv1uZWbXIJulTbksLWceU3OhsEjwIJwV","00"],
    ["P.10-FR.04","Kalite Kontrol Verileri İzleme Formu","1cImc_D9KMl0j8LN-Db6Z9Z8XRQ29UidW","00"],
    ["P.10-FR.05","YT/LAK Değerlendirme Formu","1Hnd3EwzMWbAfDq7EgqW_N-pThBIj2kMx","00"],
    ["P.19-FR.01","Objektif Delil Kayıt Formu",null,"02"],
    ["P.20-FR.02","Kalite Hedefleri Formu",null,null]
  ];

  const DOCUMENTS = [
    {code:"KEK",name:"Kalite El Kitabı",type:"El Kitabı",status:"current",rev:"Rev.05",driveId:"1hOLKLOse0lENpWDgCKByHUAhekffUqpp"},
    {code:"P.01",name:"Tarafsızlık ve Gizlilik Prosedürü",type:"Prosedür",status:"current",rev:"KYS güncel nüsha",driveId:null},
    {code:"P.02",name:"Personel Prosedürü",type:"Prosedür",status:"current",rev:"KYS güncel nüsha",driveId:"1BuKdnQzv02CAqm4vhaBVFOHl0KCQvSnE"},
    {code:"P.06",name:"Metotların Seçimi, Doğrulanması ve Geçerli Kılınması Prosedürü",type:"Prosedür",status:"current",rev:"Rev.06",driveId:"1jqZ4Ikh6Jf4NArYE5JIbu55EUFkLU8SQ"},
    {code:"P.10",name:"Sonuçların Geçerliliğinin Güvence Altına Alınması Prosedürü",type:"Prosedür",status:"current",rev:"KYS güncel nüsha",driveId:"1Or7D7VzdxTIJXpEFBG3TyCN8TQdHofJ4"},
    {code:"P.13",name:"Uygun Olmayan Deney İşinin Kontrolü Prosedürü",type:"Prosedür",status:"current",rev:"KYS güncel nüsha",driveId:"1Me1UiyAQXnaocIIEZuQaAb4rJa-YDTTj"},
    {code:"P.13-FR.01",name:"Uygunsuzluk Formu",type:"Form",status:"current",rev:"Rev.02",driveId:"1_VG1RngvwFrbOzAlELwUd5CUu90PN8KL"},
    {code:"P.14",name:"Dokümanların Kontrolü Prosedürü",type:"Prosedür",status:"current",rev:"KYS güncel nüsha",driveId:"1_khAxyMSe2DXPZp06nzIaJrh9zQ3xv1f"},
    {code:"P.14-FR.01",name:"Doküman Değişiklik ve Talep Formu",type:"Form",status:"current",rev:"Rev.03",driveId:"1aszPtThaVNfG9_c90wv6PpNj4DEJh4Cg"},
    {code:"P.14-LS.01",name:"Güncel Doküman Listesi",type:"Liste",status:"current",rev:"SSOT",driveId:DRIVE.ssot},
    {code:"P.16",name:"Risk ve Fırsatların Yönetimi Prosedürü",type:"Prosedür",status:"current",rev:"KYS güncel nüsha",driveId:"1KcgbqT3nGQBK1mGgX5PpjJOgyUI4QZzl"},
    {code:"P.16-FR.01",name:"Risk Analiz Formu",type:"Form",status:"current",rev:"Rev.01 / Gün.12",driveId:"1H1_MbFdtDqKyU1zKPFuJIjTaxXd8MzmZ"},
    {code:"P.17",name:"Düzeltici Faaliyet Prosedürü",type:"Prosedür",status:"current",rev:"KYS güncel nüsha",driveId:"1JC7g8ogYlfcegXzYjRDlUfwDjRNje0dU"},
    {code:"P.17-FR.01",name:"Düzeltici Faaliyet Formu",type:"Form",status:"current",rev:"KYS güncel nüsha",driveId:null},
    {code:"P.18-FR.01",name:"İç Yazışma Formu",type:"Form",status:"current",rev:"Rev.00",driveId:"1x5GKExd9Ypqo5xs4UtDmbN4r888_2UPP"},
    {code:"P.19",name:"İç Tetkik Prosedürü",type:"Prosedür",status:"current",rev:"KYS güncel nüsha",driveId:null}
  ];

  const state = {screen:"home",scanPages:[],formAttachments:[],currentForm:null,currentDraftId:null,signatureData:null,cropIndex:null,accessToken:null,pendingDriveAction:null};
  const $ = (id) => document.getElementById(id);
  const esc = (value="") => String(value).replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[ch]));
  const todayIso = () => new Date().toISOString().slice(0,10);
  const stamp = () => new Date().toLocaleString("tr-TR",{dateStyle:"short",timeStyle:"short"});
  const driveUrl = id => `https://drive.google.com/open?id=${encodeURIComponent(id)}`;
  function getJSON(key,fallback){try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}}
  function setJSON(key,value){localStorage.setItem(key,JSON.stringify(value))}
  function toast(message,timeout=3200){const el=$("toast");el.textContent=message;el.hidden=false;clearTimeout(toast._timer);toast._timer=setTimeout(()=>el.hidden=true,timeout)}
  function logActivity(action,detail,status="ok"){const rows=getJSON("khsl.activity",[]);rows.unshift({action,detail,status,time:stamp()});setJSON("khsl.activity",rows.slice(0,20));renderHome()}
  function settings(){return {mode:localStorage.getItem("khsl.drive.mode")||"oauth",clientId:localStorage.getItem("khsl.drive.clientId")||"",scriptUrl:localStorage.getItem("khsl.drive.scriptUrl")||"",scriptKey:localStorage.getItem("khsl.drive.scriptKey")||"",documentFolderId:localStorage.getItem("khsl.drive.documentFolderId")||DRIVE.documents,formFolderId:localStorage.getItem("khsl.drive.formFolderId")||DRIVE.forms}}
  function isConfigured(){const s=settings();return s.mode==="appsScript"?Boolean(s.scriptUrl&&s.scriptKey):Boolean(s.clientId)}

  function showScreen(name){state.screen=name;document.querySelectorAll(".screen").forEach(el=>el.classList.toggle("active",el.dataset.screen===name));document.querySelectorAll(".nav-item").forEach(el=>el.classList.toggle("active",el.dataset.go===name||(name==="form-fill"&&el.dataset.go==="forms")));window.scrollTo({top:0,behavior:"smooth"});if(name==="home")renderHome();if(name==="forms")renderForms();if(name==="documents")renderDocuments()}
  function renderHome(){const drafts=getJSON("khsl.drafts",[]),uploads=getJSON("khsl.uploads",[]);$("draftCount").textContent=drafts.length;$("draftBadge").textContent=drafts.length;$("uploadCount").textContent=uploads.length;const s=settings();$("driveState").textContent=isConfigured()?"Hazır":"Bağlı değil";$("driveStateDetail").textContent=isConfigured()?(s.mode==="appsScript"?"Apps Script köprüsü yapılandırıldı":(state.accessToken?"Google Drive yetkisi aktif":"OAuth ayarlı; yetki bekliyor")):"Ayarlar’dan bağlantıyı yapılandırın";const banner=$("connectionBanner");banner.hidden=isConfigured();banner.textContent="Drive bağlantısı yapılandırılmadı. Kayıtlar yanlışlıkla yüklendi olarak işaretlenmez.";const activity=getJSON("khsl.activity",[]);$("recentActivity").innerHTML=activity.length?activity.slice(0,8).map(x=>`<div class="activity-item"><span class="activity-dot"></span><div><strong>${esc(x.action)}</strong><small>${esc(x.detail)} · ${esc(x.time)}</small></div></div>`).join(""):`<div class="empty-inline">Henüz işlem kaydı yok.</div>`;populateScanFormLinks()}

  function fileToDataUrl(file){return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(file)})}
  async function readFiles(files){for(const file of [...files].filter(f=>f.type.startsWith("image/"))){state.scanPages.push({id:crypto.randomUUID(),dataUrl:await fileToDataUrl(file),name:file.name})}renderScanPages()}
  function renderScanPages(){$("scanEmpty").hidden=state.scanPages.length>0;$("scanPages").innerHTML=state.scanPages.map((p,i)=>`<article class="scan-page"><header><span>Sayfa ${i+1}</span><span>${esc(p.name||"Kamera")}</span></header><img src="${p.dataUrl}" alt="Belge sayfası ${i+1}"><div class="scan-tools"><button type="button" data-rotate="${i}">Döndür</button><button type="button" data-crop="${i}">Kırp</button><button type="button" data-remove-page="${i}">Sil</button></div></article>`).join("");const ready=state.scanPages.length>0;$("scanPreviewButton").disabled=!ready;$("scanSaveButton").disabled=!ready;$("scanPdfStatus").className="status-pill "+(ready?"good":"neutral");$("scanPdfStatus").textContent=ready?`${state.scanPages.length} sayfa hazır`:"PDF bekliyor"}
  function loadImage(src){return new Promise((resolve,reject)=>{const i=new Image();i.onload=()=>resolve(i);i.onerror=reject;i.src=src})}
  async function transformImage(index,mode,crop=null){const page=state.scanPages[index];if(!page)return;const img=await loadImage(page.dataUrl),canvas=document.createElement("canvas"),ctx=canvas.getContext("2d");if(mode==="rotate"){canvas.width=img.height;canvas.height=img.width;ctx.translate(canvas.width,0);ctx.rotate(Math.PI/2);ctx.drawImage(img,0,0)}else{const l=Math.round(img.width*(crop.left/100)),r=Math.round(img.width*(crop.right/100)),t=Math.round(img.height*(crop.top/100)),b=Math.round(img.height*(crop.bottom/100)),w=Math.max(40,img.width-l-r),h=Math.max(40,img.height-t-b);canvas.width=w;canvas.height=h;ctx.drawImage(img,l,t,w,h,0,0,w,h)}page.dataUrl=canvas.toDataURL("image/jpeg",.9);renderScanPages()}
  async function imagesToPdfBlob(images){if(!window.jspdf?.jsPDF)throw new Error("PDF bileşeni yüklenemedi. İnternet bağlantısını kontrol edin.");const {jsPDF}=window.jspdf,pdf=new jsPDF({unit:"pt",format:"a4",compress:true}),pw=pdf.internal.pageSize.getWidth(),ph=pdf.internal.pageSize.getHeight();for(let n=0;n<images.length;n++){if(n>0)pdf.addPage();const img=await loadImage(images[n]),scale=Math.min((pw-24)/img.width,(ph-24)/img.height),w=img.width*scale,h=img.height*scale;pdf.addImage(images[n],"JPEG",(pw-w)/2,(ph-h)/2,w,h,undefined,"FAST")}return pdf.output("blob")}

  function formValues(formEl){const out={};formEl.querySelectorAll("[data-field]").forEach(el=>out[el.dataset.field]=el.type==="checkbox"?el.checked:el.value);if(state.currentForm?.code==="P.16-FR.01"){out.puan=(Number(out.olasilik)||0)*(Number(out.etki)||0);out.sonPuan=(Number(out.sonOlasilik)||0)*(Number(out.sonEtki)||0)}return out}
  function validateCurrentForm(){let ok=true,first=null;document.querySelectorAll("#dynamicForm [data-field][required]").forEach(el=>{const invalid=el.type==="checkbox"?!el.checked:!String(el.value||"").trim();el.style.borderColor=invalid?"#b42318":"";if(invalid&&!first)first=el;if(invalid)ok=false});if(!ok){first?.focus();toast("Zorunlu alanları tamamlayın.")}return ok}
  function makeField(field,values={}){const val=values[field.key]??field.value??"",req=field.required?" required":"",label=`<span class="${field.required?"required":""}">${esc(field.label)}</span>`;if(field.type==="textarea")return `<label class="field full">${label}<textarea data-field="${esc(field.key)}" rows="4"${req}>${esc(val)}</textarea></label>`;if(field.type==="select")return `<label class="field">${label}<select data-field="${esc(field.key)}"${req}>${(field.options||[]).map(o=>`<option${String(val)===o?" selected":""}>${esc(o)}</option>`).join("")}</select></label>`;if(field.type==="boolean")return `<label class="checkbox-line"><input type="checkbox" data-field="${esc(field.key)}"${val===true?" checked":""}> ${esc(field.label)}</label>`;if(field.type==="computed")return `<label class="field">${label}<input data-field="${esc(field.key)}" value="${esc(val)}" readonly tabindex="-1"></label>`;const min=field.min!=null?` min="${field.min}"`:"",max=field.max!=null?` max="${field.max}"`:"";return `<label class="field">${label}<input type="${field.type||"text"}" data-field="${esc(field.key)}" value="${esc(val)}"${min}${max}${req}></label>`}
  function renderForm(form,draft=null,prefill=null){state.currentForm=form;state.currentDraftId=draft?.id||null;state.formAttachments=[];state.signatureData=draft?.signature||null;const values={...(draft?.values||{}),...(prefill||{})};$("formHeaderCode").textContent=form.code;$("formRevision").textContent=form.revision||"KYS güncel nüsha";$("formTitle").textContent=form.name;$("formDescription").textContent=form.description;const body=form.sections.map(sec=>`<fieldset class="form-section"><legend>${esc(sec.title)}</legend><div class="field-grid">${sec.fields.map(f=>makeField(f,values)).join("")}</div></fieldset>`).join("");$("dynamicForm").innerHTML=body+`<fieldset class="form-section"><legend>Objektif Delil / Ek</legend><label class="capture-button"><span>📷</span><strong>Kamera ile Kanıt Ekle</strong><small>Fotoğraflar form kaydına eklenir</small><input id="formEvidenceInput" type="file" accept="image/*" capture="environment" multiple hidden></label><div class="attachments" id="formAttachments"></div></fieldset>${form.signature?`<fieldset class="form-section"><legend>İmza / Paraf</legend><div class="signature-wrap"><canvas id="signatureCanvas" width="1000" height="360"></canvas><div class="signature-tools"><button type="button" class="text-button danger" id="signatureClear">Temizle</button></div></div></fieldset>`:""}<div class="notice info">Doldurulan kayıt yeni PDF olarak üretilir. Kontrollü master şablon değiştirilmez.</div><div class="action-row sticky-actions"><button type="button" class="button ghost" id="formDraftSave">Taslak Kaydet</button><button type="button" class="button secondary" id="formPdfPreview">PDF Önizle</button><button type="button" class="button primary" id="formDriveSave">Drive’a Kaydet</button></div>`;$("formEvidenceInput").addEventListener("change",async e=>{for(const f of [...e.target.files].filter(x=>x.type.startsWith("image/")))state.formAttachments.push(await fileToDataUrl(f));renderFormAttachments();e.target.value=""});$("formDraftSave").addEventListener("click",saveDraft);$("formPdfPreview").addEventListener("click",previewFormPdf);$("formDriveSave").addEventListener("click",saveFormToDrive);if(form.signature)initSignaturePad(state.signatureData);$("dynamicForm").addEventListener("input",updateComputedFields);updateComputedFields();showScreen("form-fill")}
  function updateComputedFields(){if(state.currentForm?.code!=="P.16-FR.01")return;const g=k=>document.querySelector(`[data-field="${k}"]`);if(!g("olasilik"))return;g("puan").value=(Number(g("olasilik").value)||0)*(Number(g("etki").value)||0);g("sonPuan").value=(Number(g("sonOlasilik").value)||0)*(Number(g("sonEtki").value)||0)}
  function renderFormAttachments(){$("formAttachments").innerHTML=state.formAttachments.map((src,i)=>`<div class="attachment"><img src="${src}" alt="Kanıt ${i+1}"><button type="button" data-remove-attachment="${i}">×</button></div>`).join("")}
  function initSignaturePad(initial=null){const canvas=$("signatureCanvas"),ctx=canvas.getContext("2d");ctx.lineWidth=4;ctx.lineCap="round";ctx.strokeStyle="#0e2a48";if(initial){const img=new Image();img.onload=()=>ctx.drawImage(img,0,0,canvas.width,canvas.height);img.src=initial}let drawing=false;const point=e=>{const r=canvas.getBoundingClientRect();return{x:(e.clientX-r.left)*canvas.width/r.width,y:(e.clientY-r.top)*canvas.height/r.height}};canvas.onpointerdown=e=>{drawing=true;canvas.setPointerCapture(e.pointerId);const p=point(e);ctx.beginPath();ctx.moveTo(p.x,p.y)};canvas.onpointermove=e=>{if(!drawing)return;const p=point(e);ctx.lineTo(p.x,p.y);ctx.stroke()};canvas.onpointerup=()=>{drawing=false;state.signatureData=canvas.toDataURL("image/png")};$("signatureClear").onclick=()=>{ctx.clearRect(0,0,canvas.width,canvas.height);state.signatureData=null}}
  function saveDraft(){const drafts=getJSON("khsl.drafts",[]),values=formValues($("dynamicForm")),id=state.currentDraftId||crypto.randomUUID(),row={id,formCode:state.currentForm.code,formName:state.currentForm.name,updated:stamp(),values,signature:state.signatureData};const ix=drafts.findIndex(x=>x.id===id);if(ix>=0)drafts[ix]=row;else drafts.unshift(row);setJSON("khsl.drafts",drafts);state.currentDraftId=id;logActivity("Taslak kaydedildi",`${state.currentForm.code} · cihaz içi taslak`);toast("Taslak kaydedildi. Kamera ekleri güvenlik nedeniyle taslağa kalıcı yazılmadı.")}

  async function formPdfBlob(){const form=state.currentForm,values=formValues($("dynamicForm"));if(!window.jspdf?.jsPDF)throw new Error("PDF bileşeni yüklenemedi.");const {jsPDF}=window.jspdf,pdf=new jsPDF({unit:"pt",format:"a4",compress:true}),W=1240,H=1754,MX=78,MAX=W-MX*2;let canvas,ctx,y;const pages=[];const newPage=(withHeader=true)=>{canvas=document.createElement("canvas");canvas.width=W;canvas.height=H;ctx=canvas.getContext("2d");ctx.fillStyle="#fff";ctx.fillRect(0,0,W,H);ctx.fillStyle="#0e2a48";y=86;if(withHeader){ctx.font="700 22px Arial";ctx.fillText("İL SAĞLIK MÜDÜRLÜĞÜ – KONYA HALK SAĞLIĞI LABORATUVARI",MX,y);y+=42;ctx.font="700 31px Arial";ctx.fillText(`${form.code}  ${form.name}`,MX,y);y+=38;ctx.font="400 20px Arial";ctx.fillStyle="#5f7181";ctx.fillText(form.revision||"KYS güncel nüsha",MX,y);y+=26;ctx.strokeStyle="#ced8e0";ctx.beginPath();ctx.moveTo(MX,y);ctx.lineTo(W-MX,y);ctx.stroke();y+=38}};const push=()=>pages.push(canvas.toDataURL("image/jpeg",.9));const ensure=h=>{if(y+h>H-95){push();newPage(false)}};const wrap=(text,width)=>{const words=String(text||"—").split(/\s+/);let line="",out=[];for(const w of words){const t=line?line+" "+w:w;if(ctx.measureText(t).width>width&&line){out.push(line);line=w}else line=t}if(line)out.push(line);return out};newPage(true);for(const sec of form.sections){ensure(60);ctx.fillStyle="#0e2a48";ctx.font="700 23px Arial";ctx.fillText(sec.title,MX,y);y+=38;for(const field of sec.fields){const val=field.type==="boolean"?(values[field.key]?"Evet":"Hayır"):(values[field.key]??"");ensure(70);ctx.fillStyle="#587083";ctx.font="700 17px Arial";ctx.fillText(field.label.toLocaleUpperCase("tr-TR"),MX,y);y+=27;ctx.fillStyle="#172635";ctx.font="400 22px Arial";for(const row of String(val||"—").split("\n").flatMap(part=>wrap(part,MAX))){ensure(31);ctx.fillText(row,MX,y);y+=31}y+=12}}push();for(const img of state.formAttachments)pages.push(img);if(state.signatureData)pages.push(state.signatureData);const pw=pdf.internal.pageSize.getWidth(),ph=pdf.internal.pageSize.getHeight();pages.forEach((src,i)=>{if(i>0)pdf.addPage();pdf.addImage(src,src.startsWith("data:image/png")?"PNG":"JPEG",0,0,pw,ph,undefined,"FAST")});return pdf.output("blob")}
  async function previewFormPdf(){try{const blob=await formPdfBlob();window.open(URL.createObjectURL(blob),"_blank","noopener")}catch(e){toast(e.message||"PDF oluşturulamadı.")}}
  function fileNameSafe(s){return String(s||"KAYIT").replace(/[^\p{L}\p{N}._-]+/gu,"_").replace(/_+/g,"_")}
  async function saveFormToDrive(){if(!validateCurrentForm())return;try{const blob=await formPdfBlob(),code=state.currentForm.code,date=todayIso(),name=`${fileNameSafe(code)}_${date}_${Date.now()}.pdf`,result=await uploadBlob(blob,name,settings().formFolderId,{recordType:"form",formCode:code});if(result.ok){removeCurrentDraft();logActivity("Form Drive’a kaydedildi",`${code} · ${result.name||name}`);state.formAttachments=[];state.signatureData=null;toast("Form kaydı Drive’a yüklendi.");showScreen("forms")}else{logActivity("Form yüklemesi beklemede",`${code} · ${result.error}`,"warn");toast(result.error||"Drive yüklemesi tamamlanmadı.",5000)}}catch(e){toast(e.message||"Kayıt oluşturulamadı.",5000)}}
  function removeCurrentDraft(){if(!state.currentDraftId)return;setJSON("khsl.drafts",getJSON("khsl.drafts",[]).filter(x=>x.id!==state.currentDraftId));state.currentDraftId=null}

  async function scanPdfBlob(){return imagesToPdfBlob(state.scanPages.map(x=>x.dataUrl))}
  function scanMetadata(){return{code:$("scanCode").value.trim(),type:$("scanType").value,date:$("scanDate").value,responsible:$("scanResponsible").value.trim(),unit:$("scanUnit").value.trim(),description:$("scanDescription").value.trim(),confidentiality:$("scanConfidentiality").value,linkedDraft:$("scanFormLink").value}}
  async function previewScan(){try{const blob=await scanPdfBlob();window.open(URL.createObjectURL(blob),"_blank","noopener")}catch(e){toast(e.message||"PDF oluşturulamadı.")}}
  async function saveScan(){if(!state.scanPages.length)return;const meta=scanMetadata();if(!meta.date){toast("Belge tarihini girin.");$("scanDate").focus();return}try{const blob=await scanPdfBlob(),name=`${fileNameSafe(meta.code||meta.type)}_${meta.date}_${Date.now()}.pdf`,result=await uploadBlob(blob,name,settings().documentFolderId,{recordType:"scan",...meta}),uploads=getJSON("khsl.uploads",[]);uploads.unshift({name,time:stamp(),status:result.ok?"Drive":"Bekliyor",driveId:result.id||null});setJSON("khsl.uploads",uploads.slice(0,20));if(result.ok){logActivity("Belge Drive’a kaydedildi",`${name} · ${meta.type}`);clearScan();toast("Belge Drive’a yüklendi.")}else{logActivity("Belge yüklemesi tamamlanmadı",`${name} · ${result.error}`,"warn");toast(result.error||"Drive yüklemesi tamamlanmadı.",5000)}}catch(e){toast(e.message||"Belge kaydedilemedi.",5000)}}
  function clearScan(){state.scanPages=[];renderScanPages();["scanCode","scanResponsible","scanUnit","scanDescription"].forEach(id=>$(id).value="");$("scanDate").value=todayIso();$("scanFormLink").value="";if($("cameraInput"))$("cameraInput").value="";if($("galleryInput"))$("galleryInput").value=""}

  function renderForms(){const q=$("formSearch").value.trim().toLocaleLowerCase("tr-TR"),rows=FORMS.filter(f=>(f.code+" "+f.name).toLocaleLowerCase("tr-TR").includes(q));$("formCatalog").innerHTML=rows.map(f=>`<article class="form-card"><div class="code-badge">${esc(f.code)}</div><div><h3>${esc(f.name)}</h3><p>${esc(f.description)}</p><div class="form-meta"><span>${esc(f.revision||"Güncel")}</span><span>•</span><span>${f.driveId?"Drive master bağlı":"KYS kaydı"}</span></div></div><button class="button small primary" data-open-form="${esc(f.code)}">Doldur</button></article>`).join("")+(q?"":`<div class="page-heading compact"><span class="eyebrow">DİĞER GÜNCEL FORMLAR</span></div>`+OTHER_FORMS.map(f=>`<article class="form-card"><div class="code-badge">${f[0]}</div><div><h3>${f[1]}</h3><p>Kontrollü Drive kaynağı. Mobil alan eşleştirmesi sonraki form motoru genişlemesinde yapılabilir.</p></div>${f[2]?`<a class="button small secondary" target="_blank" rel="noopener" href="${driveUrl(f[2])}">Drive’da Aç</a>`:""}</article>`).join(""));renderDrafts()}
  function renderDrafts(){const drafts=getJSON("khsl.drafts",[]);$("draftBadge").textContent=drafts.length;$("draftList").innerHTML=drafts.length?drafts.map(d=>`<article class="form-card"><div class="code-badge">${esc(d.formCode)}</div><div><h3>${esc(d.formName)}</h3><p>Son kayıt: ${esc(d.updated)}</p></div><button class="button small primary" data-open-draft="${d.id}">Devam Et</button></article>`).join(""):`<div class="empty-box"><strong>Açık taslak yok</strong><span>Kaydettiğiniz form taslakları burada görünür.</span></div>`;renderHome()}
  function prefillFromDocument(doc){return{talepTuru:"Revizyon",dokumanKodu:doc.code,dokumanAdi:doc.name,mevcutRevizyon:doc.rev,talepTarihi:todayIso()}}
  function renderDocuments(){$("ssotOpen").href=driveUrl(DRIVE.ssot);const q=$("docSearch").value.trim().toLocaleLowerCase("tr-TR"),type=$("docTypeFilter").value,status=$("docStatusFilter").value,rows=DOCUMENTS.filter(d=>(!q||(d.code+" "+d.name).toLocaleLowerCase("tr-TR").includes(q))&&(!type||d.type===type)&&(!status||d.status===status));$("documentCatalog").innerHTML=rows.length?rows.map(d=>`<article class="doc-card"><div class="code-badge">${esc(d.code)}</div><div><h3>${esc(d.name)}</h3><p>${esc(d.type)} · ${esc(d.rev)}</p><span class="doc-state ${d.status==="review"?"review":""}">${d.status==="current"?"GÜNCEL":"KONTROL"}</span></div><div class="doc-actions">${d.driveId?`<a class="button small secondary" href="${driveUrl(d.driveId)}" target="_blank" rel="noopener">Drive’da Aç</a>`:""}<button class="button small ghost" data-change-doc="${esc(d.code)}">Değişiklik Talebi</button></div></article>`).join(""):`<div class="empty-box"><strong>Kayıt bulunamadı</strong><span>Filtreleri değiştirin.</span></div>`}

  function openSettings(){const s=settings();document.querySelectorAll('input[name="driveMode"]').forEach(r=>r.checked=r.value===s.mode);$("googleClientId").value=s.clientId;$("appsScriptUrl").value=s.scriptUrl;$("appsScriptKey").value=s.scriptKey;$("documentFolderId").value=s.documentFolderId;$("formFolderId").value=s.formFolderId;toggleSettingsMode();$("settingsDialog").showModal()}
  function toggleSettingsMode(){const mode=document.querySelector('input[name="driveMode"]:checked')?.value||"oauth";$("oauthClientField").hidden=mode!=="oauth";$("appsScriptFields").hidden=mode!=="appsScript";$("driveConnectButton").hidden=mode!=="oauth"}
  function saveSettings(){const mode=document.querySelector('input[name="driveMode"]:checked')?.value||"oauth";localStorage.setItem("khsl.drive.mode",mode);localStorage.setItem("khsl.drive.clientId",$("googleClientId").value.trim());localStorage.setItem("khsl.drive.scriptUrl",$("appsScriptUrl").value.trim());localStorage.setItem("khsl.drive.scriptKey",$("appsScriptKey").value);localStorage.setItem("khsl.drive.documentFolderId",$("documentFolderId").value.trim()||DRIVE.documents);localStorage.setItem("khsl.drive.formFolderId",$("formFolderId").value.trim()||DRIVE.forms);logActivity("Drive ayarı güncellendi",`${mode==="oauth"?"Google OAuth":"Apps Script"} · hedef klasör ayarları`);$("settingsDialog").close();renderHome();toast("Drive ayarları kaydedildi.")}
  function connectDrive(){const s=settings(),clientId=$("googleClientId").value.trim()||s.clientId;if(!clientId){toast("Önce Google OAuth Client ID girin.");return}if(!window.google?.accounts?.oauth2){toast("Google kimlik bileşeni henüz yüklenmedi.");return}const client=google.accounts.oauth2.initTokenClient({client_id:clientId,scope:"https://www.googleapis.com/auth/drive",callback:resp=>{if(resp.error){toast(`Drive yetkisi alınamadı: ${resp.error}`);return}state.accessToken=resp.access_token;renderHome();toast("Google Drive yetkisi aktif.");if(state.pendingDriveAction){const fn=state.pendingDriveAction;state.pendingDriveAction=null;fn()}}});client.requestAccessToken({prompt:state.accessToken?"":"consent"})}
  async function uploadBlob(blob,name,folderId,meta={}){const s=settings();if(s.mode==="appsScript"){if(!s.scriptUrl||!s.scriptKey)return{ok:false,error:"Apps Script bağlantısı yapılandırılmadı. Ayarlar bölümünü tamamlayın."};try{const b64=await blobToBase64(blob),response=await fetch(s.scriptUrl,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({apiKey:s.scriptKey,folderId,fileName:name,mimeType:blob.type||"application/pdf",base64:b64,metadata:meta})}),text=await response.text();let data;try{data=JSON.parse(text)}catch{throw new Error("Apps Script geçerli JSON döndürmedi.")}return data.ok?{ok:true,id:data.id,name:data.name,webViewLink:data.webViewLink}:{ok:false,error:data.error||"Drive yüklemesi reddedildi."}}catch(e){return{ok:false,error:`Drive köprüsü hatası: ${e.message}`}}}if(!s.clientId)return{ok:false,error:"Google OAuth Client ID tanımlı değil. Ayarlar’dan Drive bağlantısını yapılandırın."};if(!state.accessToken){state.pendingDriveAction=()=>uploadBlob(blob,name,folderId,meta).then(r=>r.ok?toast("Drive yüklemesi tamamlandı."):toast(r.error||"Yükleme başarısız."));connectDrive();return{ok:false,error:"Drive yetkisi bekleniyor. Google yetkilendirme penceresini tamamlayın."}}try{const boundary="khsl_"+crypto.randomUUID().replaceAll("-",""),metadata={name,parents:[folderId],appProperties:{source:"KHSL_KYS_MOBIL",recordType:String(meta.recordType||"record"),documentCode:String(meta.code||meta.formCode||"").slice(0,120)}},body=new Blob([`--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n`,`--${boundary}\r\nContent-Type: ${blob.type||"application/pdf"}\r\n\r\n`,blob,`\r\n--${boundary}--`],{type:`multipart/related; boundary=${boundary}`}),response=await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink",{method:"POST",headers:{Authorization:`Bearer ${state.accessToken}`},body});if(response.status===401){state.accessToken=null;return{ok:false,error:"Drive oturumu sona erdi. Yeniden yetki verin."}}const data=await response.json();if(!response.ok)return{ok:false,error:data?.error?.message||"Google Drive yüklemeyi reddetti."};return{ok:true,...data}}catch(e){return{ok:false,error:`Drive yüklemesi başarısız: ${e.message}`}}}
  function blobToBase64(blob){return new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(String(r.result).split(",")[1]);r.onerror=reject;r.readAsDataURL(blob)})}

  function populateScanFormLinks(){const drafts=getJSON("khsl.drafts",[]),current=$("scanFormLink")?.value||"";if(!$("scanFormLink"))return;$("scanFormLink").innerHTML=`<option value="">Bağlantı yok</option>`+drafts.map(d=>`<option value="${d.id}">${esc(d.formCode)} · ${esc(d.updated)}</option>`).join("");$("scanFormLink").value=current}
  function initDocFilters(){[...new Set(DOCUMENTS.map(d=>d.type))].sort().forEach(t=>$("docTypeFilter").insertAdjacentHTML("beforeend",`<option>${esc(t)}</option>`))}
  function registerEvents(){document.addEventListener("click",e=>{const go=e.target.closest("[data-go]");if(go){showScreen(go.dataset.go);return}const rot=e.target.closest("[data-rotate]");if(rot){transformImage(Number(rot.dataset.rotate),"rotate");return}const rem=e.target.closest("[data-remove-page]");if(rem){state.scanPages.splice(Number(rem.dataset.removePage),1);renderScanPages();return}const crop=e.target.closest("[data-crop]");if(crop){state.cropIndex=Number(crop.dataset.crop);$("cropPreview").src=state.scanPages[state.cropIndex].dataUrl;$("cropDialog").showModal();return}const of=e.target.closest("[data-open-form]");if(of){const form=FORMS.find(f=>f.code===of.dataset.openForm);if(form)renderForm(form);return}const od=e.target.closest("[data-open-draft]");if(od){const d=getJSON("khsl.drafts",[]).find(x=>x.id===od.dataset.openDraft),form=FORMS.find(f=>f.code===d?.formCode);if(form&&d)renderForm(form,d);return}const ra=e.target.closest("[data-remove-attachment]");if(ra){state.formAttachments.splice(Number(ra.dataset.removeAttachment),1);renderFormAttachments();return}const ch=e.target.closest("[data-change-doc]");if(ch){const doc=DOCUMENTS.find(d=>d.code===ch.dataset.changeDoc),form=FORMS.find(f=>f.code==="P.14-FR.01");if(doc&&form)renderForm(form,null,prefillFromDocument(doc));return}});$("cameraInput").addEventListener("change",e=>{readFiles(e.target.files);e.target.value=""});$("galleryInput").addEventListener("change",e=>{readFiles(e.target.files);e.target.value=""});$("scanDate").value=todayIso();$("scanPreviewButton").addEventListener("click",previewScan);$("scanSaveButton").addEventListener("click",saveScan);$("formSearch").addEventListener("input",renderForms);$("docSearch").addEventListener("input",renderDocuments);$("docTypeFilter").addEventListener("change",renderDocuments);$("docStatusFilter").addEventListener("change",renderDocuments);document.querySelectorAll("[data-form-view]").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll("[data-form-view]").forEach(x=>x.classList.toggle("active",x===b));const drafts=b.dataset.formView==="drafts";$("draftList").hidden=!drafts;$("formCatalog").hidden=drafts}));$("settingsButton").addEventListener("click",openSettings);document.querySelectorAll('input[name="driveMode"]').forEach(r=>r.addEventListener("change",toggleSettingsMode));$("settingsSaveButton").addEventListener("click",saveSettings);$("driveConnectButton").addEventListener("click",()=>{localStorage.setItem("khsl.drive.clientId",$("googleClientId").value.trim());connectDrive()});$("cropCloseButton").addEventListener("click",()=>$("cropDialog").close());$("cropApplyButton").addEventListener("click",async()=>{const crop={top:+$("cropTop").value||0,right:+$("cropRight").value||0,bottom:+$("cropBottom").value||0,left:+$("cropLeft").value||0};if(crop.left+crop.right>=80||crop.top+crop.bottom>=80){toast("Kırpma oranı çok yüksek.");return}await transformImage(state.cropIndex,"crop",crop);$("cropDialog").close()});$("openUodiCard").addEventListener("click",()=>window.open(driveUrl(DRIVE.uodiDfList),"_blank","noopener"));$("openUodiCard").addEventListener("keydown",e=>{if(e.key==="Enter")$("openUodiCard").click()});$("clearHistoryButton").addEventListener("click",()=>{localStorage.removeItem("khsl.activity");renderHome()})}
  function registerPwa(){if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}))}

  initDocFilters();registerEvents();registerPwa();renderHome();renderForms();renderDocuments();renderScanPages();
})();
