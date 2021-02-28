import axiosInstance from '../../utils/axiosInstance'
import * as Helpers from '../../utils/helpers'


export const fetchAllAsync = async () => 
{
    try {
        
        const result = await axiosInstance().get('/products');

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}


export const fetchAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .post('/products/details', Helpers.prepareToFormData(payload));

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}


export const fetchToPurchaseAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .post('/products/to-purchase', Helpers.prepareToFormData(payload));

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}


export const fetchFilteredItemAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .post('/products/filter', Helpers.prepareToFormData(payload));

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}


export const storeAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance().post('/products', payload);

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}


export const updateAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance().put('/products', payload);

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}


export const uploadImageAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .post('/products/image-upload', Helpers.prepareToFormData(payload));

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}


export const destroyAsync = async (payload) => 
{
    try {
        
        console.log(payload)
        const result = await axiosInstance().delete('/products', {
            data: payload
        });

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}