/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Brands() {
  const [allBrands, setAllBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  function getAllBrands() {
    setIsLoading(true);

    axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then((res) => {
        console.log(res);
        setAllBrands(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => err);
  }

  useEffect(() => {
    getAllBrands();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="spinner"></div>
      ) : (
        <main>
          <header>
            <h1 className="text-[#0aad0a] leading-relaxed mt-5 uppercase text-center text-3xl tracking-widest">
              Our <br /> Brands.
            </h1>
          </header>
          <section className="row">
            {allBrands?.map((brand) => (
              <Brand brand={brand} key={brand?._id} />
            ))}
          </section>
        </main>
      )}
    </>
  );
}

function Brand({ brand }) {
  return (
    <div className="brand w-full sm:text-left sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5  p-2">
      <article className="border border-solid border-[#cccccc6b] hover:border-[#0aad0a] hover:shadow-lg rounded-md p-4 sm:p-3 md:p-4 lg:p-5 transition-all">
        <Link to={`brandsdetails/${brand?._id}/${brand?.name}`}>
          <figure>
            <img
              src={brand?.image}
              className="w-[70%]  mx-auto sm:w-full"
              alt={`This is ${brand?.name}`}
            />
            <figcaption>
              <p className="text-base  text-center font-medium text-[#0aad0a]">
                {brand?.name}
              </p>
            </figcaption>
          </figure>
        </Link>
      </article>
    </div>
  );
}
