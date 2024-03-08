export interface IPrescriptionCreate {
  appointmentId: number;
  notes?: string;
  prescriptionDetails: IPrescriptionDetails[];
}

export interface IPrescriptionDetails {
  prescriptionTypeId: number;
  details: IDetails[];
}

export interface IDetails {
  examinationContent: string;
  classification: string;
  notes?: string;
}

export interface IPrescriptionUpdate extends IPrescriptionCreate {
  id: number;
}
