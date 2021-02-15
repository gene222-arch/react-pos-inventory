import axiosInstance from '../../utils/axiosInstance'


export const generatePDFAsync = async () => 
{
    try {
        const result = await axiosInstance().get('/pdf-export/pos-payment');

        return result.data;
    } catch (error) {
        return error.response.data
    }
}