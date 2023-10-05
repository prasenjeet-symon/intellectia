import { useParams } from "react-router-dom";
import { useUserById } from "../hooks/useUsers";

const UserById = () => {
  const param = useParams();
  const { data, isLoading } = useUserById(param.userId as string);
  return <div>{isLoading ? "LOADING..." : JSON.stringify(data)}</div>;
};

export default UserById;
