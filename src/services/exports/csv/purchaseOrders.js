const FileSaver = require('file-saver');

export const generateCSVAsync = () => 
{
    try {
        FileSaver.saveAs(`${process.env.REACT_APP_BASE_URL}/csv-export/purchase-orders`, 'purchase-orders.csv');
    } catch (error) {
        return error;
    }
}


export const findToGenerateCSVAsync = (payload) => 
{
    try {
        FileSaver.saveAs(`${process.env.REACT_APP_BASE_URL}/csv-export/purchase-order/${payload.purchase_order_id}`, 'purchase-order.csv');
    } catch (error) {
        return error;
    }
}


