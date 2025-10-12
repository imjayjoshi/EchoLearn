import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem("user");

    if (!userStr) {
      // Not logged in, redirect to login
      navigate("/login");
      return;
    }

    const user = JSON.parse(userStr);

    if (requireAdmin && !user.isAdmin) {
      // Not admin, redirect to regular dashboard
      navigate("/dashboard");
      return;
    }
  }, [navigate, requireAdmin]);

  return <>{children}</>;
};

export default ProtectedRoute;
