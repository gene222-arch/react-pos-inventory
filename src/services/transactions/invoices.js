import axiosInstance from '../../utils/axiosInstance'
import * as Helpers from '../../utils/helpers'


export const fetchAllAsync = async () => 
{
    try {
        const result = await axiosInstance().get('/transactions/invoices');

        return result.data;
    } catch (error) {
        return error.response.data
    }
}



export const fetchInvoice = async (payload) => 
{
    try {
        const result = await axiosInstance()
            .post('/invoices/details', Helpers.prepareToFormData(payload));

        return result.data;
    } catch (error) {
        return error.response.data
    }
}


export const updateAsync = async (payload) => 
{
    try {
        const result = await axiosInstance()
            .put('/invoices', payload);

        return result.data;
    } catch (error) {
        return error.response.data
    }
}





export const destroyAsync = async (payload) => 
{
    try {
        const result = await axiosInstance()
            .delete('/invoices', {
                data: payload
            });

        return result.data;
    } catch (error) {
        return error.response.data
    }
}