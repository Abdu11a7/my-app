import { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/freshcart-logo.svg";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
import { Menu, X } from "lucide-react";

export default function TestNav() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNav = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();
  function handleTitle(link) {
    document.title = link;
  }
  const { userLogin, setUserLogin } = useContext(UserContext);
  const { numOfCartItems } = useContext(CartContext);

  function handleSignout() {
    setUserLogin(null);
    localStorage.removeItem("userToken");
    navigate("/login");
    handleTitle("Login");
  }

  return (
    <header className="sticky bg-[#f8f9fa] top-0 z-[20] mx-auto flex-wrap w-full flex items-center justify-between p-8">
      <Link to="" className="w-1/4">
        <img src={logo} className="h-8" alt="Freshcart Logo" />
      </Link>

      <nav className="flex w-3/4 justify-end">
        {userLogin && (
          <ul className="hidden lg:flex w-full justify-between items-center">
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
                <i className="fas fa-cart-shopping ml-1 relative">
                  <span className="absolute text-xs text-[#0aad0a] -top-[60%] -right-1/3">
                    {numOfCartItems}
                  </span>
                </i>
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
                onClick={() => handleTitle("Wish List")}
                className="text-lg text-[#707071] hover:text-[#0aad0a]"
                to="wishlist">
                Wish List
              </NavLink>
            </li>
          </ul>
        )}
        <div className="hidden lg:flex w-3/4 justify-evenly items-center">
          <ul className="flex gap-3 items-center">
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
        <div className="lg:hidden">
          <button onClick={toggleNav}>{isOpen ? <X /> : <Menu />}</button>
        </div>
      </nav>

      {isOpen && (
        <>
          {userLogin && (
            <ul className="flex gap-2 lg:hidden flex-col basis-full items-center">
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
                  <i className="fas fa-cart-shopping ml-1 relative">
                    <span className="absolute text-xs text-[#0aad0a] -top-[60%] -right-1/3">
                      {numOfCartItems}
                    </span>
                  </i>
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
                  onClick={() => handleTitle("Wish List")}
                  className="text-lg text-[#707071] hover:text-[#0aad0a]"
                  to="wishlist">
                  Wish List
                </NavLink>
              </li>
            </ul>
          )}

          <div className="flex lg:hidden flex-col basis-full items-center">
            <ul className="flex py-3 lg:py-0 gap-5 items-center">
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
                    className="text-white bg-[#0aad0a] hover:bg-[#099409] focus:ring-4 focus:outline-none focus:ring-[#09ed092b] font-medium rounded-lg text-lg inline-block my-2 sm:my-0  sm:w-auto px-3 py-1.5 text-center">
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
        </>
      )}
    </header>
  );
}
