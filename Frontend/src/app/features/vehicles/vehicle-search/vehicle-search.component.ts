import { Component } from '@angular/core';
import { VehicleFormSearchComponent } from '../vehicle-form-search/vehicle-form-search.component';
import { VehicleListSearchComponent } from '../vehicle-list-search/vehicle-list-search.component';
import { Vehicle, VehicleSearchModel, VehicleStatus, VehicleType,  } from '../../../core/models/vehicle.model';
import { VehicleService } from '../../../core/services/vehicle.service';

@Component({
  selector: 'app-vehicle-search',
  standalone: true,
  imports: [VehicleFormSearchComponent, VehicleListSearchComponent],
  templateUrl: './vehicle-search.component.html',
  styleUrl: './vehicle-search.component.scss'
})
export class VehicleSearchComponent {
  vehicles: Vehicle[] = [];
  isSearching = false;
  errorMessage: string | null = null;

  private currentSearch!: VehicleSearchModel;

  constructor(private vehicleService: VehicleService) {}

  searchVehicles(criteria: VehicleSearchModel){
    this.currentSearch = criteria;
    this.getVehiclesSearchResult();
  }

  getVehiclesSearchResult(){
    this.isSearching = true;

    this.searchForVehicles(this.currentSearch);
  }

  searchForVehicles(currentSearch: VehicleSearchModel){
    this.vehicleService.searchForDrivers(currentSearch).subscribe({
      next: (result) => { 
        this.vehicles = result;
        this.isSearching = false;
      },
      error: (err) => { this.errorMessage = 'Issue when searching for vehicles' ; this.isSearching = false}
    });
  }
  
  deleteVehicle(){
    this.getVehiclesSearchResult();
  }

  setErrorMessage(message: string){
    this.errorMessage = message;
  }
}
