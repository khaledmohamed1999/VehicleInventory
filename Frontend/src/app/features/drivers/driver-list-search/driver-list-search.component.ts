import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DriverService } from '../../../core/services/driver.service';
import { Driver } from '../../../core/models/driver.model';

@Component({
  selector: 'app-driver-list-search',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './driver-list-search.component.html',
  styleUrl: './driver-list-search.component.scss'
})
export class DriverListSearchComponent{
  @Input() errorMessage: string | null = null;
  @Input() drivers: Driver[] = [];

  @Output() driverDeleted = new EventEmitter<void>();
  @Output() errorDuringDelete = new EventEmitter<string>();

  constructor(private readonly driverService: DriverService) {}

  deleteDriver(driver: Driver): void {
    const confirmed = confirm(`Delete driver ${driver.name}?`);
    if (!confirmed) {
      return;
    }

    this.driverService.delete(driver.id).subscribe({
      next: () => {
        this.driverDeleted.emit();
      },
      error: (err) => {
        this.errorDuringDelete.emit('Could not delete this driver — check they are not assigned to a vehicle.');
      }
    });
  }
}
