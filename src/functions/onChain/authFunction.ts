import { ethers } from 'ethers';
import { apiRequest } from '../offChain/apiRequests';
import {
  redirectUrl
} from "../offChain/generalFunctions";
const { ethereum } = window;

export const connectedAccount = async () => {
  return BasicAuth().then((response) => {

    if (response == true) {
      const authName = 'authName';
      const authUser = checkAuth(authName);
      return JSON.parse(authUser).address;
    }
    else {
      return null;
    }
  });

}

export const connectedAccountId = async () => {
  return BasicAuth().then((response) => {
    if (response == true) {
      const authName = 'authName';
      const authUser = checkAuth(authName);
      const authAccount = JSON.parse(authUser).address;
      const HEADER = {};
      const REQUEST_URL = 'is_address_valid/'+authAccount;
      const METHOD = "GET";
      const DATA = {};
      return apiRequest(REQUEST_URL,METHOD,DATA,HEADER) 
          .then(function (response) {
          return response;
          });
        }
        else {
          return null;
        }
  });

}
export const SignInAuth = async () => {
  const authName = 'auth.session';
  const authUser = checkAuth(authName);
  if (authUser == null) {
    return false;
  }
  return true;
}
export const BasicAuth = async () => {
  const authName = 'authName';
  const authUser = checkAuth(authName);
  if (authUser == null) {
    return false;
  }
  if(JSON.parse(authUser).address.length > 0){
    const authAccount = JSON.parse(authUser).address;
    const HEADER = {};
    const REQUEST_URL = 'is_address_valid/'+authAccount;
    const METHOD = "GET";
    const DATA = {}
    const ethereumAccounts = await ethereum.request({ method: "eth_accounts" });
    return apiRequest(REQUEST_URL,METHOD,DATA,HEADER) 
        .then(function (response) {
          if(response !==null){
            const response = ethereumAccounts.length > 0 && ethereumAccounts[0] == authAccount ? true : false
            return response;
          }
        });
  }
  else{
    return false
  }
}

export async function disconnectWallet() {
  // disconnect the first wallet in the wallets array
  ///deleting the cookies to logout user
  const authName = "authName";
  const cookieExpiration = 30; //Days
  const isAuth = checkAuth(authName);
  if (isAuth !==null && isAuth.length > 0) {
    const res = deleteAuth(authName);
  }
  const authSession = "auth.session";
  const isSignedIn = checkAuth(authSession);
  if (isSignedIn !==null && isSignedIn.length > 0) {
    const res = deleteAuth(authSession);
    const HEADER = 'authenticated';
      const REQUEST_URL = 'auth/logout';
      const METHOD = "POST";
      const DATA = {};
      apiRequest(REQUEST_URL, METHOD, DATA, HEADER);
  }
  const jwtAuthName = "jwtAccess";
  const isJWTAuth = checkAuth(jwtAuthName);
  if (isJWTAuth !==null && isJWTAuth.length > 0) {
    const res = deleteAuth(jwtAuthName);
  }
  window.location.href = '/';
}

export async function connectUserWallet() {
  const onboard = '';//await getWeb3OnBoardModal();
  const wallets = '';//await onboard.connectWallet();
  const provider = new ethers.providers.Web3Provider(ethereum);
  const { chainId, name } = await provider.getNetwork();
  const query = new URLSearchParams(window.location.search);
  var ref = query.get('ref');
  // if(name !=='rinkeby' || chainId !== 4){
  //   var errorMessages = 'Only Rinkeby addresses are allowed';
  //   swNot('error', errorMessages)
  //   return
  // }
  if(wallets[0] && wallets[0] !== null)
  {
    // const { accounts: [], chains[], provider } = wallets[0];
    const account = '';//accounts[0].address;
    var formData = {
      address: account
    }
  const HEADER = {};
  const REQUEST_URL = 'auth/connect_with_address';
  const METHOD = "POST";
  const DATA = formData
  apiRequest(REQUEST_URL, METHOD, DATA, HEADER)
    .then(function (response) {
      if (response.data.result == true && response.status == 200 || response.status == 201) {
        // const provider = provider;
        const isConnected = true;
        ///setting the cookies
        const authName = "authName";
        const cookieValue = {
          address: account,
          isConnected: isConnected,
        }
        const cookieExpiration = 30; //Days
        var url = null;
        if(ref !== null && ref !== undefined){
          url = '/signature/'+account+'?ref='+ref;
        }
        else{
          url = '/signature/'+account;
        }
        setAuth(authName, cookieValue, cookieExpiration);

        // redirectUrl(url);
        redirectUrl(url);
        // Don't forget to unsubscribe when your app or component un mounts to prevent memory leaks
        // unsubscribe();

      }
      else {
        alert('Unable to successfully complete the wallet connection process');
      }
    });
  }

}


export function setAuth(authName: string, authValue: {}, authExpirationInDays: number) {
  const d = new Date();
  d.setTime(d.getTime() + (authExpirationInDays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = authName + "=" + JSON.stringify(authValue) + ";" + expires + ";path=/";
}
function deleteAuth(authName: string) { //Logout
  const d = new Date();
  const authExpirationInDays = 365;// 1yr ago
  d.setTime(d.getTime() - (authExpirationInDays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = authName + "=;" + expires + ";path=/";
}
export function checkAuth(authName: any) {
  let user: any = getAuth(authName);
  user = user.length > 0 ? user : null;
  return user;
}
export function getAuth(authName: string) {
  let name = authName + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
