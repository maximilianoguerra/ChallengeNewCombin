import { Navigate } from "react-router-dom";
import { useStatePage } from "../hooks/StateProvider";

const ProtectedRoute = (props: any) => {
  const { children } = props;
  const { token } = useStatePage();
  if (token === '') {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
