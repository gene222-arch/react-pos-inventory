const FileSaver = require('file-saver');

export const generateCSVAsync = () => 
{
    try {
        FileSaver.saveAs(`${process.env.REACT_APP_BASE_URL}/csv-export/bad-orders`, 'bad-orders.csv');
    } catch (error) {
        return error;
    }
}