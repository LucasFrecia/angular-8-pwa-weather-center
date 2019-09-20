import { Injectable } from '@angular/core';
import {
    NavigationCancel,
    NavigationEnd,
    NavigationError,
    NavigationStart,
    Router
} from '@angular/router';
import {
    BehaviorSubject,
    Observable
} from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProgressBarService {

    private visible: BehaviorSubject<boolean>;

    /**
     * @param  router - Router instance
     */
    constructor(
        private router: Router
    ) {
        // Initialize the service
        this._init();
    }

    private _init(): void {

        this.visible = new BehaviorSubject(false);

        // Subscribe to the router events to show/hide the loading bar
        this.router.events
            .pipe(
                filter(
                    (event) => event instanceof NavigationStart)
                )
            .subscribe(() => {
                this.show();
            });

        this.router.events
            .pipe(
                filter(
                    (event) => event instanceof NavigationEnd
                                || event instanceof NavigationError
                                || event instanceof NavigationCancel
                )
            )
            .subscribe(() => {
                this.hide();
            });
    }

    /**
     * Show the progress bar
     */
    public show(): void {
        this.visible.next(true);
    }

    /**
     * Hide the progress bar
     */
    public hide(): void {
        this.visible.next(false);
    }
}

