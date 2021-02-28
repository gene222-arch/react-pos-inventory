const FileSaver = require('file-saver');

export const generateCSVAsync = () => 
{
    try {
        FileSaver.saveAs(`${process.env.REACT_APP_BASE_URL}/csv-export/customers`, 'customers.csv');
    } catch (error) {
        return error;
    }
}