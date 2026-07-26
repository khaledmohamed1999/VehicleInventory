import { Driver } from './driver.model';

export enum VehicleType {
  Car = 'Car',
  Van = 'Van',
  Truck = 'Truck',
  Bus = 'Bus'
}

export enum VehicleStatus {
  Active = 'Active',
  InMaintenance = 'InMaintenance',
  Retired = 'Retired'
}

export interface Vehicle {
  id: number;
  licensePlate: string;
  model: string;
  year: number;
  type: VehicleType;
  status: VehicleStatus;
  mileage: number;
  assignedDriver: Driver | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface VehicleSearchModel {
  licensePlate: string;
  type: VehicleType;
  status: VehicleStatus;
}

export interface VehiclePayload {
  licensePlate: string;
  driverId: number | null;
  model: string;
  year: number;
  type: VehicleType;
  status: VehicleStatus;
  mileage: number;
}
