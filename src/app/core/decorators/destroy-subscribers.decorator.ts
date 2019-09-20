/**
 * DestroySubscribers decorator
 *
 * @description Use in components where you need to unsubscribe automatically.
 * You will have to keep ngOnDestroy method from target component, even if it is empty.
 * By adding  DestroySubscribers() after @Component declaration
 * Also you have to add the subscriptions to a subscribers object ... subscribers: any = {};
 *
 * @param {Type} target
 *
 * @example
 *
 * subscribers: any = {};
 *
 * this.subscribers.exampleSubscription$ = someObservable.subscribe(x => x);
 *
 * ngUnsubscribe() {
 *  // subscription to someObservable will be destroyed here automatically when component is destroyed
 * }
 */

import { Subscription } from 'rxjs';

export function DestroySubscribers() {
    // tslint:disable-next-line: only-arrow-functions
    return function(target: any) {
        // decorating the function ngOnDestroy
        target.prototype.ngOnDestroy = ngOnDestroyDecorator(
            target.prototype.ngOnDestroy
        );
        // decorator function
        function ngOnDestroyDecorator(f) {
            return function() {
                // saving the result of ngOnDestroy performance to the variable superData
                const superData = f ? f.apply(this, arguments) : null;
                // unsubscribing
                if (this.subscribers) {
                    for (const subscriberKey of Object.keys(this.subscribers)) {
                        const subscriber = this.subscribers[subscriberKey];
                        if (subscriber instanceof Subscription) {
                            subscriber.unsubscribe();
                            console.log(`${DestroySubscribers.name} (ngOnDestroyDecorator)\n\destroyed subscription: %o`, subscriberKey);
                        }
                    }
                }
                // returning the result of ngOnDestroy performance
                return superData;
            };
        }
        // returning the decorated class
        return target;
    };
}
