const NS = 'http://schemas.openxmlformats.org/spreadsheetml/2006/main';
const REL_NS = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';

export class XlsxTemplateEngine {
  constructor(buffer) { this.buffer = buffer; this.zip = null; this.shared = []; }

  async init() {
    this.zip = await window.JSZip.loadAsync(this.buffer);
    this.shared = await this.readSharedStrings();
    return this;
  }

  parse(xml) { return new DOMParser().parseFromString(xml, 'application/xml'); }

  async readSharedStrings() {
    const file = this.zip.file('xl/sharedStrings.xml');
    if (!file) return [];
    const doc = this.parse(await file.async('string'));
    return [...doc.getElementsByTagNameNS(NS, 'si')].map(si =>
      [...si.getElementsByTagNameNS(NS, 't')].map(t => t.textContent).join('')
    );
  }

  async getSheetPath(sheetName) {
    const workbook = this.parse(await this.zip.file('xl/workbook.xml').async('string'));
    const rels = this.parse(await this.zip.file('xl/_rels/workbook.xml.rels').async('string'));
    const sheet = [...workbook.getElementsByTagNameNS(NS, 'sheet')]
      .find(item => item.getAttribute('name') === sheetName);
    if (!sheet) throw new Error(`Sayfa bulunamadı: ${sheetName}`);
    const relationId = sheet.getAttributeNS(REL_NS, 'id') || sheet.getAttribute('r:id');
    const relation = [...rels.getElementsByTagName('Relationship')]
      .find(item => item.getAttribute('Id') === relationId);
    if (!relation) throw new Error(`Sayfa ilişkisi bulunamadı: ${sheetName}`);
    const target = relation.getAttribute('Target').replace(/^\//, '').replace(/^xl\//, '');
    return `xl/${target}`;
  }

  async readRows(sheetName, startRow, endRow, columns) {
    const path = await this.getSheetPath(sheetName);
    const doc = this.parse(await this.zip.file(path).async('string'));
    const rows = [];
    for (let row = startRow; row <= endRow; row += 1) {
      const record = {};
      for (const [key, column] of Object.entries(columns)) {
        record[key] = this.readCell(doc, `${column}${row}`);
      }
      if (Object.values(record).some(value => value !== '' && value !== null)) rows.push(record);
    }
    return rows;
  }

  readCell(doc, reference) {
    const cell = [...doc.getElementsByTagNameNS(NS, 'c')]
      .find(item => item.getAttribute('r') === reference);
    if (!cell) return '';
    const type = cell.getAttribute('t');
    if (type === 'inlineStr') return cell.getElementsByTagNameNS(NS, 't')[0]?.textContent || '';
    const rawValue = cell.getElementsByTagNameNS(NS, 'v')[0]?.textContent ?? '';
    if (type === 's') return this.shared[Number(rawValue)] ?? '';
    if (type === 'b') return rawValue === '1';
    return rawValue;
  }

  async patchSheet(sheetName, patches) {
    const path = await this.getSheetPath(sheetName);
    const doc = this.parse(await this.zip.file(path).async('string'));
    for (const patch of patches) this.setCell(doc, patch);
    this.zip.file(path, new XMLSerializer().serializeToString(doc));
  }

  setCell(doc, patch) {
    const { ref, value, kind = 'string', formula = null } = patch;
    const sheetData = doc.getElementsByTagNameNS(NS, 'sheetData')[0];
    const rowNumber = Number(ref.match(/\d+/)[0]);
    let row = [...sheetData.getElementsByTagNameNS(NS, 'row')]
      .find(item => Number(item.getAttribute('r')) === rowNumber);
    if (!row) {
      row = doc.createElementNS(NS, 'row');
      row.setAttribute('r', String(rowNumber));
      sheetData.appendChild(row);
    }
    let cell = [...row.getElementsByTagNameNS(NS, 'c')]
      .find(item => item.getAttribute('r') === ref);
    if (!cell) {
      cell = doc.createElementNS(NS, 'c');
      cell.setAttribute('r', ref);
      row.appendChild(cell);
    }
    [...cell.childNodes].forEach(node => cell.removeChild(node));

    if (formula) {
      const f = doc.createElementNS(NS, 'f');
      f.textContent = formula.replace(/^=/, '');
      const v = doc.createElementNS(NS, 'v');
      v.textContent = '';
      cell.removeAttribute('t');
      cell.append(f, v);
      return;
    }

    if (value === '' || value === null || value === undefined) {
      cell.removeAttribute('t');
      return;
    }

    if (kind === 'number' || kind === 'date') {
      const v = doc.createElementNS(NS, 'v');
      v.textContent = kind === 'date' ? String(this.excelDate(value)) : String(value);
      cell.removeAttribute('t');
      cell.appendChild(v);
      return;
    }

    cell.setAttribute('t', 'inlineStr');
    const inline = doc.createElementNS(NS, 'is');
    const text = doc.createElementNS(NS, 't');
    text.setAttribute('xml:space', 'preserve');
    text.textContent = String(value);
    inline.appendChild(text);
    cell.appendChild(inline);
  }

  excelDate(value) {
    const date = new Date(`${value}T00:00:00Z`);
    return Math.floor((date.getTime() - Date.UTC(1899, 11, 30)) / 86400000);
  }

  async exportBlob() {
    const workbook = this.parse(await this.zip.file('xl/workbook.xml').async('string'));
    let calc = workbook.getElementsByTagNameNS(NS, 'calcPr')[0];
    if (!calc) {
      calc = workbook.createElementNS(NS, 'calcPr');
      workbook.documentElement.appendChild(calc);
    }
    calc.setAttribute('calcMode', 'auto');
    calc.setAttribute('fullCalcOnLoad', '1');
    calc.setAttribute('forceFullCalc', '1');
    this.zip.file('xl/workbook.xml', new XMLSerializer().serializeToString(workbook));
    return this.zip.generateAsync({
      type: 'blob',
      mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
  }
}
