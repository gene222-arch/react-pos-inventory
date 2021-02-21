import axiosInstance from '../../utils/axiosInstance'
import * as Helpers from '../../utils/helpers'



export const fetchCartDetails = async (payload) => 
{
    try {
        const result = await axiosInstance()
            .post('/pos/cart-details', Helpers.prepareToFormData(payload));

        return result.data;
    } catch (error) {
        return error.response.data
    }
}


export const addToCartAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .post('/pos/add-to-cart', Helpers.prepareToFormData(payload));

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}

export const fetchAmountToPayAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .post('/pos/to-pay', Helpers.prepareToFormData(payload));

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}


export const processPaymentAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .post('/pos/process-payment', Helpers.prepareToFormData(payload));

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}


export const invoiceAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .post('/pos/invoice', Helpers.prepareToFormData(payload));

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}


export const applyDiscountToAllAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .put('/pos/discount-all', payload);

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}


export const applyDiscountAddQuantityAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .put('/pos/discount/item-quantity', Helpers.prepareToFormData(payload));

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}



export const removeDiscountAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .delete('/pos/discount', Helpers.prepareToFormData(payload));

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}


export const removeAllDiscountAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .delete('/pos/discount-all', Helpers.prepareToFormData(payload));

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}


export const removeItemsAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .delete('/pos/items', {
                data: payload
            });

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}



export const cancelOrdersAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .put('/pos/cancel-orders', payload);

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}


