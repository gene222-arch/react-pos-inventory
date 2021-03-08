const FileSaver = require('file-saver');

export const generatePDFAsync = (payload) => 
{
    try {
        FileSaver.saveAs(`
            ${process.env.REACT_APP_BASE_URL}/pdf-print/sales-receipt/${payload.sales_id}`, 'sales-receipt.pdf');

    } catch (error) {
        return error;
    }
}