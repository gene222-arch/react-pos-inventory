import axiosInstance from '../../../utils/axiosInstance'
import * as Helpers from '../../../utils/helpers'


export const sendResetLinkEmailAsync = async (payload) => 
{
    try {

        const result = await axiosInstance()
            .post('/forgot-password/email', Helpers.prepareToFormData(payload));
            
        return result.data;

    } catch (error) {
        return error.response
    }

}




export const resetPasswordAsync = async(payload) => 
{
    try {

        const result = await axiosInstance()
            .post('/forgot-password/reset', Helpers.prepareToFormData(payload));
            
        return result.data;

    } catch (error) {
        return error.response
    }

}
