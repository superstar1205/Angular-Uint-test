import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { ValidarTokenGuard } from './validar-token.guard';

import { AuthAzureService } from '../auth/services/auth/auth-azure.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthStatusGuard } from './auth-status.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { AppListComponent } from '../protected/pages/app-list/app-list.component';
import { LoginComponent } from '../auth/pages/login/login.component';

describe('ValidarTokenGuard', () => {
  let authStatusGuard: AuthStatusGuard;
  const mockLocalStorage = {
    id_token: 'token'
  }

  beforeEach(() => {
    const routerStub = () => ({ navigateByUrl: (value: string) => ({}) });
    const authServiceStub = () => ({
      validateAuthFlow: () => ({}),
      signOut: () => ({})
    });

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([{
          path: 'dashboard/app-list',
          component: AppListComponent
        }, {
          path: 'auth',
          component: LoginComponent
        }])
      ],
      providers: [
        AuthStatusGuard,
      ]
    });
    authStatusGuard = TestBed.inject(AuthStatusGuard);
  });

  it('should create', () => {
    expect(authStatusGuard).toBeTruthy();
  });

  it('canActive should return true when have token', () => {
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return mockLocalStorage[key];
    });
  
    authStatusGuard.canActivate();
  
    expect(authStatusGuard.canActivate()).toBeTruthy();
  })

  it('canActive should return false when dont have token', () => {
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return null;
    });
  
    authStatusGuard.canActivate();
  
    expect(authStatusGuard.canActivate()).toBeFalse();
  })
});
