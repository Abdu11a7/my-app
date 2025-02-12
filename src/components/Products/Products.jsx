/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import useAPI from "../../Hooks/useAPI";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";

export default function Products() {
  const { addProductsToCart, getUserCart, numOfCartItems, setNumOfCartItems } =
    useContext(CartContext);
  const [isAdded, setIsAdded] = useState(false);
  const [productID, setProductID] = useState(null);
  const { data, isError, isLoading, error } = useAPI(
    `https://ecommerce.routemisr.com/api/v1/products`,
    "categoryProduct"
  );

  async function handelAddTocart(id) {
    setIsAdded(true);
    setProductID(id);
    const cartRes = await getUserCart();

    const isAlreadyInCart = cartRes.data.data.products.some(
      (item) => item.product._id === id
    );
    if (isAlreadyInCart) {
      toast.error("This product is already in your cart.");
      setIsAdded(false);
    } else {
      const res = await addProductsToCart(id);

      if (res.data.status === "success") {
        toast.success(res.data.message);
        setNumOfCartItems(numOfCartItems + 1);
      } else {
        toast.error(res.data.message);
      }
    }
    setIsAdded(false);
  }

  return (
    <>
      {isLoading ? (
        <div className="spinner"></div>
      ) : isError ? (
        <Error>
          <h2 className="text-3xl text-center text-[#0aad0a] font-semibold">
            {error?.message}
          </h2>
        </Error>
      ) : (
        <main>
          <header>
            <h1 className="text-[#0aad0a] leading-relaxed mt-5 uppercase text-center text-3xl tracking-widest">
              Our <br /> Products.
            </h1>
          </header>
          <section className="row">
            {data?.data?.data?.map((product) => (
              <Product
                product={product}
                key={product.id}
                onAddToCart={handelAddTocart}
                isAdded={isAdded}
                productID={productID}
              />
            ))}
          </section>
        </main>
      )}
    </>
  );
}

function Product({ product, onAddToCart, isAdded, productID }) {
  return (
    <div className="product w-full text-center sm:text-left sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2 ">
      <article className="border border-solid border-[#cccccc6b] hover:border-[#0aad0a] hover:shadow-lg rounded-md p-2 sm:p-3 md:p-4 lg:p-5 transition-all">
        <Link to={`/productdetails/${product?.id}/${product?.category?.name}`}>
          <figure>
            <img
              src={product?.imageCover}
              className="w-full"
              alt={`This is ${product?.title}`}
            />
            <figcaption>
              <p className="text-base font-medium text-[#0aad0a]">
                {product?.category?.name}
              </p>
              <h3 className="font-semibold text-lg">
                {product?.title?.split(" ")?.slice(0, 2)?.join(" ")}
              </h3>
            </figcaption>
          </figure>
          <div className="flex justify-between items-center mt-3">
            <span className="text-lg">{product.price} EGP</span>
            <span className="flex gap-1 items-center">
              <i className="fas fa-star text-yellow-400"></i>
              <em className="text-lg font-normal text-gray-600">
                {product.ratingsAverage}
              </em>
            </span>
          </div>
        </Link>
        <button
          onClick={() => onAddToCart(product?.id)}
          className="btn hover:bg-[#23b223]">
          {isAdded && productID === product?.id ? (
            <i className="fas fa-spinner fa-spin"></i>
          ) : (
            "Add to cart"
          )}
        </button>
      </article>
    </div>
  );
}

function Error({ children }) {
  return <header>{children}</header>;
}
