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


export const fetchAllFilteredAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance().post('/purchase-orders/filtered',
            payload);

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}


export const fetchForBadOrdersAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .get('/purchase-orders/request-bad-orders');

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

export const fetchReceivedStocksAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .post('/purchase-orders/received-stocks-details', Helpers.prepareToFormData(payload));

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}


export const fetchToBadOrderAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .post('/purchase-orders/purchase-order-details/to-bad-orders', 
                Helpers.prepareToFormData(payload));

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}


export const fetchToReceiveAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .post('/purchase-orders/purchase-order-details/to-receive', Helpers.prepareToFormData(payload));

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}


export const mailSupplierAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .post('/purchase-orders/mail-supplier', Helpers.prepareToFormData(payload));

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}


export const markAllAsReceivedAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .put('/purchase-orders/mark-all-as-received', payload);

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}


export const receiveAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .put('/purchase-orders/to-receive', payload);

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


export const upsertAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .put('/purchase-orders', payload);

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}

export const cancelOrderAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .put('/purchase-orders/cancel', payload);

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}


export const destroyPurchaseProductsAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .delete('/purchase-orders/products', {
                data: payload
            });

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}