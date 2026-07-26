import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DriverService } from '../../../core/services/driver.service';
import { Driver } from '../../../core/models/driver.model';

@Component({
  selector: 'app-driver-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './driver-list.component.html',
  styleUrl: './driver-list.component.scss'
})
export class DriverListComponent implements OnInit {
  drivers: Driver[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  constructor(private readonly driverService: DriverService) {}

  ngOnInit(): void {
    this.loadDrivers();
  }

  loadDrivers(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.driverService.getAll().subscribe({
      next: (drivers) => {
        this.drivers = drivers;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Could not load drivers. Is the API running?';
        this.isLoading = false;
      }
    });
  }

  deleteDriver(driver: Driver): void {
    const confirmed = confirm(`Delete driver ${driver.name}?`);
    if (!confirmed) {
      return;
    }

    this.driverService.delete(driver.id).subscribe({
      next: () => this.loadDrivers(),
      error: () => (this.errorMessage = 'Could not delete this driver — check they are not assigned to a vehicle.')
    });
  }
}
