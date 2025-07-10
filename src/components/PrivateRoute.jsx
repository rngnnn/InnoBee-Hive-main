import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "src/context/useAuth";
import Loader from "src/components/Loader/Loader";

const PrivateRoute = ({ children }) => {
  // const { isLoggedIn } = useAuth();
  // const navigate = useNavigate();
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (!isLoggedIn()) {
  //     navigate("/login", { replace: true });
  //   } else {
  //     setLoading(false);
  //   }
  // }, [isLoggedIn, navigate]);

  // if (loading) {
  //   return <Loader />;
  // }

  return children;
};

export default PrivateRoute;
