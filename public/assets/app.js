import { XlsxTemplateEngine } from './xlsx-template-engine.js';

const STORAGE_KEY = 'khsl-p16-risk-web-v1';
const COLS = {code:'A',iso:'B',process:'C',source:'D',swot:'E',pest:'F',sourceNote:'G',risk:'H',effects:'I',controls:'J',probability:'K',severity:'L',score:'M',level:'N',planned:'O',actualActivity:'P',owner:'Q',dueDate:'R',actualDate:'S',status:'T',targetP:'U',targetS:'V',targetScore:'W',targetLevel:'X',actualP:'Y',actualS:'Z',actualScore:'AA',actualLevel:'AB',reduction:'AC',decision:'AD',effectiveness:'AE',evidence:'AF',yggAgenda:'AG',yggDecision:'AH',monitoring:'AI'};
const EDITABLE = ['code','iso','process','source','swot','pest','sourceNote','risk','effects','controls','probability','severity','planned','actualActivity','owner','dueDate','actualDate','status','targetP','targetS','actualP','actualS','decision','effectiveness','evidence','yggAgenda','yggDecision','monitoring'];
const LABELS = {code:'Risk Kodu',iso:'TS EN ISO/IEC 17025:2017 Madde',process:'Süreç',source:'Risk/Fırsat Kaynağı',swot:'SWOT Kaynağı',pest:'PEST Kaynağı',sourceNote:'Kaynak Açıklaması',risk:'Riskin Tanımı',effects:'Riskin Olası Etkileri',controls:'Mevcut Tedbir / Kontroller',probability:'Olasılık',severity:'Etki / Şiddet',planned:'Planlanan Faaliyet',actualActivity:'Gerçekleşen Faaliyet',owner:'Sorumlu',dueDate:'Hedef Tamamlanma Tarihi',actualDate:'Gerçekleşme Tarihi',status:'Durum',targetP:'Hedef Olasılık',targetS:'Hedef Etki',actualP:'Gerçekleşen Olasılık',actualS:'Gerçekleşen Etki',decision:'Risk Kararı',effectiveness:'Etkinlik Değerlendirmesi',evidence:'Objektif Delil / Kayıt Referansı',yggAgenda:'YGG Gündem Önerisi',yggDecision:'YGG Karar Durumu / Karar No / Tarih',monitoring:'İzleme ve Gerçekleşme'};
const TEXTAREAS = new Set(['sourceNote','risk','effects','controls','planned','actualActivity','owner','decision','effectiveness','evidence','yggAgenda','yggDecision','monitoring']);
const DATES = new Set(['dueDate','actualDate']);
const NUMBERS = new Set(['probability','severity','targetP','targetS','actualP','actualS']);
const $ = id => document.getElementById(id);
let templateBuffer = null;
let records = [];
let metadata = {};

const score = (a,b) => a && b ? Number(a) * Number(b) : '';
const level = value => value === '' ? '' : value <= 8 ? 'Kabul Edilebilir' : value <= 15 ? 'Orta' : 'Kabul Edilemez';
const serialToDate = value => {
  if (!value) return '';
  const date = new Date(Date.UTC(1899,11,30) + Number(value) * 86400000);
  return date.toISOString().slice(0,10);
};
const dateText = value => value ? new Intl.DateTimeFormat('tr-TR').format(new Date(`${value}T00:00:00`)) : '—';

function setState(text) { $('saveState').textContent = text; }
function normalize(record) {
  DATES.forEach(key => record[key] = serialToDate(record[key]));
  NUMBERS.forEach(key => record[key] = record[key] === '' ? '' : Number(record[key]));
  return record;
}
function enrich(record) {
  const initial = score(record.probability, record.severity);
  const target = score(record.targetP, record.targetS);
  const actual = score(record.actualP, record.actualS);
  return {...record, score:initial, level:level(initial), targetScore:target, targetLevel:level(target), actualScore:actual, actualLevel:level(actual), reduction:initial !== '' && actual !== '' ? initial-actual : ''};
}
function saveLocal() {
  metadata = {analysisSubject:$('analysisSubject').value, assessmentDate:$('assessmentDate').value, assessmentTeam:$('assessmentTeam').value};
  localStorage.setItem(STORAGE_KEY, JSON.stringify({metadata,records}));
  setState('Yerel taslak kaydedildi');
}
function restoreLocal() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved?.records?.length) { records = saved.records; metadata = {...metadata,...saved.metadata}; }
  } catch (_) {}
}
function syncMetadata() { Object.keys(metadata).forEach(key => { if ($(key)) $(key).value = metadata[key] || ''; }); }

