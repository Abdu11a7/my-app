/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function RelatedProducts({ onAddToCart, isAdded, productID }) {
  const { id, category } = useParams();
  const [relatedProducts, setRelatedProducts] = useState([]);

  function getAllProducts(category, id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`).then((res) => {
      setRelatedProducts(
        res.data.data.filter(
          (pro) => pro?.category?.name === category && pro.id !== id
        )
      );
    });
  }

  useEffect(() => {
    getAllProducts(category, id);
  }, [category, id]);

  return (
    <main>
      <header>
        <h1 className="text-[#0aad0a] leading-relaxed mt-5 uppercase text-center text-3xl tracking-widest">
          Related <br /> Products.
        </h1>
      </header>
      <section className="row">
        {relatedProducts.map((product) => (
          <RelatedProduct
            product={product}
            onAddToCart={onAddToCart}
            isAdded={isAdded}
            productID={productID}
            key={product.id}
          />
        ))}
      </section>
    </main>
  );
}

function RelatedProduct({ product, onAddToCart, isAdded, productID }) {
  return (
    <article className="product w-full text-center sm:text-left sm:w-1/2  md:w-1/3 lg:w-1/4 xl:w-1/6 p-4">
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
              {product?.title.split(" ").slice(0, 2).join(" ")}
            </h3>
          </figcaption>
        </figure>
        <div className="flex justify-between items-center mt-3">
          <span className="text-lg">{product?.price} EGP</span>
          <span className="flex gap-1 items-center">
            <i className="fas fa-star text-yellow-400"></i>
            <em className="text-lg font-normal text-gray-600">
              {product?.ratingsAverage}
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
  );
}
