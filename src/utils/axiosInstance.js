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
                    alert('Forbidden Access!');
                    break;
                
                case 500: 
                    alert('Something went wrong')
                    break;
            }           

            return Promise.reject(error);
        }
    )

    return axiosInstance;
}