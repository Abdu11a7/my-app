import PaymentImgOne from "../../assets/paypal.e3abf7ded251409784b6.png";
import PaymentImgTwo from "../../assets/americanexpress.23e3b98512ffad5d0ad1.png";
import PaymentImgThree from "../../assets/mastercard.c1c3f1e9c8aad6e536df.png";
import AppImgOne from "../../assets/appstore.11156c0c81561772662d.png";
import AppImgTwo from "../../assets/googleplay.88c0cf672ae4dd873d7f.png";
export default function Footer() {
  return (
    <footer className="bg-[#f0f3f2] text-gray-700 p-8 w-full">
      <header>
        <h2 className="text-4xl font-semibold">Get The FreshCart App</h2>
        <h4 className="text-lg my-4">
          We will send you a link, Open it in your phone to download App
        </h4>
      </header>
      <form action="" className="row items-center justify-between gap-3">
        <input
          className="focus:outline-none w-full md:w-[65%] focus:border-[#09ed09fd] rounded-lg text-lg px-4 py-2.5"
          type="email"
          placeholder="Enter Your Email"
          required
        />
        <button
          type="button"
          className="text-white mx-auto bg-[#0aad0a] hover:bg-[#099409] focus:ring-4 focus:outline-none focus:ring-[#09ed092b] font-medium rounded-lg text-lg w-full md:w-[30%] px-5 py-2.5">
          Share App Link
        </button>
      </form>
      <hr />

      <article className="row py-[0!important] items-centerjustify-between">
        <div className="payment py-[0!important] mx-auto row items-center">
          <h5>Payment Partners</h5>
          <img
            className="w-[5rem] cursor-pointer object-cover"
            src={PaymentImgOne}
            alt="paypal link photo"
          />
          <img
            className="w-[5rem] cursor-pointer object-cover"
            src={PaymentImgTwo}
            alt="americanexpress link photo"
          />
          <img
            className="w-[5rem] cursor-pointer object-cover"
            src={PaymentImgThree}
            alt="mastercard link photo"
          />
        </div>
        <div className="apps py-[0!important] mx-auto row items-center">
          <h5>Get deliveries with FreshCart</h5>
          <img
            className="w-[9rem] cursor-pointer object-cover"
            src={AppImgOne}
            alt="appstore link photo"
          />
          <img
            className="w-[9rem] cursor-pointer object-cover"
            src={AppImgTwo}
            alt="googleplay link photo"
          />
        </div>
      </article>
      <h6 className="text-center">
        Copy Right 2025 &copy; By{" "}
        <strong className="text-[#0aad0a]">Abdullah Elsawy</strong> All Rights
        Reserved
      </h6>
    </footer>
  );
}
