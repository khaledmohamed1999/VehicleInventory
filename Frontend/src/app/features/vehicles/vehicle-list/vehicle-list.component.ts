import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { VehicleService } from '../../../core/services/vehicle.service';
import { Vehicle } from '../../../core/models/vehicle.model';
import { SplitPascalCasePipe } from '../../../shared/pipes/split-pascal-case.pipe';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [CommonModule, RouterLink, SplitPascalCasePipe],
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.scss'
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  constructor(private readonly vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.vehicleService.getAll().subscribe({
      next: (vehicles) => {
        this.vehicles = vehicles;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Could not load vehicles. Is the API running?';
        this.isLoading = false;
      }
    });
  }

  deleteVehicle(vehicle: Vehicle): void {
    const confirmed = confirm(`Delete vehicle ${vehicle.licensePlate}?`);
    if (!confirmed) {
      return;
    }

    this.vehicleService.delete(vehicle.id).subscribe({
      next: () => this.loadVehicles(),
      error: () => (this.errorMessage = 'Could not delete this vehicle.')
    });
  }
}
