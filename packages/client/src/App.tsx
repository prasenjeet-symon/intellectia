import { RouterProvider, createBrowserRouter } from "react-router-dom";
import IndexPage from "./pages";
import UserById from "./pages/UserById";
import { ThemeProvider } from "./components/shared/ThemeProvider";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
  },
  {
    path: "user/:userId",
    element: <UserById />,
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
