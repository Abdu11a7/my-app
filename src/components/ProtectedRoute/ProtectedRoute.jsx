/* eslint-disable react/prop-types */

import { Navigate } from "react-router-dom";

export default function ProtectedRoute(props) {
  return localStorage.getItem("userToken") ? (
    props.children
  ) : (
    <Navigate to={"/login"} />
  );
}
