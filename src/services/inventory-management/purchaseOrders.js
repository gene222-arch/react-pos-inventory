import axiosInstance from '../../utils/axiosInstance'
import * as Helpers from '../../utils/helpers'


export const fetchAllAsync = async () => 
{
    try {
        
        const result = await axiosInstance().get('/purchase-orders');

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}


export const fetchAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .post('/purchase-orders/purchase-order-details', Helpers.prepareToFormData(payload));

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}


export const mailSupplierAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .post('/mail-supplier', Helpers.prepareToFormData(payload));

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}


export const markAllAsReceivedAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .post('/mark-all-as-received', Helpers.prepareToFormData(payload));

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}


export const receivePurchaseOrderAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .post('/to-receive', Helpers.prepareToFormData(payload));

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}


export const storeAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .post('/purchase-orders', payload);

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}


export const updateAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .post('/purchase-orders', Helpers.prepareToFormData(payload, 'PUT'));

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}


export const destroyPurchaseProductsAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .delete('/products', payload);

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}