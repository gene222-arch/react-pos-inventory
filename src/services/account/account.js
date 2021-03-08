import axiosInstance from '../../utils/axiosInstance'


export const checkPasswordAsync = async (payload) => 
{
    try {
        const result = await axiosInstance()
            .put('/account/check-password', payload);

        return result.data;
    } catch (error) {
        return error.response.data
    }
}


export const changePasswordAsync = async (payload) => 
{
    try {
        const result = await axiosInstance()
            .put('/account/password', payload);

        return result.data;
    } catch (error) {
        return error.response.data
    }
}



export const changeNameAsync = async (payload) => 
{
    try {
        const result = await axiosInstance()
            .put('/account/name', payload);

        return result.data;
    } catch (error) {
        return error.response.data
    }
}


export const changeEmailAsync = async (payload) => 
{
    try {
        const result = await axiosInstance()
            .put('/account/email', payload);

        return result.data;
    } catch (error) {
        return error.response.data
    }
}