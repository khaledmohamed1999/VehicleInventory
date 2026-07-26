import { Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { VehicleListComponent } from './features/vehicles/vehicle-list/vehicle-list.component';
import { VehicleFormComponent } from './features/vehicles/vehicle-form/vehicle-form.component';
import { DriverListComponent } from './features/drivers/driver-list/driver-list.component';
import { DriverFormComponent } from './features/drivers/driver-form/driver-form.component';
import { DriverSearchComponent } from './features/drivers/driver-search/driver-search.component';
import { VehicleSearchComponent } from './features/vehicles/vehicle-search/vehicle-search.component';

export const routes: Routes = [
  { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
  { path: 'vehicles', component: VehicleListComponent, canActivate: [MsalGuard] },
  { path: 'vehicles/new', component: VehicleFormComponent, canActivate: [MsalGuard] },
  { path: 'vehicles/search', component: VehicleSearchComponent, canActivate: [MsalGuard] },
  { path: 'vehicles/:id/edit', component: VehicleFormComponent, canActivate: [MsalGuard] },
  { path: 'drivers', component: DriverListComponent, canActivate: [MsalGuard] },
  { path: 'drivers/new', component: DriverFormComponent, canActivate: [MsalGuard] },
  { path: 'drivers/search', component: DriverSearchComponent, canActivate: [MsalGuard] },
  { path: 'drivers/:id/edit', component: DriverFormComponent, canActivate: [MsalGuard] },
  { path: '**', redirectTo: 'vehicles' }
];
