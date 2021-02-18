import axiosInstance from '../../utils/axiosInstance'
import * as Helpers from '../../utils/helpers'



export const fetchReports = async (payload = null) => 
{
    try {
        const result = await axiosInstance()
            .post('/reports/sales-by-employee', Helpers.prepareToFormData(payload));

        return result.data;
    } catch (error) {
        return error.response.data
    }
}
