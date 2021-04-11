import { IAcount } from 'app/shared/model/acount.model';

export interface IRole {
  id?: number;
  role?: string;
  acounts?: IAcount[];
}

export class Role implements IRole {
  constructor(public id?: number, public role?: string, public acounts?: IAcount[]) {}
}
