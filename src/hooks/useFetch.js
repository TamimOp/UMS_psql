import axios from "axios";
import { useCallback, useEffect, useState } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(url);
      setData(response.data);
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Something went wrong");
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, success, refetch: fetchData };
}

export default useFetch;
