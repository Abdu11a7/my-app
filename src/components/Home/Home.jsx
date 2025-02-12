import RescentProducts from "../RecentProducts/RescentProducts";
import CategorySlider from "./../CategorySlider/CategorySlider";
import ProductSlider from "./../ProductSlider/ProductSlider";
export default function Home() {
  document.title = "Home";
  return (
    <>
      <ProductSlider />
      <CategorySlider />
      <RescentProducts />
    </>
  );
}
