import 'zone.js/dist/zone-testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { NgxsModule } from '@ngxs/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { APP_CONFIG } from 'src/app/injectors';
import { ConsultationProcedureComponent } from './consultation-procedure.component';
import { BreadcumbComponent } from '../../../../shared/components/breadcumb/breadcumb.component';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { AffiliateService } from 'src/app/protected/services/affiliate/affiliate.service';
import { of } from 'rxjs';
import { ProcedureDetailComponent } from '../procedure-detail/procedure-detail.component';
import { HeadClientDataComponent } from 'src/app/shared/components/head-client-data/head-client-data.component';

const appConfig = require('src/assets/configs/config.json');

describe('ConsultationProcedureComponent', () => {
  let component: ConsultationProcedureComponent;
  let fixture: ComponentFixture<ConsultationProcedureComponent>;
  let affiliateService: AffiliateService;
  let matDialog: MatDialog;

  const affiliateServiceStub = {
    GetConsultationProcedureDetail: (id: string) => of({
      statusResponse: 'statusResponse'
    })
  }

  beforeEach(fakeAsync(async () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        RouterTestingModule.withRoutes([{
          path: 'dashboard/consulta-360/search/result/client/consultation-procedure',
          component: ConsultationProcedureComponent
        }, {
          path: 'dashboard/consulta-360/search/result/client/consultation-procedure/procedure-detail',
          component: ProcedureDetailComponent
        }]),
        MatDialogModule,
        BrowserAnimationsModule,
        NgxsModule.forRoot()
      ],
      declarations: [ConsultationProcedureComponent, BreadcumbComponent, ModalComponent, HeadClientDataComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        AffiliateService,
        { provide: APP_CONFIG, useValue: appConfig },
        MatDialog
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationProcedureComponent);
    matDialog = TestBed.inject(MatDialog);
    affiliateService = TestBed.inject(AffiliateService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open dialog', () => {
    spyOn(component, 'openDialog').and.callThrough();
    spyOn(matDialog, 'open');

    component.openDialog();
  
    expect(component.openDialog).toHaveBeenCalled();
    expect(matDialog.open).toHaveBeenCalled();
  });

  it('TransformFecha() should return empty', () => {
    spyOn(component, 'TransformFecha').and.callThrough();

    component.TransformFecha('');
  
    expect(component.TransformFecha).toHaveBeenCalled();
    expect(component.TransformFecha()).toEqual('');
  });

  it('TransformFecha() should return transformed string', () => {
    spyOn(component, 'TransformFecha').and.callThrough();

    component.TransformFecha('012345678');
  
    expect(component.TransformFecha).toHaveBeenCalled();
    expect(component.TransformFecha('012345678')).toEqual('67/45/0123');
  });

  it('Cut() should return empty string', () => {
    spyOn(component, 'Cut').and.callThrough();

    component.Cut('');
  
    expect(component.Cut).toHaveBeenCalled();
    expect(component.Cut()).toEqual('');
  });

  it('Cut() should return valid string', () => {
    spyOn(component, 'Cut').and.callThrough();

    component.Cut('aaaa01234');
  
    expect(component.Cut).toHaveBeenCalled();
    expect(component.Cut('aaaa01234')).toEqual('***01234');
  });

  it('ProcedureDetail() should navigate when have status response', () => {
    spyOn(affiliateService, 'GetConsultationProcedureDetail').and.returnValue(of({
      statusResponse: 'statusResponse'
    }));
    spyOn(component, 'ProcedureDetail').and.callThrough();

    component.ProcedureDetail('id1');
  
    expect(component.ProcedureDetail).toHaveBeenCalled();
  });

  it('ProcedureDetail() should open dialog when not have status response', () => {
    spyOn(affiliateService, 'GetConsultationProcedureDetail').and.returnValue(of({
      statusText: 'mock_statusText'
    }));
    spyOn(component, 'ProcedureDetail').and.callThrough();
    spyOn(component, 'openDialog').and.callThrough();

    component.ProcedureDetail('id1');
  
    expect(component.ProcedureDetail).toHaveBeenCalled();
    expect(component.openDialog).toHaveBeenCalled();
    expect(component.statusText).toEqual(`No se puede conectar con el servidor \n Error: mock_statusText`);
  });

  it('ProcedureDetail() should set statusText', () => {
    spyOn(affiliateService, 'GetConsultationProcedureDetail').and.returnValue(of({
      statusResponseMessage: 'mock_statusResponseMessage'
    }));
    spyOn(component, 'ProcedureDetail').and.callThrough();
    spyOn(component, 'openDialog').and.callThrough();

    component.ProcedureDetail('id1');
  
    expect(component.ProcedureDetail).toHaveBeenCalled();
    expect(component.openDialog).toHaveBeenCalled();
    expect(component.statusText).toEqual(`mock_statusResponseMessage`);
  });
});
