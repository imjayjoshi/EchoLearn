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

    try {
      const user = JSON.parse(userStr);

      // Check if user object has role property
      if (!user.role) {
        console.error("User role not found");
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }

      const isAdmin = user.role === "admin";

      if (requireAdmin && !isAdmin) {
        // Route requires admin but user is not admin → redirect to user dashboard
        navigate("/dashboard");
        return;
      }

      if (!requireAdmin && isAdmin) {
        // Admin trying to access user route → redirect to admin dashboard
        navigate("/admin");
        return;
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      localStorage.removeItem("user");
      navigate("/login");
    }
  }, [navigate, requireAdmin]);

  return <>{children}</>;
};

export default ProtectedRoute;
