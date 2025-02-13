import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function ResetPassword() {
  const { setUserLogin } = useContext(UserContext);
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  function handelLogin(obj) {
    setIsLoading(true);
    axios
      .put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, obj)
      .then((res) => {
        console.log(res);
        setIsLoading(false);

        if (res.status == 200) {
          console.log(res);
          setApiError("");
          localStorage.setItem("userToken", res.data.token);
          setUserLogin(res.data.token);
          navigate("/login");
        }
      })
      .catch((res) => {
        setIsLoading(false);
        setApiError(res.response.data.message);
      });
  }

  let validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Enter A Valid Email")
      .required("Email Is Required"),
    newPassword: yup
      .string()
      .required("Password Is required")
      .min(6, "Minmum Length Is 6")
      .max(16, "Maxmum Length Is 16"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: handelLogin,
  });

  return (
    <>
      {apiError && (
        <div className="error bg-red-300 py-3 text-xl my-5 font-bold rounded-md mx-auto w-1/2 text-center text-red-800">
          <h3>{apiError}</h3>
        </div>
      )}
      <h2 className="text-center text-2xl text-[#0aad0a] my-5 font-bold">
        Reset Password
      </h2>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
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
            required
          />
          <label
            htmlFor="userEmail"
            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0aad0a]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Enter Your Email
          </label>
          {formik.errors.email && formik.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert">
              <span className="font-medium">{formik.errors.email}</span>
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#0aad0a] peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="userPass"
            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0aad0a]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Enter Your Password
          </label>
          {formik.errors.newPassword && formik.touched.newPassword ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert">
              <span className="font-medium">{formik.errors.newPassword}</span>
            </div>
          ) : null}
        </div>

        <div className="links flex justify-between flex-wrap gap-5 items-center">
          <button
            type="submit"
            className="text-white bg-[#0aad0a] hover:bg-[#099409] focus:ring-4 focus:outline-none focus:ring-[#09ed092b] font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center">
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
          </button>
        </div>
      </form>
    </>
  );
}
