import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CoopcycleJhipsterTestModule } from '../../../test.module';
import { AcountUpdateComponent } from 'app/entities/acount/acount-update.component';
import { AcountService } from 'app/entities/acount/acount.service';
import { Acount } from 'app/shared/model/acount.model';

describe('Component Tests', () => {
  describe('Acount Management Update Component', () => {
    let comp: AcountUpdateComponent;
    let fixture: ComponentFixture<AcountUpdateComponent>;
    let service: AcountService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CoopcycleJhipsterTestModule],
        declarations: [AcountUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(AcountUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AcountUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AcountService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Acount(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Acount();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
