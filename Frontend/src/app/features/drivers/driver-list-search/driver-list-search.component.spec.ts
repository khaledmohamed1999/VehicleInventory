import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverListSearchComponent } from './driver-list-search.component';

describe('DriverListSearchComponent', () => {
  let component: DriverListSearchComponent;
  let fixture: ComponentFixture<DriverListSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverListSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverListSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
