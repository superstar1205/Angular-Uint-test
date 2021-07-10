import 'zone.js/dist/zone-testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule } from '@ngxs/store';
import { FormsModule } from '@angular/forms';
import { APP_CONFIG } from 'src/app/injectors';
import { AffiliateDataComponent } from './affiliate-data.component';
import { BreadcumbComponent } from '../../../../shared/components/breadcumb/breadcumb.component';
import { ConsultationProcedureComponent } from '../consultation-procedure/consultation-procedure.component';
import { HeadClientDataComponent } from 'src/app/shared/components/head-client-data/head-client-data.component';

const appConfig = require('src/assets/configs/config.json');

describe('AffiliateDataComponent', () => {
  let component: AffiliateDataComponent;
  let fixture: ComponentFixture<AffiliateDataComponent>;

  beforeEach(fakeAsync(async () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        RouterTestingModule.withRoutes([
          {
            path: 'dashboard/consulta-360/search/result/client',
            component: ConsultationProcedureComponent,
          },
        ]),
        NgxsModule.forRoot(),
      ],
      declarations: [AffiliateDataComponent, BreadcumbComponent, HeadClientDataComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: APP_CONFIG, useValue: appConfig }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffiliateDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go back', () => {
    spyOn(component, 'Back').and.callThrough();

    component.Back();

    expect(component.Back).toHaveBeenCalled();
  });

  it('GetFecNac should return empty when arg is empty', () => {
    spyOn(component, 'GetFecNac').and.callThrough();

    component.GetFecNac('');

    expect(component.GetFecNac).toHaveBeenCalled();
    expect(component.GetFecNac('')).toBeFalsy();
  });

  it('GetFecNac should return string when arg is valid', () => {
    spyOn(component, 'GetFecNac').and.callThrough();

    component.GetFecNac('012345678');

    expect(component.GetFecNac).toHaveBeenCalled();
    expect(component.GetFecNac('012345678')).toEqual('67/45/0123');
  });
});
