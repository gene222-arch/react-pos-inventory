import axiosInstance from '../../../utils/axiosInstance'


export const generateExcelAsync = async () => 
{
    try {
        const result = await axiosInstance().get('/csv-export/sales-returns');

        return result.data;
    } catch (error) {
        return error.response.data
    }
}