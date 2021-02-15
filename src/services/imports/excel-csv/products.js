import axiosInstance from '../../../utils/axiosInstance'
import * as Helpers from '../../../utils/helpers'


export const importProductsAsync = async (payload) => 
{
    try {
        const result = await axiosInstance()
            .post('/import/products', Helpers.prepareToFormData(payload));

        return result.data;
    } catch (error) {
        return error.response.data
    }
}