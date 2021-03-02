import axiosInstance from '../../../utils/axiosInstance'


export const importProductsAsync = async (payload) => 
{
    try {

        const formData = new FormData();

        payload.files.forEach(file => {
            formData.append('files', file);
        });

        const result = await axiosInstance(null, null, 'multipart/form-data')
            .post('/import/products', formData);

        return result.data;
    } catch (error) {
        return error.response.data
    }
}