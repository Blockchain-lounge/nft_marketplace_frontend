import axios from "axios";
import APPCONFIG from "../../constants/Config";
import { checkAuth, disconnectWallet } from "../onChain/authFunction";

const API_URL = APPCONFIG.API_BASE_URL;

export function apiRequest(
  REQUEST_URL: string,
  METHOD: string,
  DATA: {},
  HEADER: {}
) {
  if (HEADER == "authenticated") {
    const authName = "auth.session";
    // JWTToken = checkAuth(authName);
    if (checkAuth(authName) == null) {
      disconnectWallet();
    }
    const JWTToken = JSON.parse(checkAuth(authName));
    HEADER = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JWTToken}`,
    };
  } else if (HEADER == "authenticated_and_form_data") {
    const authName = "auth.session";
    // JWTToken = checkAuth(authName);
    if (checkAuth(authName) == null) {
      disconnectWallet();
    }
    const JWTToken = JSON.parse(checkAuth(authName));
    HEADER = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${JWTToken}`,
    };
  } else {
    HEADER = {
      "Content-Type": "application/json",
    };
  }
  return axios({
    method: METHOD,
    url: API_URL + REQUEST_URL,
    data: DATA,
    headers: HEADER,
    withCredentials: false,
  })
    .then(function (response) {
      //handle success
      return response;
    })
    .catch(function (err) {
      //handle error
      return err.response;
    });
  // return response;
}

export const uploadFile = async (
  file: { name: string; type: string },
  toast: any
) => {
  let { data } = await axios.post("/api/s3/uploadFile", {
    name: file.name,
    type: file.type,
  });
  //fetching out an URL
  const url = data.url;

  if (url) {
    toast("Please wait, while your image load");
  }
  //uploading file
  let res = await axios.put(url, file, {
    headers: {
      "Content-type": file.type,
    },
  });

  const imgUrl = url.split("?")[0];

  return { imgUrl };
};
