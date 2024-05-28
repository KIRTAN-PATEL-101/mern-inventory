import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
// import Cookies from "js-cookie";
import {Cookies} from "react-cookie";
import { useCookies } from "react-cookie";

const PrivateRoutes = () => {

   const [cookies, setCookie, removeCookie] = useCookies(['RefreshToken']);

   useEffect(() => {
      console.log(cookies);
   }

)

  let auth = { token: true };
  return (auth.token ? <Outlet /> : <Navigate to="/login" />)
};

export default PrivateRoutes;
