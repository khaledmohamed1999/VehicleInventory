import { Component, EventEmitter, Input, model, OnInit, Output } from '@angular/core';
import { VehicleStatus, VehicleType, VehicleSearchModel } from '../../../core/models/vehicle.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SplitPascalCasePipe } from '../../../shared/pipes/split-pascal-case.pipe';
import { Driver } from '../../../core/models/driver.model';
import { DriverService } from '../../../core/services/driver.service';

@Component({
  selector: 'app-vehicle-form-search',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, SplitPascalCasePipe],
  templateUrl: './vehicle-form-search.component.html',
  styleUrl: './vehicle-form-search.component.scss'
})
export class VehicleFormSearchComponent implements OnInit{
  @Input() errorMessage: string | null = null;
  @Input() isSearching = false;
  
  @Output() search = new EventEmitter<VehicleSearchModel>();

  readonly vehicleStatuses = Object.values(VehicleStatus);
  readonly vehicleTypes = Object.values(VehicleType);
  readonly form;

  drivers: Driver[] = [];

  constructor(private readonly formBuilder: FormBuilder, private readonly driverService: DriverService,){
    this.form = this.formBuilder.nonNullable.group({
      licensePlate: [''],
      driverId: [null as number | null],
      model: [''],
      year: [null, [Validators.min(1980), Validators.max(2100)]],
      status: [null as VehicleStatus | null],
      type: [null as VehicleType | null]
    })
  }

  ngOnInit(): void {
    this.driverService.getAll().subscribe({
      next: (drivers) => (this.drivers = drivers),
      error: () => (this.errorMessage = 'Could not load drivers for assignment.')
    });
  }

  submit(): void {
    this.errorMessage = null;
    this.isSearching = true;

    this.search.emit(this.form.getRawValue() as VehicleSearchModel);
  }
}
