import axiosInstance from '../../utils/axiosInstance'
import * as Helpers from '../../utils/helpers'


export const fetchPurchaseOrders = async () => 
{
    try {
        const result = await axiosInstance().get('/transactions/purchase-orders');

        return result.data;
    } catch (error) {
        return error.response.data
    }
}