async function loadTemplate(buffer) {
  templateBuffer = buffer;
  const engine = await new XlsxTemplateEngine(buffer).init();
  records = (await engine.readRows('Risk Analizi',11,60,COLS)).filter(row => row.code).map(normalize);
  metadata = {
    analysisSubject:'TS EN ISO/IEC 17025:2017 kapsamındaki laboratuvar faaliyetleri ve yönetim sistemi risklerini belirlemek, değerlendirmek, kontrol etmek ve etkinliğini izlemek.',
    assessmentDate:new Date().toISOString().slice(0,10),
    assessmentTeam:'Bülent AYDINBELGE • Harun BALCI • Fatih KILINÇ • Mehmet AKÇAKALE'
  };
  restoreLocal(); syncMetadata(); render(); setState('Excel şablonu yüklendi');
}

function render() {
  const query = $('searchInput').value.toLocaleLowerCase('tr');
  const levelFilter = $('levelFilter').value;
  const statusFilter = $('statusFilter').value;
  const visible = records.map((record,index)=>({record:enrich(record),index})).filter(({record}) =>
    (!query || [record.code,record.process,record.risk,record.effects].join(' ').toLocaleLowerCase('tr').includes(query)) &&
    (!levelFilter || record.level === levelFilter) && (!statusFilter || record.status === statusFilter));
  const list = $('riskList'); list.innerHTML = '';
  if (!visible.length) list.innerHTML = '<div class="empty">Excel şablonu seçin veya filtreyi değiştirin.</div>';
  visible.forEach(({record,index}) => {
    const node = $('riskCardTemplate').content.cloneNode(true);
    node.querySelector('.risk-code').textContent = record.code || 'Yeni';
    node.querySelector('.risk-process').textContent = record.process || 'Süreç belirtilmedi';
    node.querySelector('.risk-title').textContent = record.risk || 'Risk tanımı girilmedi';
    node.querySelector('.risk-effects').textContent = record.effects || 'Olası etki girilmedi';
    const badge = node.querySelector('.level'); badge.textContent = record.level || 'Puanlanmadı';
    badge.classList.add(record.level === 'Kabul Edilemez' ? 'high' : record.level === 'Orta' ? 'medium' : 'low');
    node.querySelector('.status').textContent = record.status || 'Durum yok';
    node.querySelector('.initial-score').textContent = record.score || '—';
    node.querySelector('.target-score').textContent = record.targetScore || '—';
    node.querySelector('.actual-score').textContent = record.actualScore || '—';
    node.querySelector('.due-date').textContent = dateText(record.dueDate);
    node.querySelector('.edit-button').onclick = () => openDialog(index);
    list.appendChild(node);
  });
  const all = records.map(enrich);
  $('kpiTotal').textContent = all.length;
  $('kpiMedium').textContent = all.filter(item=>item.level==='Orta').length;
  $('kpiHigh').textContent = all.filter(item=>item.level==='Kabul Edilemez').length;
  $('kpiOpen').textContent = all.filter(item=>item.status!=='Tamamlandı').length;
  $('kpiLate').textContent = all.filter(item=>item.dueDate && item.status!=='Tamamlandı' && new Date(`${item.dueDate}T23:59:59`) < new Date()).length;
}

