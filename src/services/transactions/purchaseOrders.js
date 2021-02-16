import axiosInstance from '../../utils/axiosInstance'

export const fetchAllAsync = async () => 
{
    try {
        const result = await axiosInstance().get('/transactions/purchase-orders');

        return result.data;
    } catch (error) {
        return error.response.data
    }
}

