import axiosInstance from '../../../utils/axiosInstance'

export const sendResetLinkEmailAsync = async (payload) => 
{
    try {

        const result = await axiosInstance()
            .post('/forgot-password/email', payload);
            
        return result.data;

    } catch (error) {
        return error.response
    }

}



export const resetPasswordAsync = async(payload) => 
{
    try {

        const result = await axiosInstance()
            .post('/forgot-password/reset', payload);
            
        return result.data;

    } catch (error) {
        return error.response
    }

}
