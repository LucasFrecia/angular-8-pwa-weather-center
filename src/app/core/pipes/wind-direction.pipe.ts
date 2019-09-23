/**
  * @description Pipe to convert 360 representation of wind direction to compass version S, N, E, W, etc.
  * @param {string} value       - string a acortar
  *
  * @author Lucas Frecia <lucasfrecia@gmail.com>
  */

import {
    Pipe,
    PipeTransform
} from '@angular/core';

@Pipe({
    name: 'windDIrectionPipe'
})

export class WindDirectionPipe implements PipeTransform {

    private compassSector = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N'];

    public transform(value: number): string {

        if (!value) {
            return '';
        }

        const res: any = value / 22.5;
        const compassIndex = (res).toFixed(0) - 1;

        const rv = this.compassSector[compassIndex];

        return rv;
    }
}
