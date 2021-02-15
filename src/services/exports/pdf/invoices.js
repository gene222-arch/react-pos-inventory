import axiosInstance from '../../../utils/axiosInstance'


export const generatePDFAsync = async () => 
{
    try {
        const result = await axiosInstance().get('/pdf-export/invoices');

        return result.data;
    } catch (error) {
        return error.response.data
    }
}