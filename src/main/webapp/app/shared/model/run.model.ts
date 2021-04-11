import { IBasket } from 'app/shared/model/basket.model';
import { IRestaurant } from 'app/shared/model/restaurant.model';

export interface IRun {
  id?: number;
  clientName?: string;
  runnerName?: string;
  method?: string;
  basket?: IBasket;
  restaurant?: IRestaurant;
}

export class Run implements IRun {
  constructor(
    public id?: number,
    public clientName?: string,
    public runnerName?: string,
    public method?: string,
    public basket?: IBasket,
    public restaurant?: IRestaurant
  ) {}
}
