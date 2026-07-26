import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleListSearchComponent } from './vehicle-list-search.component';

describe('VehicleListSearchComponent', () => {
  let component: VehicleListSearchComponent;
  let fixture: ComponentFixture<VehicleListSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleListSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleListSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
