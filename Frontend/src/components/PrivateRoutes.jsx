import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
// import Cookies from "js-cookie";
import { Cookies } from "react-cookie";
import { useCookies } from "react-cookie";
import axios from "axios";

const PrivateRoutes = () => {
  const [islogedIn, setIslogedIn] = useState("0");

  useEffect(() => {
    console.log("hi");
    axios
      .get("http://localhost:8000/users/details", {
        withCredentials: true,
      })
      .then((res) => {
        const data = res.data;
        // console.log("true");
        setIslogedIn("1");
      })
      .catch((err) => {
        console.log(err);
        setIslogedIn("0");
      });
    console.log(islogedIn);
  }, []);

  return <>{islogedIn === "1" ? <Outlet /> : <Outlet/>}</>;
};

export default PrivateRoutes;
