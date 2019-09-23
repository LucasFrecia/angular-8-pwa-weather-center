import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import {
  BehaviorSubject,
  Subject,
  Observable
} from 'rxjs';
import {
  distinctUntilChanged
} from 'rxjs/operators';
import { transitions } from '@core/animations/animations';
import { fromEvent } from 'rxjs';
import { CoreComponent } from '@core/core.component';
import { Select } from '@ngxs/store';
import { ForecastsStoreState } from 'app/views/forecasts/forecasts-store/forecasts-store.state';
import { FiveDayForecastModel } from 'app/views/forecasts/forecasts-store/forecasts.model';
import { DestroySubscribers } from '@core/decorators/destroy-subscribers.decorator';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [transitions],
  changeDetection: ChangeDetectionStrategy.OnPush
})

@DestroySubscribers()
export class HeaderComponent extends CoreComponent implements OnInit, OnDestroy {

  @Select(ForecastsStoreState.getSelectedCityForecastState)
  public selectedCityForecast$: Observable<FiveDayForecastModel>;

  public subscribers: any = {};

  public toolbarType$ = new BehaviorSubject<number>(1);
  public titleLayoutAlign$ = new BehaviorSubject<string>('center center');
  public scroll$ = new BehaviorSubject<number>(0);
  public marginSubject$ = new BehaviorSubject<number>(0);

  constructor() {
    super();
  }

  ngOnInit() {

    this.subscribers.scrollEvent$ = fromEvent(document, 'scroll')
      .subscribe(() => {
        const numberY = window.scrollY;
        this.scroll$.next(numberY);
      });

    this.subscribers.scroll$ = this.scroll$
      .pipe(
        distinctUntilChanged()
      )
      .subscribe(value => {
        if (value > 0 && value < 64) {
          return;
        } else if (value > 0) {
          this.toolbarType$.next(2);
          this.marginSubject$.next(-64);
          this.titleLayoutAlign$.next('start start');
        } else if (value - 64 < 0) {
          this.toolbarType$.next(1);
          this.marginSubject$.next(0);
          this.titleLayoutAlign$.next('center center');
        }
      });
  }

  ngOnDestroy(): void {

  }
}
