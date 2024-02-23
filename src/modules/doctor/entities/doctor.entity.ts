export interface IDoctorCreate {
  firstName: string;
  lastName: string;
  description: string;
  departmentId: number;
  username: string;
  password: string;
  contactNumber: string;
  email: string;
  dateOfBirth: string;
  address: string;
  gender: string;
  image: string;
}

export interface IDoctorUpdate {
  username: string;
  firstName: string;
  lastName: string;
  description: string;
  departmentId: number;
  contactNumber: string;
  email: string;
  dateOfBirth: string;
  address: string;
  gender: string;
  image: string;
}

export interface IDoctorInfo {
  firstName: string;
  lastName: string;
  description: string;
  department: string;
  contactNumber: string;
  email: string;
  dateOfBirth: string;
  address: string;
  gender: string;
  image: string;
}
