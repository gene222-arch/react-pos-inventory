import axiosInstance from '../../utils/axiosInstance'


export const fetchDashboardData = async () => 
{
    try {
        const result = await axiosInstance().get('/dashboard');

        return result.data;
    } catch (error) {
        return error.response.data
    }
}