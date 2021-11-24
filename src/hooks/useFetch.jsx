import { useEffect, useState } from "react";

const APIKEY = import.meta.env.VITE_GIPHY_API;
const useFetch = ({ keyword }) => {
  const [state, setState] = useState({
    data: [],
    loading: true,
    error: null,
  });

  const fetchGifs = async () => {
    setState((prev) => ({ ...prev, loading: true }));

    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=${keyword}&limit=5`
      );
      const data = await response.json();
      setState((prev) => ({ ...prev, data: data.data, loading: false }));
    } catch (error) {
      console.log(error);
      setState((prev) => ({ ...prev, error }));
    }
  };

  useEffect(() => {
    fetchGifs();
  }, [keyword]);
  return { loading: state.loading, data: state.data, error: state.error };
};
export default useFetch;
