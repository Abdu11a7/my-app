import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CategoryDetails() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const [category, setCategory] = useState(null);

  console.log(id);

  function categoryDetails(id) {
    setIsLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
      .then((res) => {
        setCategory(res.data.data);
        console.log(res.data.data);
        setIsLoading(false);

        document.title = `Categories ${res.data.data.name}`;
      })
      .catch((res) => console.log(res));
  }

  useEffect(() => {
    categoryDetails(id);
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
                src={category?.image}
                alt={category?.name}
                className="w-[60%] mx-auto"
              />
              <figcaption>
                <h2 className="text-2xl my-4  text-center font-medium text-[#0aad0a]">
                  {category?.name}
                </h2>
              </figcaption>
            </figcaption>
          </article>
        </main>
      )}
    </>
  );
}
