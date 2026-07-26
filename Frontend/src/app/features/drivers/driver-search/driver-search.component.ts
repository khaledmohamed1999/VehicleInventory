import { Component } from '@angular/core';
import { DriverFormSearchComponent } from '../driver-form-search/driver-form-search.component';
import { DriverListSearchComponent } from '../driver-list-search/driver-list-search.component';
import { Driver, DriverLevel, DriverSearchModel } from '../../../core/models/driver.model';
import { DriverService } from '../../../core/services/driver.service';

@Component({
  selector: 'app-driver-search',
  standalone: true,
  imports: [DriverFormSearchComponent, DriverListSearchComponent],
  templateUrl: './driver-search.component.html',
  styleUrl: './driver-search.component.scss'
})
export class DriverSearchComponent {
  drivers: Driver[] = [];
  isSearching = false;
  errorMessage: string | null = null;

  private currentSearch!: DriverSearchModel;

  constructor(private driverService: DriverService) {}

  searchDrivers(criteria: DriverSearchModel){
    this.currentSearch = criteria;
    this.getDriversSearchResult();
    
  }

  getDriversSearchResult(){
    this.isSearching = true;

    this.searchForDrivers(this.currentSearch);
  }

  searchForDrivers(currentSearch: DriverSearchModel){
    this.driverService.searchForDrivers(currentSearch).subscribe({
      next: (result) => { 
        this.drivers = result;
        this.isSearching = false;
      },
      error: (err) => { this.errorMessage = 'Issue when searching for drivers'; this.isSearching = false }
    });
  }

  deleteDriver(){
    this.getDriversSearchResult();
  }

  setErrorMessage(message: string){
    this.errorMessage = message;
  }
}
