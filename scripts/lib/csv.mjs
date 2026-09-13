/**
 * Минимальный CSV-парсер по RFC4180: двойные кавычки, запятые и переводы
 * строк внутри кавычек, экранирование кавычки удвоением (`""`).
 */

/**
 * Парсит текст CSV в массив записей (строк-полей).
 * @param {string} text — исходный CSV (допускаются BOM и CRLF)
 * @returns {string[][]} записи; пустые строки пропускаются
 */
export function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      row.push(field);
      field = '';
    } else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else {
      field += ch;
    }
  }

  if (field !== '' || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}
