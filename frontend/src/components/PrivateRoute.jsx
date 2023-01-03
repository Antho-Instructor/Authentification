import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const isLogin = sessionStorage.getItem("logged_user");

  if (!isLogin) {
    return <Navigate to="/" />;
  }

  return children;
}
