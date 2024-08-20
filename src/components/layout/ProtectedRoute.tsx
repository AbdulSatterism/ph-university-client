import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { Navigate } from "react-router-dom";
import { logout, TUser } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";

type TProtectRoute = {
  children: ReactNode;
  role: undefined | string;
};
const ProtectedRoute = ({ children, role }: TProtectRoute) => {
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  let user;
  if (token) {
    user = verifyToken(token);
  }

  if (role !== (user as TUser)?.role && role !== undefined) {
    dispatch(logout());
    return <Navigate to="/login" replace={true} />;
  }

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

export default ProtectedRoute;
