import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantorderComponent } from './restaurantorder.component';

describe('RestaurantorderComponent', () => {
  let component: RestaurantorderComponent;
  let fixture: ComponentFixture<RestaurantorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantorderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
