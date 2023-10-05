import { Link } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";
import { User } from "../types/user";

const IndexPage = () => {
  const { data, isLoading } = useUsers();

  return isLoading ? (
    <div>LOADING....</div>
  ) : (
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
            <td>
              <Link to={`user/${user.id}`}>{user.id}</Link>
            </td>
            <td>
              <Link to={`user/${user.id}`}>{user.name}</Link>
            </td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.website}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default IndexPage;
