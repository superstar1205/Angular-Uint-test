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
import { ClientComponent } from './client.component';
import { BreadcumbComponent } from '../../../../shared/components/breadcumb/breadcumb.component';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { ConsultationProcedureComponent } from '../consultation-procedure/consultation-procedure.component';
import { HeadClientDataComponent } from 'src/app/shared/components/head-client-data/head-client-data.component';

const appConfig = require('src/assets/configs/config.json');

describe('ClientComponent', () => {
  let component: ClientComponent;
  let fixture: ComponentFixture<ClientComponent>;

  beforeEach(fakeAsync(async () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        RouterTestingModule.withRoutes([
          {
            path: 'dashboard/consulta-360/search/result/client/consultation-procedure',
            component: ConsultationProcedureComponent
          },
        ]),
        MatDialogModule,
        BrowserAnimationsModule,
        NgxsModule.forRoot()
      ],
      declarations: [ ClientComponent, BreadcumbComponent, ModalComponent, HeadClientDataComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: APP_CONFIG, useValue: appConfig },
        MatDialog
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('should call SelectCheck', () => {
    spyOn(component, 'SelectCheck').and.callThrough();

    component.SelectCheck(1);

    expect(component.SelectCheck).toHaveBeenCalled();
  });

  it('should call SelectCheck for existing item', () => {
    component.documentsSelected = [2]
    spyOn(component, 'SelectCheck').and.callThrough();

    component.SelectCheck(2);

    expect(component.SelectCheck).toHaveBeenCalled();
  });

  it('should return active when call IsChecked', () => {
    component.documentsSelected = [2]
    spyOn(component, 'IsChecked').and.callThrough();

    component.IsChecked(2);

    expect(component.IsChecked).toHaveBeenCalled();
    expect(component.IsChecked(2)).toEqual('active');
  });

  it('should return empty when call IsChecked', () => {
    component.documentsSelected = [4]
    spyOn(component, 'IsChecked').and.callThrough();

    component.IsChecked(2);

    expect(component.IsChecked).toHaveBeenCalled();
    expect(component.IsChecked(2)).toEqual('');
  });

  it('should call GoToProcedureConsultant', () => {
    spyOn(component, 'GoToProcedureConsultant').and.callThrough();

    component.GoToProcedureConsultant();

    expect(component.GoToProcedureConsultant).toHaveBeenCalled();
    expect(component.ShowLoading).toBeFalse();
  });
});
