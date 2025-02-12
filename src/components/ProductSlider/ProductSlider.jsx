import slideOne from "../../assets/slider-image-1.jpeg";
import slideTwo from "../../assets/slider-image-2.jpeg";
import slideThree from "../../assets/slider-image-3.jpeg";
import bannerOne from "../../assets/grocery-banner.png";
import bannerTwo from "../../assets/grocery-banner-2.jpeg";
import Slider from "react-slick";

export default function ProductSlider() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };
  return (
    <section className="hidden md:flex md:row">
      <div className="slider w-3/4">
        <Slider {...settings}>
          <img
            src={slideOne}
            className="w-full h-[400px] object-cover"
            alt="Image Slider One For Products"
          />
          <img
            src={slideTwo}
            className="w-full h-[400px] object-cover"
            alt="Image Slider One For Products"
          />
          <img
            src={slideThree}
            className="w-full h-[400px] object-cover"
            alt="Image Slider One For Products"
          />
        </Slider>
      </div>
      <div className="banners w-1/4">
        <div className="banner">
          <img
            src={bannerOne}
            className="w-full h-[200px] object-cover"
            alt="Banner Slider For Products"
          />
        </div>
        <div className="banner">
          <img
            src={bannerTwo}
            className="w-full h-[200px] object-cover"
            alt="Banner Slider For Products"
          />
        </div>
      </div>
    </section>
  );
}
