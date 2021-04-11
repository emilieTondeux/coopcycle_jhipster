import { IRestaurant } from 'app/shared/model/restaurant.model';
import { IProduct } from 'app/shared/model/product.model';
import { IRun } from 'app/shared/model/run.model';
import { IAcount } from 'app/shared/model/acount.model';

export interface IBasket {
  id?: number;
  nbElements?: number;
  price?: number;
  restaurants?: IRestaurant[];
  products?: IProduct[];
  run?: IRun;
  acount?: IAcount;
}

export class Basket implements IBasket {
  constructor(
    public id?: number,
    public nbElements?: number,
    public price?: number,
    public restaurants?: IRestaurant[],
    public products?: IProduct[],
    public run?: IRun,
    public acount?: IAcount
  ) {}
}
