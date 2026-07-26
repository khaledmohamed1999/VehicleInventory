import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { VehicleService } from '../../../core/services/vehicle.service';
import { Vehicle } from '../../../core/models/vehicle.model';
import { SplitPascalCasePipe } from '../../../shared/pipes/split-pascal-case.pipe';

@Component({
  selector: 'app-vehicle-list-search',
  standalone: true,
  imports: [CommonModule, RouterLink, SplitPascalCasePipe],
  templateUrl: './vehicle-list-search.component.html',
  styleUrl: './vehicle-list-search.component.scss'
})
export class VehicleListSearchComponent {
  @Input() errorMessage: string | null = null;
  @Input() vehicles: Vehicle[] = [];

  @Output() vehicleDeleted = new EventEmitter<void>();
  @Output() errorDuringDelete = new EventEmitter<string>();

  constructor(private readonly vehicleService: VehicleService) {}

    deleteVehicle(vehicle: Vehicle): void {
    const confirmed = confirm(`Delete vehicle ${vehicle.licensePlate}?`);
    if (!confirmed) {
      return;
    }

    this.vehicleService.delete(vehicle.id).subscribe({
      next: () => {
        this.vehicleDeleted.emit();
      },
      error: (err) => {
        this.errorDuringDelete.emit('Could not delete this vehicle.')
      }
    });
  }
}
