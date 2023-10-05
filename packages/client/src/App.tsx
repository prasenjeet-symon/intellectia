import { RouterProvider, createBrowserRouter } from "react-router-dom";
import IndexPage from "./pages";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
  },
]);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
