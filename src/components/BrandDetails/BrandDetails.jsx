import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BrandDetails() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const [brand, setBrand] = useState(null);

  console.log(id);

  function brandDetails(id) {
    setIsLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
      .then((res) => {
        setBrand(res.data.data);
        console.log(res.data.data);
        setIsLoading(false);

        document.title = `Brands ${res.data.data.name}`;
      })
      .catch((res) => console.log(res));
  }

  useEffect(() => {
    brandDetails(id);
  }, [id]);

  return (
    <>
      {isLoading ? (
        <div className="spinner"></div>
      ) : (
        <main className="mt-14">
          <article>
            <figcaption>
              <img
                src={brand?.image}
                alt={brand?.name}
                className="w-[60%] mx-auto"
              />
              <figcaption>
                <h2 className="text-2xl my-4  text-center font-medium text-[#0aad0a]">
                  {brand?.name}
                </h2>
              </figcaption>
            </figcaption>
          </article>
        </main>
      )}
    </>
  );
}
