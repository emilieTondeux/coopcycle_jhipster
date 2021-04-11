import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPaymentSys } from 'app/shared/model/payment-sys.model';

@Component({
  selector: 'jhi-payment-sys-detail',
  templateUrl: './payment-sys-detail.component.html',
})
export class PaymentSysDetailComponent implements OnInit {
  paymentSys: IPaymentSys | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ paymentSys }) => (this.paymentSys = paymentSys));
  }

  previousState(): void {
    window.history.back();
  }
}
