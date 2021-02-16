import axiosInstance from '../../../utils/axiosInstance'
import * as Helpers from '../../../utils/helpers'


export const loginAsync = async (payload) => 
{
    try {

        const result = await axiosInstance()
            .post('/auth/login', Helpers.prepareToFormData(payload));
            
        return result.data;

    } catch (error) {
        return error.response.data
    }
}


export const logoutAsync = async () => 
{
    try {

        const result = await axiosInstance().post('/logout');

        return result.data;
    } catch (error) {
        return error.response.data
    }
}
