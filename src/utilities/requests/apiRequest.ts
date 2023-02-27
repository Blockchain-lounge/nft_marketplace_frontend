import axios from "axios";
import { baseUrl } from "../auth";

declare global {
  interface window {
    localStorage: Storage;
  }
}

let token: string | null;

if (typeof window !== "undefined") {
  token = window.localStorage.getItem("token");
  // console.log({ token });
}

const apiPost = async (endpoint: string, params: Record<string, unknown>) => {
  // console.log({ token });
  // console.log({ params });
  const result = await axios.post(`${baseUrl}/api${endpoint}`, params, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });
  return result.data;
};

const apiGet = async (endpoint: string) => {
  // console.log({ token });

  const result = await axios.post(`${baseUrl}/api${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return result.data;
};

export { apiGet, apiPost };
