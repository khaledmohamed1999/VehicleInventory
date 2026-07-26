export enum DriverLevel {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Experienced = 'Experienced',
  Chief = 'Chief'
}

export interface Driver {
  id: number;
  name: string;
  phone: string;
  dob: string;
  level: DriverLevel;
  createdAt: string;
  updatedAt: string | null;
}

export interface DriverSearchModel {
  name: string;
  level: DriverLevel;
}

export interface DriverPayload {
  name: string;
  phone: string;
  dob: string | null;
  level: DriverLevel;
}
