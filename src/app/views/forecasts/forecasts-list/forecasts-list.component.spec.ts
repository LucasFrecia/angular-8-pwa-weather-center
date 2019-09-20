import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastsListComponent } from './forecasts-list.component';

describe('ForecastsListComponent', () => {
  let component: ForecastsListComponent;
  let fixture: ComponentFixture<ForecastsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecastsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
