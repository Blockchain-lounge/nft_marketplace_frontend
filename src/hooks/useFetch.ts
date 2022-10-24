import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../utilities/auth";

export const UseFetch = (endpoint: string) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
      .get(`${baseUrl}/api${endpoint}`)
      .then((res) => setData(res.data.data))
      .catch((err) => setError(err.message))
      .finally(() => setIsloading(false));
  }, [endpoint]);

  return [data, isLoading, error];
};

export default UseFetch;
