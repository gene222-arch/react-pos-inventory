const FileSaver = require('file-saver');

export const generateExcelAsync = () => 
{
    try {
        FileSaver.saveAs(`${process.env.REACT_APP_BASE_URL}/excel-export/sales-returns`, 'sales-returns.xlsx');
    } catch (error) {
        return error;
    }
}