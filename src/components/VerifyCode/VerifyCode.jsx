import axios from "axios";

import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function VerifyCode() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  document.title = "Verify Code";
  function handelResetCode() {
    setIsLoading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, {
        resetCode: formik.values.code,
      })
      .then((res) => {
        if (res.data.statusMsg === "success") {
          toast.success(res.data.message);
          setIsLoading(false);
          navigate("/");
        } else {
          toast.error(res.data.message);
          setIsLoading(false);
        }

        console.log(res.response.data);
      })
      .catch((err) => {
        // toast.error(res.data.message);

        console.log(err.response.data.message);
        toast.error(err.response.data.message);
        setIsLoading(false);
      });
  }

  let formik = useFormik({
    initialValues: {
      code: "",
    },

    onSubmit: handelResetCode,
  });

  return (
    <form action="" onSubmit={formik.handleSubmit}>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="tel"
          name="code"
          id="userCode"
          value={formik.values.code}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#0aad0a] peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="userCode"
          className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0aad0a]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Enter Reset Code
        </label>
        {formik.errors.code && formik.touched.code ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
            role="alert">
            <span className="font-medium">{formik.errors.code}</span>
          </div>
        ) : null}
      </div>

      <button
        type="submit"
        className="text-white bg-[#0aad0a] hover:bg-[#099409] focus:ring-4 focus:outline-none focus:ring-[#09ed092b] font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center">
        {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Verify Code"}
      </button>
    </form>
  );
}
