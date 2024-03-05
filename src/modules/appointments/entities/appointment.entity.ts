export interface IAppointmentsCreate {
  doctorId: number;
  patientId: number;
  startTime: string;
  endTime: string;
  purpose: string;
  status: EAppointmentStatus;
}

export enum EAppointmentStatus {
  APPROVE = 'approve',
  CANCEL = 'cancel',
  WAITING = 'waiting',
}

export interface IAppointmentsUpdate {
  id: number;
  doctorId: number;
  patientId: number;
  startTime: string;
  endTime: string;
  purpose: string;
}

export interface IAppointmentsInfo {
  id: number;
  doctor: {
    id: number;
    name: string;
  };
  patient: {
    id: number;
    name: string;
  };
  startTime: string;
  endTime: string;
  purpose: string;
  status: EAppointmentStatus;
}

export interface IScheduleAppointmentDoctor {
  id: number;
  name: string;
  appointments: {
    patient: {
      id: number;
      name: string;
    };
    startTime: string;
    endTime: string;
    purpose: string;
    status: EAppointmentStatus;
  }[];
}

export interface IQueryParamsFindAll {
  doctorId?: number;
  patientId?: number;
}
