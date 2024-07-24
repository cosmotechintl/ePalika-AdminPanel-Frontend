import { useEffect, useState } from "react";

const useFetch = (url, requestMethod) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await requestMethod.get(url);
        setData(res.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [url, requestMethod]);

  const refetch = async () => {
    setLoading(true);
    try {
      const res = await requestMethod.get(url);
      setData(res.data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };
  return { data, loading, error, refetch };
};
export default useFetch;
