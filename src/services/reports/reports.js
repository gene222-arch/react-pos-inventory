import axiosInstance from '../../utils/axiosInstance'
import * as Helpers from '../../utils/helpers'


export const fetchGeneralAnalytics = async () => 
{
    try {
        const result = await axiosInstance().get('/reports/general');

        return result.data;
    } catch (error) {
        return error.response.data
    }
}


export const fetchSalesByItemReports = async (payload = null) => 
{
    try {
        const result = await axiosInstance()
            .post('/reports/sales-by-item', Helpers.prepareToFormData(payload));

        return result.data;
    } catch (error) {
        return error.response.data
    }
}


export const fetchTopFiveSalesByItem = async (payload = null) => 
{
    try {
        const result = await axiosInstance()
            .post('/reports/sales-by-item/top-5', Helpers.prepareToFormData(payload));

        return result.data;
    } catch (error) {
        return error.response.data
    }
}



export const fetchSalesByCategory = async (payload = null) => 
{
    try {
        const result = await axiosInstance()
            .post('/reports/sales-by-category', Helpers.prepareToFormData(payload));

        return result.data;
    } catch (error) {
        return error.response.data
    }
}




export const fetchSalesByPaymentType= async (payload = null) => 
{
    try {
        const result = await axiosInstance()
            .post('/reports/sales-by-payment-type', Helpers.prepareToFormData(payload));

        return result.data;
    } catch (error) {
        return error.response.data
    }
}



export const fetchSalesByEmployee= async (payload = null) => 
{
    try {
        const result = await axiosInstance()
            .post('/reports/sales-by-employee', Helpers.prepareToFormData(payload));

        return result.data;
    } catch (error) {
        return error.response.data
    }
}

