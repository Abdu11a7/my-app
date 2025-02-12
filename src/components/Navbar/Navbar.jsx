import { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/freshcart-logo.svg";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  const { userLogin, setUserLogin } = useContext(UserContext);
  const { numOfCartItems } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  function handleTitle(link) {
    document.title = link;
  }
  function handleSignout() {
    setUserLogin(null);
    localStorage.removeItem("userToken");
    navigate("/login");
    handleTitle("Login");
  }

  return (
    <nav className="z-50 bg-[#f8f9fa] fixed top-0 left-0 right-0 border-gray-200">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4 gap-2">
        <div className="flex justify-between items-center w-full md:w-auto">
          <Link to="" className="flex items-center space-x-3">
            <img src={logo} className="h-8" alt="Freshcart Logo" />
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        <div
          className={`md:flex ${
            isOpen ? "block" : "hidden"
          } w-full gap-3 md:w-auto`}>
          {userLogin && (
            <ul className="flex flex-col md:flex-row items-center gap-3">
              <li>
                <NavLink
                  onClick={() => handleTitle("Home")}
                  className="text-lg text-[#707071] hover:text-[#0aad0a]"
                  to="">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={() => handleTitle("Cart")}
                  className="text-lg text-[#707071] hover:text-[#0aad0a]"
                  to="cart">
                  Cart
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={() => handleTitle("Products")}
                  className="text-lg text-[#707071] hover:text-[#0aad0a]"
                  to="products">
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={() => handleTitle("Categories")}
                  className="text-lg text-[#707071] hover:text-[#0aad0a]"
                  to="categories">
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={() => handleTitle("Brands")}
                  className="text-lg text-[#707071] hover:text-[#0aad0a]"
                  to="brands">
                  Brands
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={() => handleTitle("Cart")}
                  className="text-lg text-[#707071] hover:text-[#0aad0a]"
                  to="cart">
                  <i className="fas fa-cart-shopping relative">
                    <span className="absolute text-xs text-[#0aad0a] -top-[60%] -right-1/3">
                      {numOfCartItems}
                    </span>
                  </i>
                </NavLink>
              </li>
            </ul>
          )}
          <div className="flex flex-col md:flex-row items-center space-x-6 md:space-x-6 mt-4 md:mt-0">
            <ul className="flex gap-2 items-center">
              <li>
                <i className="fab cursor-pointer hover:text-[#0aad0a] fa-lg fa-instagram"></i>
              </li>
              <li>
                <i className="fab cursor-pointer hover:text-[#0aad0a] fa-lg fa-facebook"></i>
              </li>
              <li>
                <i className="fab cursor-pointer hover:text-[#0aad0a] fa-lg fa-tiktok"></i>
              </li>
              <li>
                <i className="fab cursor-pointer hover:text-[#0aad0a] fa-lg fa-twitter"></i>
              </li>
              <li>
                <i className="fab cursor-pointer hover:text-[#0aad0a] fa-lg fa-linkedin"></i>
              </li>
              <li>
                <i className="fab cursor-pointer hover:text-[#0aad0a] fa-lg fa-youtube"></i>
              </li>
            </ul>
            <ul className="flex gap-2">
              {userLogin !== null ? (
                <li>
                  <Link
                    to="/login"
                    onClick={handleSignout}
                    className="text-white bg-[#0aad0a] hover:bg-[#099409] focus:ring-4 focus:outline-none focus:ring-[#09ed092b] font-medium rounded-lg text-lg  inline-block my-2 sm:my-0  sm:w-auto px-3 py-1.5 text-center">
                    Logout
                  </Link>
                </li>
              ) : (
                <>
                  <li>
                    <Link
                      onClick={() => handleTitle("Login")}
                      className="text-white bg-[#0aad0a] hover:bg-[#099409] focus:ring-4 focus:outline-none focus:ring-[#09ed092b] font-medium rounded-lg text-lg inline-block my-2 sm:my-0  sm:w-auto px-3 py-1.5 text-center"
                      to="login">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => handleTitle("Register")}
                      className="text-white bg-[#0aad0a] hover:bg-[#099409] focus:ring-4 focus:outline-none focus:ring-[#09ed092b] font-medium rounded-lg text-lg inline-block my-2 sm:my-0 sm:w-auto px-3 py-1.5 text-center"
                      to="register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
