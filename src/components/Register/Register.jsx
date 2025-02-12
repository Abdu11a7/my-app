import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function Register() {
  let { setUserLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handelRegister(formikObj) {
    setIsLoading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, formikObj)
      .then((res) => {
        setIsLoading((is) => !is);

        if (res.data.message == "success") {
          setApiError("");
          localStorage.setItem("userToken", res.data.token);
          setUserLogin(res.data.token);
          navigate("/");
        }
      })
      .catch((res) => {
        setIsLoading((is) => !is);
        setApiError(res.response.data.message);
      });
  }

  let validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, "Minmum Length Is 3")
      .max(10, "Maxmum Length Is 10")
      .required("Name Is Required"),
    email: yup
      .string()
      .email("Enter A Valid Email")
      .required("Email Is Required"),
    password: yup
      .string()
      .required("Password Is required")
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{6,16}$/,
        `Invalid password! Ensure it:
        Starts with an uppercase letter.
        Contains at least one number.
        Includes at least one special character (@, #, $, etc.).
        Has at least 6 characters.`
      ),
    rePassword: yup
      .string()
      .required("Repassword Is required")
      .oneOf([yup.ref("password")], "Password Do Not Match"),
    phone: yup
      .string()
      .required("Phone Is required")
      .matches(/^01[0125]\d{8}$/, "Enter A valid Phone Number"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handelRegister,
  });
  return (
    <>
      {apiError && (
        <div className="error bg-red-300 py-3 text-xl my-5 font-bold rounded-md mx-auto w-1/2 text-center text-red-800">
          <h3>{apiError}</h3>
        </div>
      )}
      <h2 className="text-center text-2xl text-[#0aad0a] my-5 font-bold">
        Register Now
      </h2>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            id="userName"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#0aad0a] peer"
            placeholder=" "
            // required
          />
          <label
            htmlFor="userName"
            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0aad0a]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Enter Your Name
          </label>

          {formik.errors.name && formik.touched.name ? (
            <div
              className="p-4 mb-4 text-sm text-red-800  bg-red-50"
              role="alert">
              <span className="font-medium">{formik.errors.name}</span>
            </div>
          ) : formik.touched.name && !formik.errors.name ? (
            <div
              className="p-4 mb-4 text-sm text-[#0aad0a]  bg-green-50"
              role="alert">
              <span className="font-medium">Name Is Valid</span>
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            id="userEmail"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#0aad0a] peer"
            placeholder=" "
            // required
          />
          <label
            htmlFor="userEmail"
            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0aad0a]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Enter Your Email
          </label>
          {formik.errors.email && formik.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800  bg-red-50"
              role="alert">
              <span className="font-medium">{formik.errors.email}</span>
            </div>
          ) : formik.touched.email && !formik.errors.email ? (
            <div
              className="p-4 mb-4 text-sm text-[#0aad0a]  bg-green-50"
              role="alert">
              <span className="font-medium">Email Is Valid</span>
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            id="userPass"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#0aad0a] peer"
            placeholder=" "
            // required
          />
          <label
            htmlFor="userPass"
            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0aad0a]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Enter Your Password
          </label>
          {formik.errors.password && formik.touched.password ? (
            <div
              className="p-4 mb-4 text-sm text-red-800  bg-red-50"
              role="alert">
              <span className="font-medium">{formik.errors.password}</span>
            </div>
          ) : formik.touched.password && !formik.errors.password ? (
            <div
              className="p-4 mb-4 text-sm text-[#0aad0a]  bg-green-50"
              role="alert">
              <span className="font-medium">Password Is Valid</span>
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="rePassword"
            id="userRePass"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#0aad0a] peer"
            placeholder=" "
            // required
          />
          <label
            htmlFor="userRePass"
            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0aad0a]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Repassword
          </label>
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div
              className="p-4 mb-4 text-sm text-red-800  bg-red-50"
              role="alert">
              <span className="font-medium">{formik.errors.rePassword}</span>
            </div>
          ) : formik.touched.rePassword && !formik.errors.rePassword ? (
            <div
              className="p-4 mb-4 text-sm text-[#0aad0a]  bg-green-50"
              role="alert">
              <span className="font-medium">Repassword Is Valid</span>
            </div>
          ) : null}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            name="phone"
            id="userPhone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#0aad0a] peer"
            placeholder=" "
            // required
          />
          <label
            htmlFor="userPhone"
            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0aad0a]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Phone
          </label>
          {formik.errors.phone && formik.touched.phone ? (
            <div
              className="p-4 mb-4 text-sm text-red-800  bg-red-50"
              role="alert">
              <span className="font-medium">{formik.errors.phone}</span>
            </div>
          ) : formik.touched.phone && !formik.errors.phone ? (
            <div
              className="p-4 mb-4 text-sm text-[#0aad0a]  bg-green-50"
              role="alert">
              <span className="font-medium">Phone Is Valid</span>
            </div>
          ) : null}
        </div>
        <div className="links flex flex-wrap gap-5 items-center">
          <button
            type="submit"
            className="text-white bg-[#0aad0a] hover:bg-[#099409] focus:ring-4 focus:outline-none focus:ring-[#09ed092b] rounded-lg font-medium  text-lg w-full sm:w-auto px-5 py-2.5 text-center">
            {isLoading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "Register"
            )}
          </button>
          <span className="text-lg">
            Do You Have An Account?
            <Link
              to="/login"
              className="w-full text-center sm:w-auto hover:underline text-gray-900 hover:text-[#0aad0a] ml-1 text-xl font-semibold">
              Login
            </Link>
          </span>
        </div>
      </form>
    </>
  );
}
