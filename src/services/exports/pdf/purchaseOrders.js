const FileSaver = require('file-saver');

export const generatePDFAsync = (payload) => 
{
    try {
        FileSaver.saveAs(`
            ${process.env.REACT_APP_BASE_URL}/pdf-export/purchase-order/${payload.purchase_order_id}`, 'purchase-order.pdf');

    } catch (error) {
        return error;
    }
}