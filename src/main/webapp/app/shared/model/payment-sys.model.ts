import { IAcount } from 'app/shared/model/acount.model';

export interface IPaymentSys {
  id?: number;
  crediteur?: string;
  debiteur?: string;
  method?: string;
  acounts?: IAcount[];
}

export class PaymentSys implements IPaymentSys {
  constructor(
    public id?: number,
    public crediteur?: string,
    public debiteur?: string,
    public method?: string,
    public acounts?: IAcount[]
  ) {}
}
