import * as XLSX from 'xlsx';
export default function useXlsx() {
  const writeFile = (dataSource: Array<any>, headers: Array<string>, fileName: string) => {
    /* generate worksheet and workbook */
    const worksheet = XLSX.utils.json_to_sheet(dataSource);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'sheet1');

    /* fix headers */
    XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: 'A1' });

    /* calculate column width */
    // const max_width = rows.reduce((w, r) => Math.max(w, r.name.length), 10);
    // worksheet['!cols'] = [{ wch: max_width }];

    /* create an XLSX file and try to save to fileName.xlsx */
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };
  return {
    writeFile,
  };
}
