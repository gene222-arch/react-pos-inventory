import axiosInstance from '../../utils/axiosInstance'
import * as Helpers from '../../utils/helpers'


export const fetchAllAsync = async () => 
{
    try {
        
        const result = await axiosInstance().get('/employees');

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}

export const fetchAllRolesAsync = async () => 
{
    try {
        
        const result = await axiosInstance().get('/roles');

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}


export const fetchAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .post('/employees/details', payload);

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}


export const storeAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .post('/employees', payload);

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}


export const updateAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .put('/employees', payload);

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}


export const destroyAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .delete('/employees', {
                data: payload
            });

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}