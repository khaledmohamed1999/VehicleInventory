import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleFormSearchComponent } from './vehicle-form-search.component';

describe('VehicleFormSearchComponent', () => {
  let component: VehicleFormSearchComponent;
  let fixture: ComponentFixture<VehicleFormSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleFormSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleFormSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
