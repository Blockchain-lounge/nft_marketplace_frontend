import { ethers } from 'ethers';
import { apiRequest } from '../offChain/apiRequests';
import {
  redirectUrl,
  signInMessage
} from "../offChain/generalFunctions";


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
      const REQUEST_URL = 'user/auth/is_address_valid/' + authAccount;
      const METHOD = "GET";
      const DATA = {};
      return apiRequest(REQUEST_URL, METHOD, DATA, HEADER)
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
  try {
    if (!(window as any).ethereum) {
      //check if Metamask wallet is not installed
      alert("You must install Metamask first");
      return;
    }

    return (window as any).ethereum
      .request({
        method: "eth_accounts",
      })
      .then((wallets: string[]) => {
        if (wallets[0] && wallets[0] !== null) {
          const authName = 'authName';
          const authUser = checkAuth(authName);
          if (authUser == null) {
            return false;
          }
          if (JSON.parse(authUser).address.length > 0) {
            const authAccount = JSON.parse(authUser).address;
            const HEADER = {};
            const REQUEST_URL = 'user/auth/is_address_valid/' + authAccount;
            const METHOD = "GET";
            const DATA = {}
            return apiRequest(REQUEST_URL, METHOD, DATA, HEADER)
            .then(function (response) {
              if (response !== null) {
                const response = wallets.length > 0 && wallets[0] == authAccount ? true : false
                return response;
                }
              });
          }
          else {
            return false
          }
        }
      })
      .catch((error: any) => {
        alert(`Something went wrong`);
      });
  }
  catch (err) {
    alert(`Something went wrong`);
  }
}

export async function disconnectWallet() {
  // disconnect the first wallet in the wallets array
  ///deleting the cookies to logout user
  const authName = "authName";
  const cookieExpiration = 30; //Days
  const isAuth = checkAuth(authName);
  if (isAuth !== null && isAuth.length > 0) {
    const res = deleteAuth(authName);
  }
  const authSession = "auth.session";
  const isSignedIn = checkAuth(authSession);
  if (isSignedIn !== null && isSignedIn.length > 0) {
    const res = deleteAuth(authSession);
  }
  const jwtAuthName = "jwtAccess";
  const isJWTAuth = checkAuth(jwtAuthName);
  if (isJWTAuth !== null && isJWTAuth.length > 0) {
    const res = deleteAuth(jwtAuthName);
  }
  window.location.href = '/';
}

export async function connectUserWallet() {
  try {
    if (!(window as any).ethereum) {
      //check if Metamask wallet is not installed
      alert("You must install Metamask first");
      return;
    }

    (window as any).ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then((wallets: string[]) => {
        if (wallets[0] && wallets[0] !== null) {
          const account = wallets[0];
          var formData = {
            address: account
          }
          const HEADER = {};
          const REQUEST_URL = 'user/auth/connected_address';
          const METHOD = "POST";
          const DATA = formData
          apiRequest(REQUEST_URL, METHOD, DATA, HEADER)
            .then(function (response) {
              if (response.data.result && response.data.result == true && response.status == 200 || response.status == 201) {
                // const provider = provider;
                const isConnected = true;
                ///setting the cookies
                const authName = "authName";
                const cookieValue = {
                  address: account,
                  isConnected: isConnected,
                }
                const cookieExpiration = 30; //Days
                setAuth(authName, cookieValue, cookieExpiration);

                //get a users detail & sign a signature
                getUserDetails(account);
              }
              else {
                alert('Unable to successfully complete the wallet connection process');
              }
            });
        }
      })
      .catch((error: any) => {
        alert(`Something went wrong: ${error}`);
      });
  }
  catch (error) {
    window.alert('You need to connect your wallet to continue.');
    return;
  }
}

export async function getUserDetails(address: string) {
  const HEADER = {};
  const REQUEST_URL = 'user/auth/address_details/' + address;
  const METHOD = "GET";
  const DATA = {};

  apiRequest(REQUEST_URL, METHOD, DATA, HEADER)
    .then(function (response) {
      if (response.status && response.status == 200) {
        var result = response.data;
        if (result.result !== true && result.error && result.error == null) {
          alert('Unexpected errors occured!');
          return;
        }
        else if (result.result !== true && result.error && result.error !== null) {
          alert(result.error);
          return;
        }
        else {
          /// Signature
          signInNow(result.data.nounce, result.data.username, address)
        }
      }
      else if (response.status && response.status !== 200) {
        alert('Unexpected errors occured!');
        return;
      }
    });

}

export async function signInNow(nounce: number, username: string, address: string) {
  try {
    const message: string = await signInMessage(username, nounce, address);
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(message);

    if (message !== undefined && message !== null) {
      verifyMessage(message, address, signature);
    }
  } catch (err) {
    alert('Please you need to sign the transaction to continue!');
    return;
  }

}

const verifyMessage = async (message: string, address: string, signature: string) => {
  try {
    const signerAddr = await ethers.utils.verifyMessage(message, signature);
    if (signerAddr !== address) {
      const HEADER = {};
      const REQUEST_URL = 'user/auth/verify_signature';
      const METHOD = "POST";
      const DATA = {
        message: message,
        signature: signature,
        address: address
      };

      apiRequest(REQUEST_URL, METHOD, DATA, HEADER)
        .then(function (response) {
          if (response.status == 200) {
            var result = response.data;
            if (result.result !== true && result.error && result.error == null) {
              alert('Unexpected errors occured!');
              return;
            }
            else if (result.result !== true && result.error && result.error !== null) {
              alert(result.error);
              return;
            }
            else {
              const authName = "auth.session";
              const cookieValue = result.token.split(' ')[1];
              const cookieExpiration = 1; //Days
              setAuth(authName, cookieValue, cookieExpiration);
              redirectUrl('/');
            }
          }
          else {
            alert('Unexpected error, please try again!');
            return;
          }
        });
    }
    else {
      alert('Invalid Address or Signature!');
      return;
    }

    return true;
  } catch (err) {
    // console.log(err);
    alert('Unexpected error, please try again!');
    return;
  }
};

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
