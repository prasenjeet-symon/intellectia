import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useUsers } from "./hooks/useUsers";
import { User } from "./types/user";

function App() {
  const [count, setCount] = useState(0);
  const { data, isLoading } = useUsers();

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      {!isLoading ? (
        <table>
          <thead>
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>Username</td>
              <td>Email</td>
              <td>Phone</td>
              <td>Website</td>
            </tr>
          </thead>
          <tbody>
            {(data as User[]).map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.website}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>LOADING.....</div>
      )}
    </>
  );
}

export default App;
