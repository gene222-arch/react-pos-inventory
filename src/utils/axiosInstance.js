import Axios from 'axios'
import * as Cookie from './cookies'


export default (history = null, redirectPath = null) => 
{
    let headers = {};

    if (Cookie.has('access_token'))
    {
        headers.Authorization = `Bearer ${ Cookie.getItem('access_token') }`;
    }

    const axiosInstance = Axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
        headers
    });

    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => 
        {
            if (!error.response)
            {
                return new Promise.reject(error);
            }

            if (error.response.status === 401 || error.response.status === 403)
            {
                Cookie.removeItem('access_token');
  
                if (!Cookie.has('access_token'))
                {
                    if (redirectPath !== null)
                    {
                        history.push(redirectPath)
                    }

                    history.push('/auth/login')
                }
            }
        }
    )

    return axiosInstance;
}