import {
  Component,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';
import {
  FormGroup,
  AbstractControl,
  FormBuilder
} from '@angular/forms';
import {
  FEATURE_ID,
  LandingStoreState
} from './landing-store/landing-store.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  CitySelectItemModel,
  LandingStateModel
} from './landing-store/landing.model';
import { CoreComponent } from '@core/core.component';
import { FormState } from '@core/models/form-state.model';
import { ViewCitiesAction } from './landing-store/landing-store.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingComponent extends CoreComponent implements OnInit {

  @Select(LandingStoreState.getCities)
  public data$: Observable<CitySelectItemModel[]>;

  @Select(LandingStoreState.getForm)
  public form$: Observable<FormState<LandingStateModel>>;

  get citieIds(): AbstractControl {
    return this.form.get('citieIds');
  }

  public formPath = `${FEATURE_ID}.form`;
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      cityIds: [],
    });
  }

  public viewCities(): void {
    const goToViewAction = new ViewCitiesAction();
    this.store.dispatch(goToViewAction);
  }
}
