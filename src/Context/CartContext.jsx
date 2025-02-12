/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cartUserId, setCartUserId] = useState(null);
  const [numOfCartItems, setNumOfCartItems] = useState(null);
  const headers = {
    token: localStorage.getItem("userToken"),
  };
  function addProductsToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,

        { productId },
        { headers }
      )
      .then((res) => {
        localStorage.setItem("ownerId", res.data.data.cartOwner);
        return res;
      })
      .catch((err) => err);
  }

  function getUserCart() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", { headers })
      .then((res) => {
        setCartUserId(res.data.data._id);
        setNumOfCartItems(res.data.numOfCartItems);
        return res;
      })
      .catch((err) => err);
  }

  useEffect(() => {
    getUserCart();
  }, []);

  function updateUserCart(productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  function deleteUserProduct(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  function deleteAllUserProducts() {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers,
    });
  }

  return (
    <CartContext.Provider
      value={{
        addProductsToCart,
        getUserCart,
        updateUserCart,
        deleteUserProduct,
        deleteAllUserProducts,
        cartUserId,
        numOfCartItems,
        setNumOfCartItems,
      }}>
      {children}
    </CartContext.Provider>
  );
}
