import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastsViewComponent } from './forecasts-view.component';

describe('ForecastsViewComponent', () => {
  let component: ForecastsViewComponent;
  let fixture: ComponentFixture<ForecastsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecastsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
