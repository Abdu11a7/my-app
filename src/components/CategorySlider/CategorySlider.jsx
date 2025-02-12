/* eslint-disable react/prop-types */

// import { useEffect, useState } from "react";
import Slider from "react-slick";
import useAPI from "./../../Hooks/useAPI";
export default function CategorySlider() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 1000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  const { data } = useAPI(
    `https://ecommerce.routemisr.com/api/v1/categories`,
    "getAllCategories"
  );

  return (
    <section className="my-9">
      <header>
        <h2 className="text-center text-2xl text-[#233e23] font-semibold">
          Shop Popular Categories
        </h2>
      </header>
      <Slider {...settings}>
        {data?.data?.data.map((cartegory) => (
          <Category cartegory={cartegory} key={cartegory._id} />
        ))}
      </Slider>
    </section>
  );
}

function Category({ cartegory }) {
  return (
    <figure className="px-1 py-9">
      <img
        src={cartegory?.image}
        className="w-full h-[200px] object-cover"
        alt={cartegory?.name}
      />
      <figcaption className="text-[#233e23] py-2 text-center font-semibold">
        {cartegory?.name}
      </figcaption>
    </figure>
  );
}
