import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { ValidarTokenGuard } from './validar-token.guard';

import { AuthAzureService } from '../auth/services/auth/auth-azure.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APP_CONFIG } from '../injectors';

const appConfig = require('src/assets/configs/config.json');

describe('ValidarTokenGuard', () => {
  let validarTokenGuard: ValidarTokenGuard;
  let authAzureService: AuthAzureService;

  const authAzureServiceStub = {
    validateAuthFlow: () => Promise.resolve(false),
    signOut: () => {}
  };

  beforeEach(() => {
    const routerStub = () => ({ navigateByUrl: (value: string) => ({}) });
    const authServiceStub = () => ({
      validateAuthFlow: () => ({}),
      signOut: () => ({})
    });

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ValidarTokenGuard,
        { provide: Router, useFactory: routerStub },
        AuthAzureService,
        {
          provide: APP_CONFIG,
          useValue: appConfig
        }
      ]
    });
    validarTokenGuard = TestBed.inject(ValidarTokenGuard);
    authAzureService = TestBed.inject(AuthAzureService);
  });

  it('debe cargar la instancia', () => {
    expect(validarTokenGuard).toBeTruthy();
  });

  it('canActive should return false when invalid auth flow', () => {
    spyOn(authAzureService, 'validateAuthFlow').and.returnValue(Promise.resolve(false));
  
    validarTokenGuard.canActivate().then(data => {
      expect(data).toEqual(false);
    })
    expect(authAzureService.validateAuthFlow).toHaveBeenCalled();
  })

  it('canActive should return true when valid auth flow', () => {
    spyOn(authAzureService, 'validateAuthFlow').and.returnValue(Promise.resolve(true));
  
    validarTokenGuard.canActivate().then(data => {
      expect(data).toEqual(true);
    })
    expect(authAzureService.validateAuthFlow).toHaveBeenCalled();
  })
});
