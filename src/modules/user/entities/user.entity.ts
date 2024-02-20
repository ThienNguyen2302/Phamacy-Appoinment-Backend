export interface User {
  username: string;
  password: string;
  role: ERoleUser;
}

export enum ERoleUser {
  DOCTOR = 'Doctor',
  PATIENT = 'Patient',
  ADMIN = 'Admin',
}

export interface IUserBaseInfo {
  username: string;
  password?: string;
  role: ERoleUser;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  contactNumber: string;
  email: string;
  image: string;
  address: string;
}
