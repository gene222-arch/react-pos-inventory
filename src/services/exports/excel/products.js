const FileSaver = require('file-saver');

export const generateExcelAsync = () => 
{
    try {

        FileSaver.saveAs(`${process.env.REACT_APP_BASE_URL}/excel-export/products`, 'products.xlsx');

    } catch (error) {
        return error;
    }
}