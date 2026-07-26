import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverFormSearchComponent } from './driver-form-search.component';

describe('DriverFormSearchComponent', () => {
  let component: DriverFormSearchComponent;
  let fixture: ComponentFixture<DriverFormSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverFormSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverFormSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
