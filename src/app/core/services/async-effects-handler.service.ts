/**
 * @description The service AsyncEffectsHandler wraps ngxs action types to ActionHandlers
 * and reacts triggering/dispatching the desired action. The concept will be familiar to devs who have worked with ngrx's effects decorator.
 *
 *  @example
 *
 * const dispatchedHandledActions = [FeatureArticlesGetListAction]; // load array with desired action to litsen to
 *
 * this.asyncEffectsService.setActionsEffect(
 *   dispatchedHandledActions, // effect will be triggered when this action reaches the desired state
 *   new AppShowProgressBarAction(), // Example action we want to trigger
 *   'Dispatched' // Tell setActionsEffect method in what state of the action the side effect should be triggered
 *  );
 *
 * @author Lucas Frecia<lucasfrecia@gmail.com>
 */


import {
    Injectable,
    OnDestroy
} from '@angular/core';
import {
    Actions,
    ofActionDispatched,
    Store,
    ofActionSuccessful,
    ofActionCanceled,
    ofActionErrored,
    ofActionCompleted,
    ofAction
} from '@ngxs/store';
import {
    Subject,
    OperatorFunction
} from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Type } from '@angular/compiler/src/core';

type ActionHook =
    'all'
    | 'Dispatched'
    | 'Completed'
    | 'Errored'
    | 'Successful'
    | 'Canceled';

@Injectable()
export class AsyncEffectsHandler implements OnDestroy {

    /** Subject bool to know when to destroy subscriptions, usually will be when component is destroyed */
    private destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(private store: Store, private actions$: Actions) { }

    /**
     * @description setActionsEffect Ties actions sent to ngxs ActionHandlers.
     *
     * @example
     *
     * this.asyncEffectsService.setActionsEffect(dispatchedHandledActions, new AppShowProgressBarAction(), 'Dispatched');
     *
     * @param actions    - instance of onw of our actions where the service is provided,
     *                     this param serves to feed the ActionHandler.
     * @param effect     - executes the store.dispatch(effect) when ActionHandler emits.
     * @param actionHook - defines to which subscriptions state  the effect will trigger the dispatch.
     */
    public setActionsEffect(actions: object[], effect: any, actionHook: ActionHook): void {
        for (const action of actions) {
            switch (actionHook) {
                case 'Dispatched':
                    this.loadSubscription(ofActionDispatched(action), effect);
                    break;
                case 'Successful':
                    this.loadSubscription(ofActionSuccessful(action), effect);
                    break;
                case 'Canceled':
                    this.loadSubscription(ofActionCanceled(action), effect);
                    break;
                case 'Errored':
                    this.loadSubscription(ofActionErrored(action), effect);
                    break;
                case 'Completed':
                    this.loadSubscription(ofActionCompleted(action), effect);
                    break;
                case 'all':
                    this.loadSubscription(ofAction(action), effect);
                    break;
                default:
                    throw new Error(`${AsyncEffectsHandler.name} (setActionsEffect) ${actionHook} is not an valid actionHook`);
            }
        }
    }

    /**
     * loadSubscription
     * @param action - Which state of the action to litsen to
     * @param effect - Action to dispatch
     */
    private loadSubscription(
        action: OperatorFunction<any, any>,
        effect: Type[]
    ): void {

        this.actions$
            .pipe(
                takeUntil(this.destroy$),
                action
            )
            .subscribe(
                () => this.store.dispatch(effect),
                err => {
                    throw new Error(`${AsyncEffectsHandler.name} (loadSubscription) Subscription failed: ${err}`);
                }
            );
    }

    /**
     * onDestroy will feed the subject so it emits and the subscription is destroyed
     * triggering takeUntil operator
     */
    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
