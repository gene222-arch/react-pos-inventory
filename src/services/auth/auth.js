import axiosInstance from '../../utils/axiosInstance'


export const fetchAuthUser = async () => 
{
    try {

        const result = await axiosInstance()
            .get('/auth-user');
            
        return result.data;

    } catch (error) {

        return error.response.data
    }
}