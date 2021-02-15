import axiosInstance from '../../../utils/axiosInstance'


export const generateExcelAsync = async () => 
{
    try {
        const result = await axiosInstance().get('/excel-export/customers');

        return result.data;
    } catch (error) {
        return error.response.data
    }
}