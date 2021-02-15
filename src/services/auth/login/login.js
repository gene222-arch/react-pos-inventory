import axiosInstance from '../../../utils/axiosInstance'
import * as Helpers from '../../../utils/helpers'


const loginAsync = async (payload) => 
{
    try {

        const result = await axiosInstance()
            .post('/auth/login', Helpers.prepareToFormData(payload));
            
        return result.data;

    } catch (error) {
        return error.response
    }
}


export default loginAsync