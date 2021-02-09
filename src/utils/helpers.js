import * as Cookie from './cookies'


/**
 * 
 * @param {object} object
 * @param {method} string
 */

export const toFormData = (object = {}, method = null) =>
{
    let formData = new FormData;

    for (const key in object)
    {
        if (object.hasOwnProperty(key))
        {
            formData.append(key, object[key])
        }
    }

    /**
     * If has file
     */
    const imageValueType = typeof formData.get('image');

    if (imageValueType === 'string' || imageValueType === null)
    {
        formData.delete('image');
    }
    if (method)
    {
        formData.append('_method', method);
    }

    return formData;
};



export const determineIsAuthenticated = () => {
    console.log(Cookie.has('access_token'));
    return Cookie.has('access_token');
};