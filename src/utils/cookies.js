/**
 * 
 * @param {string} name 
 * @param {string} value 
 * @param {int} days 
 */
export const setItem = (name, value, expirationDate) => 
{
    const expiresAt = new Date(expirationDate).toUTCString();
    document.cookie = `${ name } = ${ value || ''};expires=${ expiresAt }; path=/`
}



/**
 * 
 * @param {*} name 
 */
export const getItem = (name) =>
{
    let cookieName = name + "=";
    let cookies = document.cookie.split(';');

    for(let i = 0; i < cookies.length; i++) 
    {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') cookie = cookie.substring(1, cookie.length);
        if (cookie.indexOf(cookieName) === 0) 
        {
            return cookie.substring(cookieName.length,cookie.length);
        }
    }
    return null;
}



/**
 * 
 * @param {*} name 
 * @returns {boolean}
 */
export const has = (name) => getItem(name) ? true : false;




/**
 * 
 * @param {*} name 
 * @returns {void}
 */
export const removeItem = (name) => 
{   
    document.cookie = name +'=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}