import axios from "axios";

import FormData from "form-data";

import APPCONFIG from "../../constants/Config";
import { checkAuth, disconnectWallet } from "../onChain/authFunction";

const { API_BASE_URL } = APPCONFIG;

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
    url: API_BASE_URL + REQUEST_URL,
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

export const uploadFile = async (file: File, toast: any) => {
  const reader = new FileReader();
  //creating a promise to process the conversion of the image to base 64
  const base64DataPromise = new Promise<string>((resolve, reject) => {
    reader.onload = () => {
      const base64Data = reader.result?.toString().split(",")[1] ?? "";
      resolve(base64Data);
    };
    reader.onerror = () => {
      reject(reader.error);
    };
  });

  reader.readAsDataURL(file);

  const base64Data = await base64DataPromise;

  if (base64Data) {
    toast("Please wait while your image load");
  }

  // Send the base64-encoded file to the server
  const response = await fetch("/api/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fileName: file.name, data: base64Data }),
  });

  const { imgUrl } = await response.json();

  return { imgUrl };
};
