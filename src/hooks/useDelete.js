import axios from "axios";
import { useState } from "react";

function useDelete(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const deleteData = async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.delete(`${url}/${id}`, {
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

  return { deleteData, data, isLoading, error, success };
}

export default useDelete;
