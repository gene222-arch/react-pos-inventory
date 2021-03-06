import Axios from 'axios'
import UnAuthorize from '../views/errors/UnAuthorized'
import * as Cookie from './cookies'


export default (history = null, responseType = null, contentType = null) => 
{
    let headers = {};

    if (Cookie.has('access_token'))
    {
        headers.Authorization = `Bearer ${ Cookie.getItem('access_token') }`;
        
        if (responseType) 
        {
            headers.responseType = responseType;
        }
        if (contentType) 
        {
            headers.contentType = contentType;
        }
    }

    const axiosInstance = Axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
        headers
    });

    axiosInstance.interceptors.response.use(
        (response) => {
            return Promise.resolve(response)
        },
        (error) => {
            switch(error.response.status) 
            {
                case 401: 
                    Cookie.removeItem('access_token');

                    if (!Cookie.has('access_token'))
                    {
                        history.push('/auth/login')
                    }
                    break;
                
                case 403: 
                    alert('Forbidden')
                    break;
                
                case 500: 
                    alert('Something went wrong')
                    break;
                    
                default: 
                    break;
            }           

            return Promise.reject(error);
        }
    )

    return axiosInstance;
}