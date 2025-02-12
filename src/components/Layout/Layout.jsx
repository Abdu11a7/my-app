import Footer from "./../Footer/Footer";
import Navbar from "./../Navbar/Navbar";
import { Outlet } from "react-router-dom";
export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="container m-auto px-5 my-11 py-20">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
