import axiosInstance from '../../utils/axiosInstance'


export const fetchAllAsync = async () => 
{
    try {
        
        const result = await axiosInstance().get('/permissions');

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}