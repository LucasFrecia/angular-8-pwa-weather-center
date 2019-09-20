import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { ForecastsStoreState, ForecastsStoreStateModel } from './forecasts-store.state';
import { ForecastsStoreAction } from './forecasts-store.actions';

describe('ForecastsStore store', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([ForecastsStoreState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    const expected: ForecastsStoreStateModel = {
      items: ['item-1']
    };
    store.dispatch(new ForecastsStoreAction('item-1'));
    const actual = store.selectSnapshot(ForecastsStoreState.getState);
    expect(actual).toEqual(expected);
  });

});
