/* eslint-disable react/prop-types */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function WishListProducts() {
  const [products, setProducts] = useState([]);

  const [productID, setProductID] = useState(null);
  const [isAdded, setIsAdded] = useState(false);
  const { addProductsToCart, getUserCart, numOfCartItems, setNumOfCartItems } =
    useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);

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

  function productDetails() {
    setIsLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "success") {
          setProducts(res.data.data);
        }
        setIsLoading(false);
      })
      .catch((res) => console.log(res));
  }

  function handelDeleteWishItem(productId) {
    axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((res) => {
        if (res.data.status === "success") {
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== productId)
          );

          toast.success(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    productDetails();
  }, []);

  return (
    <>
      {" "}
      {isLoading ? (
        <div className="spinner"></div>
      ) : (
        <>
          {products.length > 0 ? (
            <main>
              <header>
                <h1 className="text-[#0aad0a] leading-relaxed mt-5 uppercase text-center text-3xl tracking-widest">
                  Your <br /> Wish List.
                </h1>
              </header>
              <section className="row">
                {products.map((product) => (
                  <Product
                    product={product}
                    onAddToCart={handelAddTocart}
                    isLoading={isLoading}
                    isAdded={isAdded}
                    productID={productID}
                    onDeleteWishItem={handelDeleteWishItem}
                    key={product.id}
                  />
                ))}
              </section>
            </main>
          ) : (
            <h3 className="text-[#0aad0a] leading-relaxed mt-5 uppercase text-center text-3xl tracking-widest">
              No WishList To Show
            </h3>
          )}{" "}
        </>
      )}
    </>
  );
}

function Product({
  product,
  isAdded,
  onAddToCart,
  productID,
  onDeleteWishItem,
}) {
  return (
    <div className="product w-full text-center sm:text-left sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2 ">
      <article className="border  border-solid relative border-[#cccccc6b] hover:border-[#0aad0a] hover:shadow-lg rounded-md p-2 sm:p-3 md:p-4 lg:p-5 transition-all">
        <i
          onClick={() => onDeleteWishItem(product?.id)}
          className="fa-solid fa-heart-circle-xmark fa-2x text-[#0aad0a] cursor-pointer absolute top-0 right-0"></i>
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
