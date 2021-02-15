import axiosInstance from '../../utils/axiosInstance'


export const generateExcelAsync = async () => 
{
    try {
        const result = await axiosInstance().get('/csv-export/invoices');

        return result.data;
    } catch (error) {
        return error.response.data
    }
}