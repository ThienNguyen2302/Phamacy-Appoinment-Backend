export interface User {
  username: string;
  password?: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  roles: string[];
  createdAt: string;
}
