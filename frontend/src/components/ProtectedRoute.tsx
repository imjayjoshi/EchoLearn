import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router";

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
      // Not logged in → redirect to login
      navigate("/login");
      return;
    }

    const user = JSON.parse(userStr);

    // Identify admin by email
    const isAdmin = user.email === "admin@gmail.com";

    if (requireAdmin && !isAdmin) {
      // Not an admin → redirect to user dashboard
      navigate("/dashboard");
      return;
    }

    if (!requireAdmin && isAdmin) {
      // If admin tries to access user route → redirect to admin dashboard
      navigate("/admin");
      return;
    }
  }, [navigate, requireAdmin]);

  return <>{children}</>;
};

export default ProtectedRoute;
