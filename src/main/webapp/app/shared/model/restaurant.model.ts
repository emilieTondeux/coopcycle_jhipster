import { IAcount } from 'app/shared/model/acount.model';
import { IProduct } from 'app/shared/model/product.model';
import { IRun } from 'app/shared/model/run.model';
import { ICooperative } from 'app/shared/model/cooperative.model';
import { IBasket } from 'app/shared/model/basket.model';

export interface IRestaurant {
  id?: number;
  name?: string;
  adress?: string;
  acount?: IAcount;
  products?: IProduct[];
  runs?: IRun[];
  cooperative?: ICooperative;
  baskets?: IBasket[];
}

export class Restaurant implements IRestaurant {
  constructor(
    public id?: number,
    public name?: string,
    public adress?: string,
    public acount?: IAcount,
    public products?: IProduct[],
    public runs?: IRun[],
    public cooperative?: ICooperative,
    public baskets?: IBasket[]
  ) {}
}
