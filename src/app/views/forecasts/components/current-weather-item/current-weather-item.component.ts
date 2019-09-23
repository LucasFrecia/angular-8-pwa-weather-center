import {
  Component,
  Input
} from '@angular/core';
import { CurrentWeatherCityItemModel } from '../../forecasts-store/forecasts.model';

@Component({
  selector: 'app-current-weather-item',
  templateUrl: './current-weather-item.component.html',
  styleUrls: ['./current-weather-item.component.scss']
})
export class CurrentWeatherItemComponent {

  @Input() public item: CurrentWeatherCityItemModel;
  @Input() public class: string;

  constructor() { }

}
