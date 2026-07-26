import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Driver, DriverPayload, DriverSearchModel } from '../models/driver.model';

const BASE = `${environment.apiBaseUrl}/Drivers`;

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Driver[]> {
    return this.http.get<Driver[]>(`${BASE}/GetAllDrivers`);
  }

  getById(id: number): Observable<Driver> {
    return this.http.get<Driver>(`${BASE}/GetDriverById/${id}`);
  }

  searchForDrivers(driverSearchModel: DriverSearchModel): Observable<Driver[]> {
    return this.http.post<Driver[]>(`${BASE}/SearchDrivers`, driverSearchModel);
  }

  create(driver: DriverPayload): Observable<Driver> {
    return this.http.post<Driver>(`${BASE}/CreateDriver`, driver);
  }

  update(id: number, driver: DriverPayload): Observable<Driver> {
    return this.http.put<Driver>(`${BASE}/UpdateDriver/${id}`, driver);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE}/DeleteDriver/${id}`);
  }
}
