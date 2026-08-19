const KHSL_ALLOWED_FOLDERS = Object.freeze({
  ROOT: '1tp5TyoUbAt0kpDlCr0cREkffzL1JAbs8',
  DOCUMENTS: '1S-4FCSwuWvva3tbj0Lo2WyMg8s4EEo6B',
  FORMS: '1sIfSxMzAUN7GB4asohGq8TCovYU6zZOx'
});

function doGet() {
  return json_({ ok: true, service: 'KHSL KYS Mobil Drive Bridge', version: '1.0.0' });
}

function doPost(e) {
  try {
    const payload = JSON.parse((e.postData && e.postData.contents) || '{}');
    const expectedKey = PropertiesService.getScriptProperties().getProperty('API_KEY');
    if (!expectedKey || payload.apiKey !== expectedKey) throw new Error('Yetkisiz istek.');

    const allowed = Object.values(KHSL_ALLOWED_FOLDERS);
    if (!allowed.includes(String(payload.folderId || ''))) throw new Error('Hedef klasör izinli değil.');
    if (!payload.fileName || !payload.base64) throw new Error('Dosya adı veya içerik eksik.');

    const bytes = Utilities.base64Decode(payload.base64);
    const blob = Utilities.newBlob(bytes, payload.mimeType || 'application/pdf', sanitizeFileName_(payload.fileName));
    const folder = DriveApp.getFolderById(payload.folderId);
    const file = folder.createFile(blob);

    const safeMeta = payload.metadata || {};
    const description = {
      source: 'KHSL_KYS_MOBIL',
      recordType: String(safeMeta.recordType || 'record').slice(0, 60),
      documentCode: String(safeMeta.code || safeMeta.formCode || '').slice(0, 100),
      createdAt: new Date().toISOString()
    };
    file.setDescription(JSON.stringify(description));

    return json_({ ok: true, id: file.getId(), name: file.getName(), webViewLink: file.getUrl() });
  } catch (err) {
    return json_({ ok: false, error: String(err && err.message ? err.message : err) });
  }
}

function setupApiKey() {
  const key = Utilities.getUuid() + Utilities.getUuid().replace(/-/g, '');
  PropertiesService.getScriptProperties().setProperty('API_KEY', key);
  console.log('API_KEY=' + key);
}

function sanitizeFileName_(name) {
  return String(name).replace(/[\\/:*?"<>|]+/g, '_').slice(0, 180);
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
