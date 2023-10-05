import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/Authentication/LoginPage/LoginPage";
import UserById from "./pages/UserById";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "user/:userId",
    element: <UserById />,
  },
]);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
