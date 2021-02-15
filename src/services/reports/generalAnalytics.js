import axiosInstance from '../../utils/axiosInstance'


export const fetchGeneralAnalytics = async () => 
{
    try {
        const result = await axiosInstance().get('/reports/general');

        return result.data;
    } catch (error) {
        return error.response.data
    }
}