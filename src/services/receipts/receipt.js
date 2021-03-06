import axiosInstance from '../../utils/axiosInstance'


export const fetchAllAsync = async (payload) => 
{
    try {
        const result = await axiosInstance()
            .post('/receipts', payload);

        return result.data;
    } catch (error) {
        return error.response.data
    }
}



export const fetchAllDetailsAsync = async (payload) => 
{
    try {
        const result = await axiosInstance()
            .post('/receipts/with-details', payload);

        return result.data;
    } catch (error) {
        return error.response.data
    }
}

