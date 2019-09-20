import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CoreState } from './core-store/core-store.state';

export class CoreComponent {

    @Select(CoreState.isProgressBarShowing)
    public isLoading$: Observable<boolean>;

}
