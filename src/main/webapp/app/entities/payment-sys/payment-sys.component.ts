import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPaymentSys } from 'app/shared/model/payment-sys.model';
import { PaymentSysService } from './payment-sys.service';
import { PaymentSysDeleteDialogComponent } from './payment-sys-delete-dialog.component';

@Component({
  selector: 'jhi-payment-sys',
  templateUrl: './payment-sys.component.html',
})
export class PaymentSysComponent implements OnInit, OnDestroy {
  paymentSys?: IPaymentSys[];
  eventSubscriber?: Subscription;

  constructor(protected paymentSysService: PaymentSysService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.paymentSysService.query().subscribe((res: HttpResponse<IPaymentSys[]>) => (this.paymentSys = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPaymentSys();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPaymentSys): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPaymentSys(): void {
    this.eventSubscriber = this.eventManager.subscribe('paymentSysListModification', () => this.loadAll());
  }

  delete(paymentSys: IPaymentSys): void {
    const modalRef = this.modalService.open(PaymentSysDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.paymentSys = paymentSys;
  }
}
