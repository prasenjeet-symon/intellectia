import { UseQueryOptions, useQuery } from "react-query";
import { fetchUserById, fetchUsers } from "../api/api";

export type Options = Omit<UseQueryOptions, "queryFn" | "queryFn">;

export const useUsers = (options?: Options) => {
  const data = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    ...options,
  });
  return data;
};

export const useUserById = (id: string, options?: Options) => {
  const data = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUserById(id),
    ...options,
  });
  return data;
};
