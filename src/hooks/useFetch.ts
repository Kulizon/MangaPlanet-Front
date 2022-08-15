import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { UserStateInterface } from "../store/user";

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<any>();

  // user access key, necessary for POST/PUT/DELETE requests
  const jwt = useSelector((state: { user: UserStateInterface }) => state.user.jwt);

  const getData = useCallback(async (url: string, method: "GET" | "POST" | "PUT" | "DELETE" = "GET", options?: any) => {
    let receivedData;
    try {
      setLoading(true);
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/plain, */*",
          Authorization: `Bearer ${jwt}`,
        },
        ...options,
      });
      receivedData = await response.json();
      setData(receivedData);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
    }
    return receivedData;
  }, [jwt]);

  return [loading, error, data, getData];
};

export default useFetch;
