import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useAPI(apiLink, key) {
  function getData() {
    return axios.get(apiLink);
  }
  const ProductInfo = useQuery({
    queryKey: [key],
    queryFn: getData,
    staleTime: 1000 * 60,
    retry: 4,
    retryDelay: 4000,
  });
  return ProductInfo;
}
