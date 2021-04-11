import { IRestaurant } from 'app/shared/model/restaurant.model';
import { IBasket } from 'app/shared/model/basket.model';

export interface IProduct {
  id?: number;
  name?: string;
  price?: number;
  quantity?: number;
  restaurant?: IRestaurant;
  baskets?: IBasket[];
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public name?: string,
    public price?: number,
    public quantity?: number,
    public restaurant?: IRestaurant,
    public baskets?: IBasket[]
  ) {}
}
