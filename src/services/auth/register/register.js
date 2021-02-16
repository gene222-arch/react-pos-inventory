import axiosInstance from '../../../utils/axiosInstance'
import * as Helpers from '../../../utils/helpers'


const registerAsync = async(payload) => 
{
    try {

        const result = await axiosInstance()
            .post('/auth/register', Helpers.prepareToFormData(payload));
            
        return result.data;

    } catch (error) {
        return error.response.data
    }

}


export default registerAsync