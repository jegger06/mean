export interface Authenticate {
  success: boolean;
  msg?: string;
  token?: string;
  user?: {
    id: string;
    name: string;
    username: string;
    email: string
  };
}
