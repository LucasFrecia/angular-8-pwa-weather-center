import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentWeatherItemComponent } from './current-weather-item.component';

describe('CurrentWeatherItemComponent', () => {
  let component: CurrentWeatherItemComponent;
  let fixture: ComponentFixture<CurrentWeatherItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentWeatherItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentWeatherItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
