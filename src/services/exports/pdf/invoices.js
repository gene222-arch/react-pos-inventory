const FileSaver = require('file-saver');

export const generatePDFAsync = (payload) => 
{
    try {
        FileSaver.saveAs(`
            ${process.env.REACT_APP_BASE_URL}/pdf-export/invoices/${payload.invoice_id}`, 'payment.pdf');

    } catch (error) {
        return error;
    }
}