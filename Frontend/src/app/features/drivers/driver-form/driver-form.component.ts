import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DriverService } from '../../../core/services/driver.service';
import { DriverLevel } from '../../../core/models/driver.model';

@Component({
  selector: 'app-driver-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './driver-form.component.html',
  styleUrl: './driver-form.component.scss'
})
export class DriverFormComponent implements OnInit {
  readonly driverLevels = Object.values(DriverLevel);

  driverId: number | null = null;
  isSaving = false;
  errorMessage: string | null = null;

  readonly form;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly driverService: DriverService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.form = this.formBuilder.nonNullable.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.maxLength(20)]],
      dob: ['', Validators.required],
      level: [DriverLevel.Beginner, Validators.required]
    });
  }

  get isEditMode(): boolean {
    return this.driverId !== null;
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.driverId = Number(idParam);
      this.loadDriver(this.driverId);
    }
  }

  private loadDriver(id: number): void {
    this.driverService.getById(id).subscribe({
      next: (driver) =>
        this.form.patchValue({
          name: driver.name,
          phone: driver.phone,
          dob: driver.dob?.substring(0, 10) ?? '',
          level: driver.level
        }),
      error: () => (this.errorMessage = 'Could not load this driver.')
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
      ? this.driverService.update(this.driverId!, value)
      : this.driverService.create(value);

    request.subscribe({
      next: () => this.router.navigate(['/drivers']),
      error: (err) => {
        this.isSaving = false;
        this.errorMessage = err?.error?.error ?? 'Could not save this driver.';
      }
    });
  }
}
