import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/shared/ThemeProvider";
import ChooseInterestPage from "./pages/Authentication/ChooseInterestPage/ChooseInterestPage";
import LoginPage from "./pages/Authentication/LoginPage/LoginPage";
import SignUpPage from "./pages/Authentication/SignUpPage/SignUpPage";

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
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={routes} />
    </ThemeProvider>
  );
}

export default App;
