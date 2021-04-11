import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CoopcycleJhipsterTestModule } from '../../../test.module';
import { PaymentSysDetailComponent } from 'app/entities/payment-sys/payment-sys-detail.component';
import { PaymentSys } from 'app/shared/model/payment-sys.model';

describe('Component Tests', () => {
  describe('PaymentSys Management Detail Component', () => {
    let comp: PaymentSysDetailComponent;
    let fixture: ComponentFixture<PaymentSysDetailComponent>;
    const route = ({ data: of({ paymentSys: new PaymentSys(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CoopcycleJhipsterTestModule],
        declarations: [PaymentSysDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PaymentSysDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PaymentSysDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load paymentSys on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.paymentSys).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
