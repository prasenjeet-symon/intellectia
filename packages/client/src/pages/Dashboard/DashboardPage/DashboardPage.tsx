import { useIsLoggedIn } from "@/hooks/authentication.hooks";
import { Navigate, Outlet } from "react-router-dom";
import "./DashboardPage.css";

export function DashboardPage() {
  const { isAuthenticated, isLoading } = useIsLoggedIn();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col align-center p-7 ml-2  mr-2 bg-card rounded shadow-sm border-2  md:w-1/3">
          <h2 className="text-2xl font-bold mb-10 text-center">Loading...</h2>
        </div>
      </div>
    );
  } else if (!isAuthenticated) {
    return <Navigate to="/auth/sign-in" />;
  } else {
    return <Outlet />;
  }
}
