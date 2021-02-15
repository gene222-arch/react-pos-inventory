import axiosInstance from '../../utils/axiosInstance'
import * as Helpers from '../../utils/helpers'


export const fetchAllAsync = async () => 
{
    try {
        
        const result = await axiosInstance().get('/suppliers');

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}


export const fetchAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .post('/suppliers/supplier-details', Helpers.prepareToFormData(payload));

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}


export const storeAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance().post('/suppliers', Helpers.prepareToFormData(payload));

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}


export const updateAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .post('/suppliers', Helpers.prepareToFormData(payload, 'PUT'));

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}


export const destroyAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .delete('/suppliers', Helpers.prepareToFormData(payload));

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}