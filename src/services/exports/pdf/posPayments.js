const FileSaver = require('file-saver');

export const generatePDFAsync = (payload) => 
{
    try {
        FileSaver.saveAs(`
            ${process.env.REACT_APP_BASE_URL}/pdf-export/pos-payment/${payload.payment_id}`, 'payment.pdf');

    } catch (error) {
        return error;
    }
}