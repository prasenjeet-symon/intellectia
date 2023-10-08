import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/shared/ThemeProvider";
import { Toaster } from "./components/ui/toaster";
import ChooseInterestPage from "./pages/Authentication/ChooseInterestPage/ChooseInterestPage";
import LoginPage from "./pages/Authentication/LoginPage/LoginPage";
import SignUpPage from "./pages/Authentication/SignUpPage/SignUpPage";
import { APIEventData, API_ERROR_VIEW } from "./types/types";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "auth",
    children: [
      {
        path: "sign-up",
        element: <SignUpPage />,
      },
      {
        path: "sign-in",
        element: <LoginPage />,
      },
      {
        path: "choose-interests",
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
