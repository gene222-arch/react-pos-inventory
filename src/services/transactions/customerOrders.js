import axiosInstance from '../../utils/axiosInstance'
import * as Helpers from '../../utils/helpers'


export const fetchCustomerOrders = async () => 
{
    try {
        const result = await axiosInstance().get('/transactions/customer-orders');

        return result.data;
    } catch (error) {
        return error.response.data
    }
}

