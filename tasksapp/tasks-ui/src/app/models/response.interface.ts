export interface Register {
  success: boolean;
  msg: string;
}

export interface Login {
  success: boolean;
  msg?: string;
  token?: string;
  user?: {
    id: string,
    name: string,
    username: string,
    email: string
  };
}
