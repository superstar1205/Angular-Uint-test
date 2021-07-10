import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

import { APP_CONFIG } from 'src/app/injectors';
import { AppConfig } from 'src/app/shared/models/App-config.model';

import { OAuthTokenRequest } from '../../../shared/models/token_azure/oauth-token-request.model';
import { OAuthTokenResponse } from '../../../shared/models/token_azure/oauth-token-response.model';
import { DecodedToken } from '../../../shared/models/token_azure/decoded-token.model';

import { RemoveAuthCookie } from '../../../shared/cookie';
import { DeleteAllStorage } from 'src/app/shared/storage-handler';

interface JwtToken {
	exp: number;
	nbf: number;
}

@Injectable({
	providedIn: 'root'
})

export class AuthAzureService {

	private coreServiceUrl: string;
	private xIbmClientId: string;
	private xIbmSecretId: string;

	private azureAdAuthorizeEndpoint: string;
	private azureAdLogoutEndpoint: string;
	private azureAdAuthorizeParams: string;
	private azureAdTenantId: string;
	private azureAdClientId: string;
	private azureAdRedirectUri: string;


	constructor(
		private httpClient: HttpClient,
		@Inject(APP_CONFIG) appConfig: AppConfig,
	) { 
		this.coreServiceUrl = appConfig.coreServiceUrl;
		this.xIbmClientId = appConfig.xibmclientid;
		this.xIbmSecretId = appConfig.xibmclientsecret;

		this.azureAdTenantId = appConfig.azureAdTenantId;
		this.azureAdClientId = appConfig.azureAdClientId;
		this.azureAdRedirectUri = appConfig.azureAdRedirectUri;

		this.azureAdAuthorizeParams = [
			`client_id=${this.azureAdClientId}`,
			`response_type=code`,
			`redirect_uri=${encodeURIComponent(this.azureAdRedirectUri)}`,
			`response_mode=query`,
			`scope=${encodeURIComponent('openid profile')}`
		].join('&');

		this.azureAdAuthorizeEndpoint =
			`https://login.microsoftonline.com/${this.azureAdTenantId}/oauth2/v2.0/authorize?${this.azureAdAuthorizeParams}`;
		this.azureAdLogoutEndpoint = `https://login.microsoftonline.com/${this.azureAdTenantId}/oauth2/logout?client_id=${this.azureAdClientId}&post_logout_redirect_uri=${encodeURIComponent(this.azureAdRedirectUri)}`
		// this.azureAdLogoutEndpoint = `https://login.microsoftonline.com/${this.azureAdTenantId}/oauth2/logout?client_id=${this.azureAdClientId}&post_logout_redirect_uri=${encodeURIComponent(this.azureAdRedirectUri)}`
	}

	async validateAuthFlow(oAuthTokenRequest?: OAuthTokenRequest): Promise<boolean> {
		let oAuthTokenResponse = null;

		////console.log('Se valida el authorization_code...');
		const authorizationCode = oAuthTokenRequest ? oAuthTokenRequest.authorization_code : null;
		oAuthTokenResponse = await this.validateAuthorizationCode(authorizationCode);
		if (!!oAuthTokenResponse) {
			return this.onHasValidPermission(oAuthTokenResponse);
		}

		////console.log('Se valida el id_token...');
		oAuthTokenResponse = await this.validateIdToken();
		if (!!oAuthTokenResponse) {
			return this.onHasValidPermission(oAuthTokenResponse);
		}

		////console.log('Se valida el refresh_token...');
		oAuthTokenResponse = await this.validateRefreshToken();
		if (!!oAuthTokenResponse) {
			return this.onHasValidPermission(oAuthTokenResponse);
		}

		return this.onHasInvalidPermission();
	}


	async validateAuthorizationCode(authorizationCode: string): Promise<OAuthTokenResponse> {
		////console.log('authorization_code: ', authorizationCode);

		if (!authorizationCode) {
			////console.log('El authorization_code es inválido.');
			return null;
		}

		const oAuthTokenResponse = await this.requestOAuthToken(authorizationCode).toPromise();
		////console.log('oAuthTokenResponse: ', oAuthTokenResponse);

		// Si es inválido...
		if (!oAuthTokenResponse || !oAuthTokenResponse.id_token) {
			////console.log('El authorization_code es inválido.');
			return null;
		}

		// Si es válido...
		////console.log('El authorization_code es válido.');
		return oAuthTokenResponse;
	}

