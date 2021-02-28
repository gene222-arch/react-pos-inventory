const FileSaver = require('file-saver');

export const generateCSVAsync = () => 
{
    try {
        FileSaver.saveAs(`${process.env.REACT_APP_BASE_URL}/csv-export/sales-returns`, 'sales-returns.csv');
    } catch (error) {
        return error;
    }
}