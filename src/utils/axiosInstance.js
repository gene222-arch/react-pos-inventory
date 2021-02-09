import Axios from 'axios'
import * as Cookie from './cookies'


export default (history = null, redirectPath = null) => 
{
    const BASEURL = process.env.REACT_APP_BASE_URL;

    let headers = {};

    if (Cookie.has('accessToken'))
    {
        headers.Authorization = `Bearer ${ Cookie.getItem('accessToken') }`;
    }

    const axiosInstance = Axios.create({
        baseURL: BASEURL,
        headers
    });


    axiosInstance.interceptors.response.use(
        // on Success
        response => new Promise.resolve(response),

        // on Error
        error => 
        {
            // Error is not from the server
            if (!error.response)
            {
                return new Promise.reject(error);
            }

            // Unauthorized response code
            if (error.response.status !== 401) 
            {
                return new Promise.reject(error);
            }
            else 
            {
                Cookie.removeItem('accessToken');
  
                if (history !== null && redirectPath !== null)
                {
                    history.push(redirectPath)
                }
            }
        }
    )

    return axiosInstance;
}