import axiosInstance from '../../utils/axiosInstance'
import * as Helpers from '../../utils/helpers'


export const fetchReceivedStocks = async () => 
{
    try {
        const result = await axiosInstance().get('/transactions/received-stocks');

        return result.data;
    } catch (error) {
        return error.response.data
    }
}

