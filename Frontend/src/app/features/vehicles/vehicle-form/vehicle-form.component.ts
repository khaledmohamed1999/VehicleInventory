import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { VehicleService } from '../../../core/services/vehicle.service';
import { DriverService } from '../../../core/services/driver.service';
import { VehicleStatus, VehicleType } from '../../../core/models/vehicle.model';
import { Driver } from '../../../core/models/driver.model';
import { SplitPascalCasePipe } from '../../../shared/pipes/split-pascal-case.pipe';

@Component({
  selector: 'app-vehicle-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, SplitPascalCasePipe],
  templateUrl: './vehicle-form.component.html',
  styleUrl: './vehicle-form.component.scss'
})
export class VehicleFormComponent implements OnInit {
  readonly vehicleTypes = Object.values(VehicleType);
  readonly vehicleStatuses = Object.values(VehicleStatus);

  drivers: Driver[] = [];
  vehicleId: number | null = null;
  isSaving = false;
  errorMessage: string | null = null;

  readonly form;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly vehicleService: VehicleService,
    private readonly driverService: DriverService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.form = this.formBuilder.nonNullable.group({
      licensePlate: ['', [Validators.required, Validators.maxLength(20)]],
      driverId: [null as number | null],
      model: ['', [Validators.required, Validators.maxLength(50)]],
      year: [new Date().getFullYear(), [Validators.required, Validators.min(1980), Validators.max(2100)]],
      type: [VehicleType.Car, Validators.required],
      status: [VehicleStatus.Active, Validators.required],
      mileage: [0, [Validators.required, Validators.min(0)]]
    });
  }

  get isEditMode(): boolean {
    return this.vehicleId !== null;
  }

  ngOnInit(): void {
    this.driverService.getAll().subscribe({
      next: (drivers) => (this.drivers = drivers),
      error: () => (this.errorMessage = 'Could not load drivers for assignment.')
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.vehicleId = Number(idParam);
      this.loadVehicle(this.vehicleId);
    }
  }

  private loadVehicle(id: number): void {
    this.vehicleService.getById(id).subscribe({
      next: (vehicle) =>
        this.form.patchValue({
          licensePlate: vehicle.licensePlate,
          driverId: vehicle.assignedDriver?.id ?? null,
          model: vehicle.model,
          year: vehicle.year,
          type: vehicle.type,
          status: vehicle.status,
          mileage: vehicle.mileage
        }),
      error: () => (this.errorMessage = 'Could not load this vehicle.')
    });
  }

  submit(): void {
    this.errorMessage = null;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.errorMessage = 'Please fill in all required fields, highlighted below.';
      return;
    }

    this.isSaving = true;
    const value = this.form.getRawValue();

    const request = this.isEditMode
      ? this.vehicleService.update(this.vehicleId!, value)
      : this.vehicleService.create(value);

    request.subscribe({
      next: () => this.router.navigate(['/vehicles']),
      error: (err) => {
        this.isSaving = false;
        this.errorMessage = err?.error?.error ?? 'Could not save this vehicle.';
      }
    });
  }
}
