import { Routes } from '@angular/router';
import { VehicleListComponent } from './features/vehicles/vehicle-list/vehicle-list.component';
import { VehicleFormComponent } from './features/vehicles/vehicle-form/vehicle-form.component';
import { DriverListComponent } from './features/drivers/driver-list/driver-list.component';
import { DriverFormComponent } from './features/drivers/driver-form/driver-form.component';
import { DriverSearchComponent } from './features/drivers/driver-search/driver-search.component';
import { VehicleSearchComponent } from './features/vehicles/vehicle-search/vehicle-search.component';

export const routes: Routes = [
  { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
  { path: 'vehicles', component: VehicleListComponent },
  { path: 'vehicles/new', component: VehicleFormComponent },
  { path: 'vehicles/search', component: VehicleSearchComponent},
  { path: 'vehicles/:id/edit', component: VehicleFormComponent },
  { path: 'drivers', component: DriverListComponent },
  { path: 'drivers/new', component: DriverFormComponent },
  { path: 'drivers/search', component: DriverSearchComponent},
  { path: 'drivers/:id/edit', component: DriverFormComponent },
  { path: '**', redirectTo: 'vehicles' }
];
