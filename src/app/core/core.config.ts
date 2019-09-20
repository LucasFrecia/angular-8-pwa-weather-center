import { Route } from '@angular/router';

export const APP_DEFAULT_URL = '/';

export const APP_UNKNOWN_PATH_REDIRECT_TO_DEFAULT_ROUTE: Route = {
    path: '**',
    redirectTo: APP_DEFAULT_URL
};
