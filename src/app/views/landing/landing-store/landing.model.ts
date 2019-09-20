import { FormState } from '@core/models/form-state.model';

/**
 * Model File.
 *
 * Holds form select data
 */

export interface LandingStateModel {
    cities: CitySelectItemModel[];
    selectedIds: string[];
    form: FormState<any>;
}

export interface CitySelectItemModel {
    id: number;
    name: string;
}
