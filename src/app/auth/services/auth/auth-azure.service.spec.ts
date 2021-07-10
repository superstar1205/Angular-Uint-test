import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { TestBed } from "@angular/core/testing"
import { RouterTestingModule } from "@angular/router/testing"
import { of } from "rxjs";
import { APP_CONFIG } from "src/app/injectors"
import { OAuthTokenRequest } from "src/app/shared/models/token_azure/oauth-token-request.model";
import { OAuthTokenResponse } from "src/app/shared/models/token_azure/oauth-token-response.model";
import { AuthAzureService } from "./auth-azure.service";

const appConfig = require('src/assets/configs/config.json');

describe('AuthAzureService', () => {
	let service: AuthAzureService;
	let httpMock: HttpTestingController;
	let httpClient: HttpClient;

	const mockOauthTokenRes: OAuthTokenResponse = {
		access_token: 'mock_access_token',
		id_token: 'mock_id_token',
		refresh_token: 'mock_refresh_token'
	}

	const oAuthTokenRequest: OAuthTokenRequest = {
		authorization_code: 'mock_authorization_code'
	}

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				HttpClientTestingModule
			],
			providers: [
				AuthAzureService,
				{
					provide: APP_CONFIG,
					useValue: appConfig
				}
			]
		})
		service = TestBed.inject(AuthAzureService);
		httpMock = TestBed.inject(HttpTestingController);
		httpClient = TestBed.inject(HttpClient);
	})

	it('should create', () => {
		expect(service).toBeTruthy();
	})

	it('validateAuthFlow() should call validateAuthorizationCode()', async () => {
		
		spyOn(service, 'validateAuthFlow').and.callThrough();
		spyOn(service, 'validateAuthorizationCode').and.callThrough();
		spyOn(service, 'requestOAuthToken').and.returnValue(of(mockOauthTokenRes));
		spyOn(service, 'onHasValidPermission').and.returnValue(true);

		const result = await service.validateAuthFlow(oAuthTokenRequest);

		expect(service.validateAuthFlow).toHaveBeenCalled();
		expect(service.validateAuthorizationCode).toHaveBeenCalledOnceWith(oAuthTokenRequest.authorization_code);
		expect(result).toEqual(true);
	})

	it('validateAuthFlow() should call validateIdToken()', async() => {
		spyOn(service, 'validateAuthFlow').and.callThrough();
		spyOn(service, 'validateAuthorizationCode').and.returnValue(Promise.resolve(null));
		spyOn(localStorage, 'getItem').and.callFake((key: string) => key);
		spyOn(service, 'hasValidToken').and.returnValue(false);
		spyOn(service, 'validateRefreshToken').and.returnValue(Promise.resolve(mockOauthTokenRes));
		spyOn(service, 'validateIdToken').and.callThrough();

		const result = await service.validateAuthFlow(oAuthTokenRequest);

		expect(service.validateAuthFlow).toHaveBeenCalled();
		expect(service.validateIdToken).toHaveBeenCalled();
		expect(result).toEqual(true);
	})

	it('validateAuthFlow() should call validateIdToken() with valid id_token in local storage', async() => {
		spyOn(service, 'validateAuthFlow').and.callThrough();
		spyOn(service, 'validateAuthorizationCode').and.returnValue(Promise.resolve(null));
		spyOn(localStorage, 'getItem').and.returnValue('mock_id_token');
		spyOn(service, 'hasValidToken').and.returnValue(true);
		spyOn(service, 'validateIdToken').and.callThrough();

		const result = await service.validateAuthFlow(oAuthTokenRequest);

		expect(service.validateAuthFlow).toHaveBeenCalled();
		expect(service.validateIdToken).toHaveBeenCalled();
		expect(result).toEqual(true);
	})

	it('validateAuthFlow() should call validateRefreshToken()', async() => {
		spyOn(service, 'validateAuthFlow').and.callThrough();
		spyOn(service, 'validateAuthorizationCode').and.returnValue(Promise.resolve(null));
		spyOn(service, 'validateIdToken').and.returnValue(Promise.resolve(null));
		spyOn(localStorage, 'getItem').and.returnValue('mock_refresh_token');
		spyOn(service, 'refreshOAuthToken').and.returnValue(of(mockOauthTokenRes));
		spyOn(service, 'validateRefreshToken').and.callThrough();

		const result = await service.validateAuthFlow();

		expect(service.validateAuthFlow).toHaveBeenCalled();
		expect(service.validateRefreshToken).toHaveBeenCalled();
		expect(result).toEqual(true);
	})

	it('validateAuthFlow() should call onHasInvalidPermission()', async() => {
		spyOn(service, 'validateAuthFlow').and.callThrough();
		spyOn(service, 'validateAuthorizationCode').and.returnValue(Promise.resolve(null));
		spyOn(service, 'validateIdToken').and.returnValue(Promise.resolve(null));
		spyOn(service, 'validateRefreshToken').and.returnValue(Promise.resolve(null));
		spyOn(service, 'onHasInvalidPermission').and.returnValue(true);

		await service.validateAuthFlow();

		expect(service.validateAuthFlow).toHaveBeenCalled();
		expect(service.onHasInvalidPermission).toHaveBeenCalled();
	})

	it('validateAuthorizationCode() should return null', async() => {
		spyOn(service, 'validateAuthorizationCode').and.callThrough();

		const result = await service.validateAuthorizationCode('');

		expect(service.validateAuthorizationCode).toHaveBeenCalled();
		expect(result).toEqual(null);
	})

	it('validateAuthorizationCode() should return null when requestOAuthToken failed', async() => {
		spyOn(service, 'requestOAuthToken').and.returnValue(of(null));
		spyOn(service, 'validateAuthorizationCode').and.callThrough();

		const result = await service.validateAuthorizationCode('mock');

		expect(service.validateAuthorizationCode).toHaveBeenCalled();
		expect(result).toEqual(null);
	})

	it('validateRefreshToken() should return null', async() => {
		spyOn(localStorage, 'getItem').and.callFake(() => null);
		spyOn(service, 'validateRefreshToken').and.callThrough();

		const result = await service.validateRefreshToken();

		expect(service.validateRefreshToken).toHaveBeenCalled();
		expect(result).toEqual(null);
	})

	it('validateRefreshToken() should return null when requestOAuthToken failed', async() => {
		spyOn(localStorage, 'getItem').and.callFake(() => 'mock');
		spyOn(service, 'refreshOAuthToken').and.returnValue(of(null));
		spyOn(service, 'validateRefreshToken').and.callThrough();

		const result = await service.validateRefreshToken();

		expect(service.validateRefreshToken).toHaveBeenCalled();
		expect(result).toEqual(null);
	})

	it('signOut() should clear local storage', () => {
		spyOn(localStorage, 'clear').and.callFake(() => {});

		service.signOut();

		expect(localStorage.clear).toHaveBeenCalled();
	})

	it('hasValidToken() should return true when in valid time', () => {
		const isValid = service.hasValidToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjI1MjQ1ODI4MDAwMDB9.hkBLYzP_FLhYlk-arNZkr4UHR8Bd5Brts2waOzc0HXQ');

		expect(isValid).toBeTrue();
	})

	it('refreshOAuthToken() should get refresh token form localStorage', () => {
		spyOn(localStorage, 'getItem').and.returnValue('mock_refresh_token');

		service.refreshOAuthToken().subscribe();
		const req = httpMock.expectOne('https/oauth2/token');

		expect(req.request.method).toEqual('POST');
	})

	it('refreshOAuthToken() should get refresh token form on argument', () => {
		service.refreshOAuthToken('rf_token').subscribe();
		const req = httpMock.expectOne('https/oauth2/token');

		expect(req.request.method).toEqual('POST');
	})

	it('requestOAuthToken() should call to get', () => {
		service.requestOAuthToken('authorization_code').subscribe();
		const req = httpMock.expectOne('https/public/oauth2/token');

		expect(req.request.method).toEqual('POST');
	})
})