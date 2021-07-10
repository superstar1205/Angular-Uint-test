import 'zone.js/dist/zone-testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { NgxsModule } from '@ngxs/store';
import { APP_CONFIG } from 'src/app/injectors';
import { AuthAzureService } from '../../services/auth/auth-azure.service';
import { LoginComponent } from './login.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DATA_LOGIN } from 'src/app/shared/data/mock_login';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AppListComponent } from 'src/app/protected/pages/app-list/app-list.component';

const appConfig = require('src/assets/configs/config.json');



describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const store = {
    id_token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`
  }

  describe('activeRoute have authorization code', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          RouterTestingModule.withRoutes([{
            path: 'dashboard/app-list',
            component: AppListComponent
          }]),
          ReactiveFormsModule,
          FormsModule,
          NgxsModule.forRoot(),
          MatDialogModule,
          BrowserAnimationsModule
        ],
        declarations: [ LoginComponent, ModalComponent ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [
          { provide: APP_CONFIG, useValue: appConfig },
          {
            provide: AuthAzureService,
            useValue: {
              validateAuthFlow: () => Promise.resolve(true)
            }
          },
          {
            provide: ActivatedRoute,
            useValue: {
              queryParams: of({code: store.id_token})
            }
          },
          MatDialog
        ]
      })
      .compileComponents();
    });
  
    beforeEach(() => {
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    afterEach(() => {
      fixture.destroy();
    });
  
    it('should create', fakeAsync(() => {
      tick(4000);
      fixture.detectChanges();
      expect(component).toBeTruthy();
    }));
  
    it('should open dialog', () => {
      spyOn(component, 'openDialog').and.callThrough();
  
      component.openDialog()   
      
      expect(component.openDialog).toHaveBeenCalled();
    });
  
    it('should submit login form', () => {
      spyOn(component, 'SubmitLoginForm').and.callThrough();
      spyOn(component, 'LoginAzure').and.returnValue(Promise.resolve());
  
      component.SubmitLoginForm();   
      
      expect(component.SubmitLoginForm).toHaveBeenCalled();
      expect(component.LoginAzure).toHaveBeenCalled();
    });
  
    it('loginMock() should set mock user', () => {
      spyOn(component, 'LoginMock').and.callThrough();
  
      component.LoginMock();
      
      expect(component.LoginMock).toHaveBeenCalled();
      expect(component.user).toEqual({
        code!: DATA_LOGIN.userData.id!,
        name!: `${DATA_LOGIN.userData.nombre} ${DATA_LOGIN.userData.apellido}`!,
        email!: DATA_LOGIN.userData.usuario!,
        id!: DATA_LOGIN.userData.id!,
      });
    });
  
    it('isValidField () should return is-invalid', () => {
      spyOn(component.loginForm, 'get').and.returnValue({
        valid: false,
        touched: true
      });
    
      expect(component.isValidField('field1')).toEqual('is-invalid');
    });
  
    it('isValidField () should return is-valid when form valid', () => {
      spyOn(component.loginForm, 'get').and.returnValue({
        valid: true,
        touched: true
      });
    
      expect(component.isValidField('field1')).toEqual('is-valid');
    });
  
    it('isValidField() should return is-valid when form valid', fakeAsync(() => {
      spyOn(component.loginForm, 'get').and.returnValue({
        valid: true,
        touched: true
      });
      tick(3001);
      expect(component.isValidField('field1')).toEqual('is-valid');
  
      fixture.whenStable().then(() => {
      })
    }));
  
    it('LoginAzure() should call validateAuthFlow', () => {
      spyOn(component, 'LoginAzure').and.callThrough();
      localStorage.setItem('id_token', store.id_token);
  
      component.LoginAzure('mock_authorizationCode');
  
      expect(component.LoginAzure).toHaveBeenCalled();
    });
  
    it('LoginAzure() should call validateAuthFlow Token', () => {
      expect(localStorage.getItem('id_token')).toEqual(store.id_token);
    });
  })

  describe('activeRoute have authorization code', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          RouterTestingModule.withRoutes([{
            path: 'dashboard/app-list',
            component: AppListComponent
          }]),
          ReactiveFormsModule,
          FormsModule,
          NgxsModule.forRoot(),
          MatDialogModule,
          BrowserAnimationsModule
        ],
        declarations: [ LoginComponent, ModalComponent ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [
          { provide: APP_CONFIG, useValue: appConfig },
          {
            provide: AuthAzureService,
            useValue: {
              validateAuthFlow: () => Promise.resolve(true)
            }
          },
          {
            provide: ActivatedRoute,
            useValue: {
              queryParams: of({error: 'error'})
            }
          },
          MatDialog
        ]
      })
      .compileComponents();
    });
  
    beforeEach(() => {
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    afterEach(() => {
      fixture.destroy();
    });
  
    it('should create', fakeAsync(() => {
      tick(4000);
      fixture.detectChanges();
      expect(component).toBeTruthy();
    }));
  })
});
