import { User } from "../types/user";

export const fetchUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: User[] = await res.json();
  return users;
};

export const fetchUserById = async (id: string) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const user: User = await res.json();
  return user;
};
