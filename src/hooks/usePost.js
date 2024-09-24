import axios from "axios";
import { useState } from "react";

function usePost(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const postData = async (body) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(url, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setData(response.data);
      setSuccess(true);
    } catch (err) {
      setError(err.response ? err.response.data : err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { postData, data, isLoading, error, success };
}

export default usePost;
