import axiosInstance from '../../utils/axiosInstance'
import * as Helpers from '../../utils/helpers'


export const fetchAllAsync = async () => 
{
    try {
        
        const result = await axiosInstance().get('/bad-orders');

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}


export const fetchPurchaseOrdersAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .get('/bad-orders/purchase-orders');

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}


export const fetchPurchaseOrderAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .post('/bad-orders/purchase-order', 
                Helpers.prepareToFormData(payload));

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}



export const fetchAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .post('/bad-orders/details', Helpers.prepareToFormData(payload));

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}


export const storeAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance().post('/bad-orders', payload);

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}


export const updateAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .post('/bad-orders', Helpers.prepareToFormData(payload, 'PUT'));

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}


export const destroyAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .delete('/bad-orders', Helpers.prepareToFormData(payload));

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}