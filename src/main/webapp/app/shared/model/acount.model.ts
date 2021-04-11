import { IBasket } from 'app/shared/model/basket.model';
import { IRestaurant } from 'app/shared/model/restaurant.model';
import { IRole } from 'app/shared/model/role.model';
import { IPaymentSys } from 'app/shared/model/payment-sys.model';

export interface IAcount {
  id?: number;
  name?: string;
  surname?: string;
  age?: number;
  accountID?: string;
  adress?: string;
  baskets?: IBasket[];
  restaurant?: IRestaurant;
  role?: IRole;
  paymentSys?: IPaymentSys[];
}

export class Acount implements IAcount {
  constructor(
    public id?: number,
    public name?: string,
    public surname?: string,
    public age?: number,
    public accountID?: string,
    public adress?: string,
    public baskets?: IBasket[],
    public restaurant?: IRestaurant,
    public role?: IRole,
    public paymentSys?: IPaymentSys[]
  ) {}
}
