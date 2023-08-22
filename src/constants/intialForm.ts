import { User } from "interfaces/user";

export function initialForm(): User {
  return {
    id: null,
    username: "",
    email: "",
    password: "",
  };
}

  