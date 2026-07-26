import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DriverLevel, DriverSearchModel } from '../../../core/models/driver.model';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-driver-form-search',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './driver-form-search.component.html',
  styleUrl: './driver-form-search.component.scss'
})
export class DriverFormSearchComponent {
  @Input() errorMessage: string | null = null;
  @Input() isSearching = false;
  
  @Output() search = new EventEmitter<DriverSearchModel>();

  readonly driverLevels = Object.values(DriverLevel);
  readonly form;

  constructor(private readonly formBuilder: FormBuilder){
    this.form = this.formBuilder.nonNullable.group({
      name: [''],
      level: [null as DriverLevel | null]
    })
  }

  submit(): void {
    this.errorMessage = null;
    this.isSearching = true;

    this.search.emit(this.form.getRawValue() as DriverSearchModel);
  }
}
