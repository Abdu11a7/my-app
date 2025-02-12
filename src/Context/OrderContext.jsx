/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { createContext } from "react";

export const OrderContext = createContext();

export default function OrderContextProvider({ children }) {
  const headers = {
    token: localStorage.getItem("userToken"),
  };

  function userCheckout(cartId, url, cartInfo) {
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
      {
        shippingAddress: cartInfo,
      },
      { headers }
    );
  }

  function getAllOrders(cartId) {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${cartId}`)
      .then((res) => res)
      .catch((err) => err);
  }

  return (
    <OrderContext.Provider value={{ userCheckout, getAllOrders }}>
      {children}
    </OrderContext.Provider>
  );
}
