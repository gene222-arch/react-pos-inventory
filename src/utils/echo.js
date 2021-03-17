import Pusher from "pusher-js";
import Echo from "laravel-echo";
import * as Cookies from './cookies'


export default () => 
{
    const options = {
        broadcaster: "pusher",
        key: "myPusherKey",
        cluster: "mt1",
        forceTLS: true,
        encrypted: false,
        authEndpoint: process.env.REACT_APP_BROADCASTING_BASE_URL,
        auth: {
            headers: {
                Authorization: "Bearer " + Cookies.get("access_token"),
                Accept: "application/json"
            }
        }
    };
    
    return new Echo(options);
}