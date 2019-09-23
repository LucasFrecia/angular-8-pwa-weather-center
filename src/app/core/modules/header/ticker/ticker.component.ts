import {
  Component,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TickerStoreState } from './ticker-store/ticker-store.state';
import { GetTickerDataAction } from './ticker-store/ticker-store.actions';

@Component({
  selector: 'app-ticker',
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TickerComponent implements OnInit {

  @Select(TickerStoreState.getAllCityTEmperaturesState)
  public tickerData$: Observable<string[]>;

  constructor(private store: Store) { }

  ngOnInit() {
    const getAction = new GetTickerDataAction();
    this.store.dispatch(getAction);
  }

}
