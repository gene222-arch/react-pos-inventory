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


export const storeAsync = async (payload) => 
{
    try {
        
        const result = await axiosInstance()
            .post('/stocks/stock-adjustment', payload);

        return result.data;

    } catch (error) {
        return error.response.data;        
    }
}

