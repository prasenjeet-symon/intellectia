import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/shared/ThemeProvider";
import { Toaster } from "./components/ui/toaster";
import AuthenticationPage from "./pages/Authentication/AuthenticationPage/AuthenticationPage";
import ChooseInterestPage from "./pages/Authentication/ChooseInterestPage/ChooseInterestPage";
import LoginPage from "./pages/Authentication/LoginPage/LoginPage";
import SignUpPage from "./pages/Authentication/SignUpPage/SignUpPage";
import { DashboardPage } from "./pages/Dashboard/DashboardPage/DashboardPage";
import FeedPage from "./pages/Dashboard/FeedPage/FeedPage";
import { APIEventData, API_ERROR_VIEW } from "./types/types";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <SignUpPage />,
  },
  {
    path: "auth",
    element: <AuthenticationPage />,
    children: [
      {
        path: "",
        element: <SignUpPage />,
      },
      {
        path: "sign-up",
        element: <SignUpPage />,
      },
      {
        path: "sign-in",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardPage />,
    children: [
      {
        path: "",
        element: <FeedPage />,
      },
      {
        path: "choose-topics",
        element: <ChooseInterestPage />,
      },
    ],
  },
]);

function App() {
  const { toast } = useToast();

  useEffect(() => {
    // listen for the network error
    document.addEventListener(API_ERROR_VIEW, (e) => {
      const event = e as CustomEvent<APIEventData>;
      const eventData = event.detail;
      toast({
        title: "Oops! Something went wrong",
        description: eventData.message,
        variant: "destructive",
        duration: 5000,
      });
    });
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={routes} />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