function openDialog(index='') {
  $('editIndex').value = index;
  $('dialogTitle').textContent = index === '' ? 'Yeni Risk Kaydı' : `${records[index].code} Risk Kaydı`;
  $('deleteRiskBtn').style.display = index === '' ? 'none' : 'inline-block';
  const record = index === '' ? {code:`R.${String(records.length+1).padStart(3,'0')}`,status:'Başlanmadı',effectiveness:'Değerlendirilmedi'} : records[index];
  const fields = $('formFields'); fields.innerHTML = '';
  EDITABLE.forEach(key => {
    const label = document.createElement('label'); label.textContent = LABELS[key];
    if (TEXTAREAS.has(key)) label.className = ['risk','effects','controls','planned','actualActivity'].includes(key) ? 'wide' : 'full';
    const input = TEXTAREAS.has(key) ? document.createElement('textarea') : document.createElement('input');
    input.name = key; input.value = record[key] ?? '';
    if (DATES.has(key)) input.type = 'date';
    if (NUMBERS.has(key)) { input.type = 'number'; input.min = '1'; input.max = '5'; }
    label.appendChild(input); fields.appendChild(label);
  });
  $('riskDialog').showModal();
}
function closeDialog() { $('riskDialog').close(); }
function submitRisk(event) {
  event.preventDefault();
  const record = {};
  [...event.currentTarget.elements].forEach(input => { if (input.name) record[input.name] = NUMBERS.has(input.name) ? (input.value === '' ? '' : Number(input.value)) : input.value; });
  const index = $('editIndex').value;
  if (index === '') records.push(record); else records[Number(index)] = record;
  saveLocal(); render(); closeDialog();
}

async function exportExcel() {
  if (!templateBuffer) { alert('Önce kontrollü P.16-FR.01 Excel şablonunu seçin.'); return; }
  try {
    setState('Excel hazırlanıyor…');
    const engine = await new XlsxTemplateEngine(templateBuffer).init();
    const patches = [
      {ref:'D6',value:$('analysisSubject').value},
      {ref:'D7',value:$('assessmentDate').value,kind:'date'},
      {ref:'J7',value:$('assessmentTeam').value}
    ];
    for (let i=0;i<50;i+=1) {
      const row = 11+i; const record = records[i] || {};
      EDITABLE.forEach(key => patches.push({ref:`${COLS[key]}${row}`, value:record[key] ?? '', kind:DATES.has(key)?'date':NUMBERS.has(key)?'number':'string'}));
      patches.push(
        {ref:`M${row}`,formula:`IF(OR(K${row}="",L${row}=""),"",K${row}*L${row})`},
        {ref:`N${row}`,formula:`IF(M${row}="","",IF(M${row}<=8,"Kabul Edilebilir",IF(M${row}<=15,"Orta","Kabul Edilemez")))`},
        {ref:`W${row}`,formula:`IF(OR(U${row}="",V${row}=""),"",U${row}*V${row})`},
        {ref:`X${row}`,formula:`IF(W${row}="","",IF(W${row}<=8,"Kabul Edilebilir",IF(W${row}<=15,"Orta","Kabul Edilemez")))`},
        {ref:`AA${row}`,formula:`IF(OR(Y${row}="",Z${row}=""),"",Y${row}*Z${row})`},
        {ref:`AB${row}`,formula:`IF(AA${row}="","",IF(AA${row}<=8,"Kabul Edilebilir",IF(AA${row}<=15,"Orta","Kabul Edilemez")))`},
        {ref:`AC${row}`,formula:`IF(OR(M${row}="",AA${row}=""),"",M${row}-AA${row})`}
      );
    }
    await engine.patchSheet('Risk Analizi', patches);
    const blob = await engine.exportBlob();
    const link = document.createElement('a'); link.href = URL.createObjectURL(blob);
    link.download = `P.16-FR.01_RISK_ANALIZ_${$('assessmentDate').value || 'TASLAK'}.xlsx`; link.click();
    URL.revokeObjectURL(link.href); setState('Excel indirildi');
  } catch (error) { console.error(error); alert(`Excel üretilemedi: ${error.message}`); setState('Hata oluştu'); }
}

$('riskForm').addEventListener('submit',submitRisk);
$('closeDialog').onclick = closeDialog; $('cancelRiskBtn').onclick = closeDialog;
$('addRiskBtn').onclick = () => openDialog();
$('deleteRiskBtn').onclick = () => { records.splice(Number($('editIndex').value),1); saveLocal(); render(); closeDialog(); };
$('exportBtn').onclick = exportExcel;
$('loadTemplateBtn').onclick = () => $('templateFile').click();
$('templateFile').onchange = async event => { const file = event.target.files[0]; if (file) await loadTemplate(await file.arrayBuffer()); };
['searchInput','levelFilter','statusFilter'].forEach(id => $(id).addEventListener('input',render));
['analysisSubject','assessmentDate','assessmentTeam'].forEach(id => $(id).addEventListener('change',saveLocal));
render();
