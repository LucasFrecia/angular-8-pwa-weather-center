import {
  State,
  Selector,
  Action,
  StateContext,
  Store
} from '@ngxs/store';
import {
  LandingStateModel,
  CitySelectItemModel
} from './landing.model';
import { FormState } from '@core/models/form-state.model';
import {
  ResetFormAction,
  ViewCitiesAction,
  ResetSelectedIds
} from './landing-store.actions';
import { Navigate } from '@ngxs/router-plugin';

export const DEFAULT_CITY_DATA = [
  {
    id: 2759794,
    name: 'Amsterdam'
  },
  {
    id: 2950159,
    name: 'Berlin'
  },
  {
    id: 3435910,
    name: 'Buenos Aires'
  },
  {
    id: 2911298,
    name: 'Hamburg'
  },
  {
    id: 2643743,
    name: 'London'
  },
  {
    id: 2886242,
    name: 'Cologne'
  },
  {
    id: 6539761,
    name: 'Rome'
  },
  {
    id: 264371,
    name: 'Athens'
  },
  {
    id: 5128581,
    name: 'New York'
  },
  {
    id: 3833367,
    name: 'Ushuaia'
  },
  {
    id: 2633352,
    name: 'York'
  },
  {
    id: 4101260,
    name: 'Bentonville'
  }
];


const defaultFilter = {
  cityIds: []
};

const defaultFormState = {
  dirty: false,
  status: 'INVALID',
  model: { ...defaultFilter },
  errors: {}
};

export const FEATURE_ID = 'landingStore';

@State<LandingStateModel>({
  name: FEATURE_ID,
  defaults: {
    cities: DEFAULT_CITY_DATA,
    selectedIds: [], // Will hold City ids, after clearing dropdown in form, to be consumed in list view
    form: defaultFormState
  }
})

export class LandingStoreState {

  constructor(private store: Store) {}

  @Selector()
  public static getForm(
    state: LandingStateModel
  ): FormState<LandingStateModel> {
    return state.form;
  }

  @Selector()
  public static getCities(
    state: LandingStateModel
  ): CitySelectItemModel[] {
    return state.cities.slice(0,5);
  }

  @Selector()
  public static getSelectedIds(
    state: LandingStateModel
  ): string[] {
    return state.selectedIds;
  }

  @Action(ViewCitiesAction)
  public viewCities(
    context: StateContext<LandingStateModel>,
    action: ViewCitiesAction
  ): void {

    const resetFormAction = new ResetFormAction();
    this.store.dispatch(resetFormAction);

  }

  @Action(ResetFormAction)
  public resetForm(
    context: StateContext<LandingStateModel>,
    action: ResetFormAction
  ): void {

    const currentState = context.getState();

    context.patchState({
      form: defaultFormState,
      selectedIds: currentState.form.model.cityIds
    });

    this.store.dispatch(new Navigate(['/forecasts/list']));
  }

  @Action(ResetSelectedIds)
  public resetSelectedCityIds(
    context: StateContext<LandingStateModel>,
    action: ResetSelectedIds
  ): void {

    context.patchState({
      selectedIds: []
    });
  }
}
