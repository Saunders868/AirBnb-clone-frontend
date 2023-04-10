import { useEffect, useState } from "react";
import { axiosFetch } from "../utils/fetch";
import { toast } from "react-toastify";

const useAxios = ({ url, headers, data, params }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axiosFetch({
        method: "get",
        url,
        params,
        data,
        headers,
      });

      if (res.status === 200) {
        setResponse(res.responseData);
        toast.success("Data loaded successfully!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        
      }

      if (res.status !== 200) {
        setError(res.data.err ? res.data.err : "A server error occured");        
        toast.error(error, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      setLoading(false);
    };

    fetchData();
  }, []);
  return {
    loading,
    response,
    error,
  };
};

export default useAxios;
