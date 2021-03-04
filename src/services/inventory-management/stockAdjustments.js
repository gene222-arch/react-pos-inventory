import axiosInstance from '../../utils/axiosInstance'
import * as Helpers from '../../utils/helpers'


export const fetchAllAsync = async () => 
{
    try {
        
        const result = await axiosInstance().get('/stocks/stock-adjustments');

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}


export const fetchAllProductsAsync = async () => 
{
    try {
        
        const result = await axiosInstance().get('/stocks/stock-adjustments/products');

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}


export const fetchStockToAdjustAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .post('/stocks/stock-adjustments/stock', Helpers.prepareToFormData(payload));

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}



export const fetchAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .post('/stocks/stock-adjustments/details', Helpers.prepareToFormData(payload));

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}


export const receivedItemsAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .post('/stocks/stock-adjustment/received-items', payload);

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}


export const inventoryCountAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .post('/stocks/stock-adjustment/inventory-count', payload);

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}


export const lossOrDamageAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .post('/stocks/stock-adjustment/loss-damage', payload);

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}

