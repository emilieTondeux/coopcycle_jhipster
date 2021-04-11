import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CoopcycleJhipsterTestModule } from '../../../test.module';
import { AcountDetailComponent } from 'app/entities/acount/acount-detail.component';
import { Acount } from 'app/shared/model/acount.model';

describe('Component Tests', () => {
  describe('Acount Management Detail Component', () => {
    let comp: AcountDetailComponent;
    let fixture: ComponentFixture<AcountDetailComponent>;
    const route = ({ data: of({ acount: new Acount(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CoopcycleJhipsterTestModule],
        declarations: [AcountDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AcountDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AcountDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load acount on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.acount).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
