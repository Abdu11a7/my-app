/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Categories() {
  const [allCategories, setAllCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  function getAllCategories() {
    setIsLoading(true);

    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        console.log(res);
        setAllCategories(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => err);
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  console.log(allCategories);
  return (
    <>
      {isLoading ? (
        <div className="spinner"></div>
      ) : (
        <main>
          <header>
            <h1 className="text-[#0aad0a] leading-relaxed mt-5 uppercase text-center text-3xl tracking-widest">
              Our <br /> Categories.
            </h1>
          </header>
          <section className="row">
            {allCategories?.map((category) => (
              <Category category={category} key={category?._id} />
            ))}
          </section>
        </main>
      )}
    </>
  );
}

function Category({ category }) {
  return (
    <div className="category w-full sm:text-left sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5  p-2">
      <article className="border border-solid border-[#cccccc6b] hover:border-[#0aad0a] hover:shadow-lg rounded-md p-4 sm:p-3 md:p-4 lg:p-5 transition-all">
        <Link to={`categorydetails/${category?._id}/${category?.name}`}>
          <figure>
            <img
              src={category?.image}
              className="w-[70%] h-[200px] object-cover mx-auto sm:w-full"
              alt={`This is ${category?.name}`}
            />
            <figcaption>
              <p className="text-base  text-center font-medium text-[#0aad0a]">
                {category?.name}
              </p>
            </figcaption>
          </figure>
        </Link>
      </article>
    </div>
  );
}

{
  /* <button
onClick={() => onAddToCart(product.id)}
className="btn hover:bg-[#23b223]">
{isAdded && productID === product.id ? (
  <i className="fas fa-spinner fa-spin"></i>
) : (
  "Add to cart"
)}
</button> */
}
