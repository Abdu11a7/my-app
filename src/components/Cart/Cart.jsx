/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";

import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function CartProducts() {
  const {
    getUserCart,
    updateUserCart,
    deleteUserProduct,
    deleteAllUserProducts,
    numOfCartItems,
    setNumOfCartItems,
  } = useContext(CartContext);
  const [cartDetails, setDetailsCart] = useState(null);
  const [loadingProducts, setLoadingProducts] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  async function getCart() {
    setIsLoading(true);
    const res = await getUserCart();
    console.log(res.data.data);
    if (res.data.status === "success") {
      setDetailsCart(res.data.data);
      setIsLoading(false);
    }
    setIsLoading(false);
  }

  async function updateProduct(id, count) {
    setLoadingProducts((prev) => ({ ...prev, [id]: true }));
    const res = await updateUserCart(id, count);

    console.log(res, id);

    if (res.data.status === "success") {
      setDetailsCart(res.data.data);
      toast.success("Product Updated Successfully");
    } else {
      toast.error("Product Does Not Updated");
    }
    setLoadingProducts((prev) => ({ ...prev, [id]: false }));
  }

  async function handelDeleteProduct(id) {
    const res = await deleteUserProduct(id);
    console.log(res.data);
    if (res.data.status === "success") {
      toast.success("Product Deleted Successfully");
      setDetailsCart(res.data.data);
      setNumOfCartItems(numOfCartItems - 1);
    } else {
      toast.error("Product Does Not Deleted");
    }
  }

  async function handelDeleteAllProducts() {
    setIsDeleted(true);
    const res = await deleteAllUserProducts();
    if (res.data.message === "success") {
      setIsDeleted(false);
      setDetailsCart(null);
      setNumOfCartItems(0);
    }

    setIsDeleted(false);
  }

  useEffect(() => {
    getCart();
  }, []);

  console.log(cartDetails);

  return (
    <>
      <header>
        <h1 className="text-[#0aad0a] leading-relaxed mt-5 uppercase text-center text-3xl tracking-widest">
          Your Cart.
        </h1>
      </header>
      {isLoading ? (
        <div className="spinner"></div>
      ) : cartDetails?.products.length > 0 ? (
        <div className="relative overflow-x-scroll mt-7 shadow-md sm:rounded-lg">
          <header className="text-center text-4xl font-extralight my-4 py-4 row gap-5 justify-around">
            <h2 className="text-[#0aad0a]">
              Total Cart Price: {cartDetails?.totalCartPrice} EGP
            </h2>
            <Link to={"/checkout"}>
              <button
                type="button"
                className="text-white bg-[#0aad0a] hover:bg-[#099409] focus:ring-4 focus:outline-none focus:ring-[#09ed092b] font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center">
                Checkout Now
              </button>
            </Link>
          </header>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase text-center bg-[#f0f3f2]">
              <tr>
                <th scope="col" className="px-16 py-3">
                  Product Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cartDetails?.products.map((product) => (
                <ProductInfo
                  onUpdateProduct={updateProduct}
                  product={product}
                  loadingProducts={loadingProducts}
                  onDeleteProduct={handelDeleteProduct}
                  key={product.product.id}
                />
              ))}
            </tbody>
          </table>
          <div className="my-10 mx-auto delete text-center">
            {" "}
            <button
              onClick={handelDeleteAllProducts}
              type="button"
              className="text-white bg-[#0aad0a] hover:bg-[#099409] focus:ring-4 focus:outline-none focus:ring-[#09ed092b] font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center">
              {isDeleted ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                "Delete All"
              )}
            </button>
          </div>
        </div>
      ) : (
        <header className="text-center text-4xl mt-10 font-medium my-4 py-4">
          <h2 className="text-[#0aad0a]">No Products Added Yet</h2>
        </header>
      )}
    </>
  );
}

function ProductInfo({
  product,
  onUpdateProduct,
  loadingProducts,
  onDeleteProduct,
}) {
  return (
    <tr className="bg-white border-b transition-all border-gray-200 hover:bg-[#03611f0d]">
      <td className="p-4">
        <img
          src={product?.product.imageCover}
          className="w-16 md:w-32 max-w-full max-h-full"
          alt={product?.product.title}
        />
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900">
        {product?.product.title}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <button
            onClick={() =>
              onUpdateProduct(product.product.id, product.count - 1)
            }
            className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
            type="button">
            <span className="sr-only">Quantity button</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 2">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h16"
              />
            </svg>
          </button>
          <div>
            {/* <input
              type="number"
              step="1"
              id="first_product"
              className="bg-gray-50 w-14 border appearance-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6ec26e] focus:border-[#6ec26e] block px-2.5 py-1 focus-visible:outline-[#6ec26e] focus-visible:outline-2"
              // placeholder={product.count}
              required
              value={product.count}
            /> */}
            {loadingProducts[product.product.id] ? (
              <span className="loader"></span>
            ) : (
              <span>{product.count}</span>
            )}
          </div>
          <button
            onClick={() =>
              onUpdateProduct(product.product.id, product.count + 1)
            }
            className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
            type="button">
            <span className="sr-only">Quantity button</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 1v16M1 9h16"
              />
            </svg>
          </button>
        </div>
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900">
        {product.price} <em className="text-[#0aad0a]">EGP</em>
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900">
        {product.price * product.count} <em className="text-[#0aad0a]">EGP</em>
      </td>
      <td className="px-6 py-4">
        <span
          onClick={() => onDeleteProduct(product.product.id)}
          className="cursor-pointer font-medium text-[#0aad0a] hover:underline">
          Remove
        </span>
      </td>
    </tr>
  );
}
