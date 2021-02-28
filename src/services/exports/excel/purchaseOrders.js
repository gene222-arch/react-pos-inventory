const FileSaver = require('file-saver');

export const generateExcelAsync = () => 
{
    try {
        FileSaver.saveAs(`${process.env.REACT_APP_BASE_URL}/excel-export/purchase-orders`, 'purchase-orders.xlsx');
    } catch (error) {
        return error;
    }
}