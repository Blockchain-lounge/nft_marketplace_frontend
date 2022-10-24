import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../utilities/auth";

type endpoint = string;
type endPointParams = Record<string, unknown>;

export const UseAuth = (endpoint: endpoint) => {
  //   const [token, setToken] = useState<null | string>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, []);

  //   const handleRequest = useCallback(
  //     (params?: endPointParams) => {
  //       switch (reqType) {
  //         case "get":
  //           return axios
  //             .get(`${baseUrl}/api${endpoint}`)
  //             .then((res) => res.data)
  //             .catch((err) => err.message);

  //         case "post":
  //           return axios
  //             .post(`${baseUrl}/api${endpoint}`, params)
  //             .then((res) => res.data)
  //             .catch((err) => err.message);

  //         default:
  //           null;
  //           break;
  //       }
  //       // eslint-disable-next-line react-hooks/exhaustive-deps
  //     },
  //     [endpoint, reqType]
  //   );

  const handleRequest = (params?: endPointParams) =>
    axios
      .post(`${baseUrl}/api${endpoint}`, params)
      .then((res) => res.data)
      .catch((err) => err.message);

  return [handleRequest];
};

export default UseAuth;
