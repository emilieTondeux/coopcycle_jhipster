import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPaymentSys } from 'app/shared/model/payment-sys.model';
import { PaymentSysService } from './payment-sys.service';

@Component({
  templateUrl: './payment-sys-delete-dialog.component.html',
})
export class PaymentSysDeleteDialogComponent {
  paymentSys?: IPaymentSys;

  constructor(
    protected paymentSysService: PaymentSysService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.paymentSysService.delete(id).subscribe(() => {
      this.eventManager.broadcast('paymentSysListModification');
      this.activeModal.close();
    });
  }
}
