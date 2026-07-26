import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Vehicle, VehiclePayload, VehicleSearchModel } from '../models/vehicle.model';

// Base path matches the backend's current [Route("api/[controller]/[action]")]
// convention. If that route style ever reverts to plain "api/vehicles",
// only this one constant needs to change.
const BASE = `${environment.apiBaseUrl}/Vehicles`;

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${BASE}/GetAllVehicles`);
  }

  getById(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${BASE}/GetVehicleById/${id}`);
  }

  searchForDrivers(vehicleSearchModel: VehicleSearchModel): Observable<Vehicle[]> {
      return this.http.post<Vehicle[]>(`${BASE}/SearchVehicles`, vehicleSearchModel);
    }

  create(vehicle: VehiclePayload): Observable<Vehicle> {
    return this.http.post<Vehicle>(`${BASE}/CreateVehicle`, vehicle);
  }

  update(id: number, vehicle: VehiclePayload): Observable<Vehicle> {
    return this.http.put<Vehicle>(`${BASE}/UpdateVehicle/${id}`, vehicle);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE}/DeleteVehicle/${id}`);
  }
}
