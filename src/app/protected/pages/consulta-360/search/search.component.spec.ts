import 'zone.js/dist/zone-testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { NgxsModule } from '@ngxs/store';
import { APP_CONFIG } from 'src/app/injectors';
import { SearchComponent } from './search.component';
import { BreadcumbComponent } from '../../../../shared/components/breadcumb/breadcumb.component';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchResultComponent } from '../search-result/search-result.component';
import { AffiliateService } from 'src/app/protected/services/affiliate/affiliate.service';
import { of } from 'rxjs';
import { FilterSelectDoc } from 'src/app/shared/models/FilterSelectDoc';
const appConfig = require('src/assets/configs/config.json');

describe('SearchComponent', () => {
  let component: SearchComponent;
  let affiliateService: AffiliateService;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(fakeAsync(async () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([{
          path: 'dashboard/consulta-360/search/result',
          component: SearchResultComponent
        }]),
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        NgxsModule.forRoot(),
        BrowserAnimationsModule
      ],
      declarations: [ SearchComponent, BreadcumbComponent, ModalComponent ],
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
    fixture = TestBed.createComponent(SearchComponent);
    affiliateService = TestBed.inject(AffiliateService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('should open dialog', () => {
    spyOn(component, 'openDialog').and.callThrough();

    component.openDialog();
  
    expect(component.openDialog).toHaveBeenCalled();
  });

  it('should handle on change doc', () => {
    component.filterDocs = [{element: 'doc'}] as FilterSelectDoc[];
    spyOn(component, 'OnChangeDoc').and.callThrough();

    component.OnChangeDoc('doc');
  
    expect(component.OnChangeDoc).toHaveBeenCalled();
  });

  it('should submit the document search form', () => {
    spyOn(component, 'SubmitDocumentSearchForm').and.callThrough();

    component.SubmitDocumentSearchForm();
  
    expect(component.SubmitDocumentSearchForm ).toHaveBeenCalled();
  });

  it('SubmitApenomSearchForm should call affiliateService when form valid', () => {
    spyOnProperty(component.apeNomSearchForm, 'valid').and.returnValue(true);
    spyOn(component, 'SubmitApenomSearchForm').and.callThrough();

    component.SubmitApenomSearchForm();
  
    expect(component.SubmitApenomSearchForm).toHaveBeenCalled();
  });

  it('SubmitApenomSearchForm() should handle when form is invalid', () => {
    spyOn(affiliateService, 'SearchAffiliate').and.returnValue(of({}));
    spyOnProperty(component.apeNomSearchForm, 'valid').and.returnValue(false);
    spyOn(component, 'SubmitApenomSearchForm').and.callThrough();

    component.SubmitApenomSearchForm();
  
    expect(component.SubmitApenomSearchForm).toHaveBeenCalled();
    expect(component.statusText).toEqual('Complete todos los campos');
  });

  it('SubmitApenomSearchForm() should set statusText', () => {
    spyOn(affiliateService, 'SearchAffiliate').and.returnValue(of({
      statusText: 'mock_statusText'
    }));
    spyOnProperty(component.apeNomSearchForm, 'valid').and.returnValue(true);
    spyOn(component, 'SubmitApenomSearchForm').and.callThrough();

    component.SubmitApenomSearchForm();
  
    expect(component.SubmitApenomSearchForm).toHaveBeenCalled();
    expect(component.statusText).toEqual(`No se puede conectar con el servidor \n Error: mock_statusText`);
  });

  it('SubmitApenomSearchForm() should set statusText base on statusResponseMessage', () => {
    spyOn(affiliateService, 'SearchAffiliate').and.returnValue(of({
      statusResponseMessage: 'mock_statusResponseMessage'
    }));
    spyOnProperty(component.apeNomSearchForm, 'valid').and.returnValue(true);
    spyOn(component, 'SubmitApenomSearchForm').and.callThrough();

    component.SubmitApenomSearchForm();
  
    expect(component.SubmitApenomSearchForm).toHaveBeenCalled();
    expect(component.statusText).toEqual(`mock_statusResponseMessage`);
  });

  it('SubmitApenomSearchForm() should navigate when have statusResponse', () => {
    spyOn(affiliateService, 'SearchAffiliate').and.returnValue(of({
      statusResponse: 'mock_statusResponse'
    }));
    spyOnProperty(component.apeNomSearchForm, 'valid').and.returnValue(true);
    spyOn(component, 'SubmitApenomSearchForm').and.callThrough();

    component.SubmitApenomSearchForm();
  
    expect(component.SubmitApenomSearchForm).toHaveBeenCalled();
  });

  it('isValidField () should return is-invalid', () => {
    spyOn(component.documentSearchForm, 'get').and.returnValue({
      valid: false,
      touched: true
    });
  
    expect(component.isValidField('field1', 0)).toEqual('is-invalid');
  });

  it('isValidField () should return is-valid when form valid', () => {
    spyOn(component.documentSearchForm, 'get').and.returnValue({
      valid: true,
      touched: true
    });
  
    expect(component.isValidField('field1', 0)).toEqual('is-valid');
  });
});
