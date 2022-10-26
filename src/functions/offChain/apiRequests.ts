import axios from 'axios';
import APPCONFIG from '../../constants/Config';
import {checkAuth, disconnectWallet} from "../onChain/authFunction";

const API_URL = APPCONFIG.API_BASE_URL;
 
export function apiRequest(REQUEST_URL: string,METHOD: string,DATA:{},HEADER:{}) 
{
    if(HEADER == 'authenticated')
    {
        const authName = 'auth.session';
        // JWTToken = checkAuth(authName);
        if(checkAuth(authName) == null){
            disconnectWallet();
        }
        const JWTToken = JSON.parse(checkAuth(authName));
        HEADER = { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${JWTToken}`
        };
    }
    else{
        HEADER = { 
            "Content-Type": "application/json"
        };
    }
    return axios({
        method: METHOD,
        url: API_URL+REQUEST_URL,
        data: DATA,
        headers: HEADER,
        withCredentials: false,
      })
    .then(function (response) {
        //handle success
        return response
    })
    .catch(function (err) {
        //handle error
        return err.response;
    });
// return response;
}