	requestOAuthToken(authorizationCode: string): Observable<OAuthTokenResponse> {

		const headers = {
			['grant_type']: 'authorization_code',
			['code']: authorizationCode,
			['x-ibm-client-id']: this.xIbmClientId,
			['x-ibm-client-secret']: this.xIbmSecretId,
		};

		const body = {};

		return this.httpClient.post<OAuthTokenResponse>(
			`${this.coreServiceUrl}/public/oauth2/token`,
			body,
			{ headers }
		);
	}

	onHasValidPermission(oAuthTokenResponse: OAuthTokenResponse): boolean {
		////console.log('onHasValidPermission');
		this.signIn(oAuthTokenResponse);
		return true;
	}


	signIn(oAuthTokenResponse: OAuthTokenResponse): void {
		////console.log('Sign in');

		if (!!oAuthTokenResponse.access_token) {
			localStorage.setItem('access_token', oAuthTokenResponse.access_token);
		}
		if (!!oAuthTokenResponse.id_token) {
			localStorage.setItem('id_token', oAuthTokenResponse.id_token);
		}
		if (!!oAuthTokenResponse.refresh_token) {
			localStorage.setItem('refresh_token', oAuthTokenResponse.refresh_token);
		}
	}


	async validateIdToken(): Promise<OAuthTokenResponse> {
		const idToken = localStorage.getItem('id_token');
		////console.log('id_token: ', idToken);

		// Si es válido...
		if (!!idToken && this.hasValidToken(idToken)) {
			////console.log('El id_token es válido.');
			return {
				id_token: idToken
			};
		}

		// Si es inválido...
		////console.log('El id_token es inválido.');
		return null;
	}


	hasValidToken(token: string): boolean {
		try {
			const decodedToken: DecodedToken = jwt_decode(token);
			////console.log(decodedToken);

			const now = Date.now().valueOf() / 1000;
			if (!!decodedToken.exp && decodedToken.exp < now) {
				//console.warn(`Token expirado: ${token}`);
				return false;
			}
			if (!!decodedToken.nbf && decodedToken.nbf > now) {
				//console.warn(`Token aún no válido: ${token}`);
				return false;
			}
		} catch (e) {
			//console.warn(`Token inválido: ${token}`);
			//console.warn(e);
			return false;
		}

		////console.log(`Token válido: ${token}`);
		return true;
	}


	async validateRefreshToken(): Promise<OAuthTokenResponse> {
		const refreshToken = localStorage.getItem('refresh_token');
		////console.log('refresh_token: ', refreshToken);

		if (!refreshToken) {
			////console.log('El refresh_token es inválido.');
			return null;
		}

		const oAuthTokenResponse = await this.refreshOAuthToken(refreshToken).toPromise();
		////console.log('oAuthTokenResponse: ', oAuthTokenResponse);

		// Si es inválido...
		if (!oAuthTokenResponse || !oAuthTokenResponse.id_token) {
			////console.log('El refresh_token es inválido.');
			return null;
		}

		// Si es válido...
		////console.log('Se posee un refresh_token válido.');
		return oAuthTokenResponse;
	}


	refreshOAuthToken(refreshToken?: string): Observable<OAuthTokenResponse> {

		if (!refreshToken) {
			refreshToken = localStorage.getItem('refresh_token');
		}

		const headers = {
			['grant_type']: 'refresh_token',
			['refresh_token']: refreshToken,
			['x-ibm-client-id']: this.xIbmClientId,
			['x-ibm-client-secret']: this.xIbmSecretId,
		};

		const body = {};

		return this.httpClient.post<OAuthTokenResponse>(
			`${this.coreServiceUrl}/oauth2/token`,
			body,
			{ headers }
		);
	}

	onHasInvalidPermission(): boolean {
		////console.log('onHasInvalidPermission');
		window.location.href = this.azureAdAuthorizeEndpoint;
		return false;
	}

	signOut(): void {

		localStorage.clear()

		// RemoveAuthCookie();
		// DeleteAllStorage();
		// window.location.href = this.azureAdLogoutEndpoint;

		//this.router.navigateByUrl('/auth');
	}

}
