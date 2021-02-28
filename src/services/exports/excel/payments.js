const FileSaver = require('file-saver');

export const generateExcelAsync = () => 
{
    try {
        FileSaver.saveAs(`${process.env.REACT_APP_BASE_URL}/excel-export/payments`, 'payments.xlsx');
    } catch (error) {
        return error;
    }
}