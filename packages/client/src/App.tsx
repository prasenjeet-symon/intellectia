import { RouterProvider, createBrowserRouter } from "react-router-dom";
import IndexPage from "./pages";
import UserById from "./pages/UserById";

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
  return <RouterProvider router={routes} />;
}

export default App;
