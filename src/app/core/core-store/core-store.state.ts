import {
  State,
  Action,
  StateContext,
  Selector,
  Actions,
  Store,
  ofActionCompleted
} from '@ngxs/store';
import {
  CoreShowProgressBarAction,
  CoreHideProgressBarAction
} from './core-store.actions';
import { CoreStateModel } from './core-state.model';
import { ProgressBarService } from '../services/progress-bar.service';

export const FEATURE_ID = 'core';

@State<CoreStateModel>({
  name: FEATURE_ID,
  defaults: {
    showProgressBar: false,
    progressBarCounter: 0
  }
})

export class CoreState {

  constructor(
    private readonly store: Store,
    private readonly actions$: Actions,
    private readonly progressBarService: ProgressBarService
  ) {

    this.actions$.pipe(ofActionCompleted(CoreShowProgressBarAction))
      .subscribe(() => {
        const showProgressBar = this.store.selectSnapshot(CoreState.isProgressBarShowing);
        if (showProgressBar) {
          this.progressBarService.show();
        }
      });

    this.actions$.pipe(ofActionCompleted(CoreHideProgressBarAction))
      .subscribe(() => {
        const showProgressBar = this.store.selectSnapshot(CoreState.isProgressBarShowing);
        if (!showProgressBar) {
          this.progressBarService.hide();
        }
      });
  }

  @Selector()
  public static GetProgressBarStatus(
    state: CoreStateModel
  ): boolean {
    return state.showProgressBar;
  }

  @Selector()
  public static isProgressBarShowing(
    state: CoreStateModel
  ): boolean {
    return state.progressBarCounter > 0;
  }

  @Action(CoreShowProgressBarAction)
  public show(
    context: StateContext<CoreStateModel>,
    action: CoreShowProgressBarAction
  ): void {

    const currentState = context.getState();

    context.patchState({
      progressBarCounter: currentState.progressBarCounter + 1
    });
  }

  @Action(CoreHideProgressBarAction)
  public hide(
    context: StateContext<CoreStateModel>,
    action: CoreHideProgressBarAction
  ): void {

    const currentState = context.getState();

    context.patchState({
      progressBarCounter: currentState.progressBarCounter - 1
    });
  }
}
