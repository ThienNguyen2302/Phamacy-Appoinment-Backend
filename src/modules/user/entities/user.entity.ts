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
