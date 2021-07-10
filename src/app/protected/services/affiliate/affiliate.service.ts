import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { of, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiConstants,AppConstants } from '../../../shared/constants';
import { SearchData } from '../../../shared/models/SearchData';
import { SearchResponse } from '../../../shared/models/responses/Searchresponse';
import { Affiliates } from '../../../shared/models/Affiliate';
import { AccessQuery } from '../../../shared/models/AccessQuery';
import { Procedures } from '../../../shared/models/Procedures';
import { ProceduresDetail } from '../../../shared/models/ProceduresDetail';
import { APP_CONFIG } from 'src/app/injectors';
import { AppConfig } from 'src/app/shared/models/App-config.model';

@Injectable({
	providedIn: 'root'
})

export class AffiliateService {

	private coreServiceUrl: string;
	private xIbmClientId: string;
	private xIbmSecretId: string;
	private _affiliate! : [Affiliates];
	private _respQuery! : AccessQuery;
	private _procedures! : [Procedures];
	private _proceduresDetail! : ProceduresDetail;

	get ProceduresDetail(){
		return {...this._proceduresDetail}
	}

	get Procedures(){
		return {...this._procedures}
	}

	get accessQuery(){
		return {...this._respQuery}
	}

	get affiliate(){
		return {...this._affiliate}
	}

	constructor(

		private http: HttpClient,
		private router: Router,
		@Inject(APP_CONFIG) appConfig: AppConfig,

	) { 
		this.coreServiceUrl = appConfig.coreServiceUrl;
		this.xIbmClientId = appConfig.xibmclientid;
		this.xIbmSecretId = appConfig.xibmclientsecret;
	}

	SearchAffiliate (type:number,searchData:SearchData){
		const token: string = localStorage.getItem('id_token');
		
			// type === 1 ? `/contacto?codigoPersona=${searchData.codigoPersona}` : 
			// type === 2 ? `/nombre?primerNombre=${searchData.primerNombre}&segundoNombre=${searchData.segundoNombre}&apellidoPaterno=${searchData.apellidoPaterno}&apellidoMaterno=${searchData.apellidoMaterno}` : 
			// `/documento?identificacionTipo=${searchData.identificacionTipo}&identificacionNumero=${searchData.identificacionNumero}`;

		const service = 
			type === 1 ? `/afiliado-codigo-persona?codigoPersona=${searchData.codigoPersona}` : 
			type === 2 ? `/afiliado-nombre?primerNombre=${searchData.primerNombre}&segundoNombre=${searchData.segundoNombre}&apellidoPaterno=${searchData.apellidoPaterno}&apellidoMaterno=${searchData.apellidoMaterno}` : 
			`/afiliado-tipo-documento?identificacionTipo=${searchData.identificacionTipo}&identificacionNumero=${searchData.identificacionNumero}`;
		
		////console.log(service)
		
		//const url = `${this.baseUrl}${ApiConstants.ApiAffiliate}${service}`;
		const url = `${this.coreServiceUrl}/private${service}`;
		//console.log(url)

		const headers = {
			['x-ibm-client-id']: this.xIbmClientId,
			['x-ibm-client-secret']: this.xIbmSecretId,
			['authorization']: `Bearer ${token}`,
		};

		////console.log(headers)
		
		return this.http.get <SearchResponse>(url,{headers})
			.pipe(
				tap(resp => {
					if(resp.statusResponse ){
						if(resp.countBody===1){
							this._affiliate = [resp.statusResponseBody];
						}else{
							this._affiliate = resp.statusResponseBody;
						}
						
					}
				}),
				map(resp => resp),
				catchError(err => of(err))
			)
	}


	SearchAffiliatexCode (){
		const token: string = localStorage.getItem('id_token_');
		const service = `/consulta-tramite`;
		
		////console.log(service)
		const url = `${this.coreServiceUrl}/private${service}`;
		//console.log(url)

		const headers = {
			['x-ibm-client-id']: this.xIbmClientId,
			['x-ibm-client-secret']: this.xIbmSecretId,
			['jwtToken']: `Bearer ${token}`,
		};

		////console.log(headers)
		
		return this.http.get <SearchResponse>(url,{headers})
			.pipe(
				tap(resp => {
					if(resp.statusResponse ){
						if(resp.countBody===1){
							this._affiliate = [resp.statusResponseBody];
						}else{
							this._affiliate = resp.statusResponseBody;
						}
						
					}
				}),
				map(resp => resp),
				catchError(err => of(err))
			)
	}

	ValidateUser(cuspp:string,codigoUsuario:string,programa:string){
		const token: string = localStorage.getItem('id_token');
		const service = `/consulta-asesor?cuspp=${cuspp}&programa=${programa}`;

		////console.log(service)
		
		const url = `${this.coreServiceUrl}/private${service}`;
		//console.log(url)

		const headers = {
			['x-ibm-client-id']: this.xIbmClientId,
			['x-ibm-client-secret']: this.xIbmSecretId,
			['jwtToken']: `Bearer ${token}`,
		};

		////console.log(headers)
		
		return this.http.get <SearchResponse>(url,{headers})
			.pipe(
				tap(resp => {
					if(resp.statusResponse ){
						this._respQuery = resp.statusResponseBody;
					}
				}),
				map(resp => resp),
				catchError(err => of(err))
			)
	}

	GetConsultationProcedure(){
		const token: string = localStorage.getItem('id_token_');
		const service = `/consulta-tramite`;

		////console.log(service)
		
		const url = `${this.coreServiceUrl}/private${service}`;
		//console.log(url)

		const headers = {
			['x-ibm-client-id']: this.xIbmClientId,
			['x-ibm-client-secret']: this.xIbmSecretId,
			['jwtToken']: `Bearer ${token}`,
		};

		////console.log(headers)
		
		return this.http.get <SearchResponse>(url,{headers})
			.pipe(
				tap(resp => {
					if(resp.statusResponse ){
						this._procedures = resp.statusResponseBody;
					}
				}),
				map(resp => resp),
				catchError(err => of(err))
			)
	}

	GetConsultationProcedureDetail(numeroTramite:string){
		const token: string = localStorage.getItem('id_token');
		const service = `/consulta-detalle-tramite?numeroTramite=${numeroTramite}`;
		const url = `${this.coreServiceUrl}/private${service}`;

		const headers = {
			['x-ibm-client-id']: this.xIbmClientId,
			['x-ibm-client-secret']: this.xIbmSecretId,
			['jwtToken']: `Bearer ${token}`,
		};
		
		return this.http.get <SearchResponse>(url,{headers})
			.pipe(
				tap(resp => {
					if(resp.statusResponse ){
						this._proceduresDetail = resp.statusResponseBody;
					}
				}),
				map(resp => resp),
				catchError(err => of(err))
			)
	}


	GetAsesorValidate(cuspp:string,programa:string){
			const token: string = localStorage.getItem('id_token');
			const service = `/consulta-asesor?cuspp=${cuspp}&programa=${programa}`;

		////console.log(service)
		
		const url = `${this.coreServiceUrl}/private${service}`;
		//console.log(url)

		const headers = {
			['x-ibm-client-id']: this.xIbmClientId,
			['x-ibm-client-secret']: this.xIbmSecretId,
			['jwtToken']: `Bearer ${token}`,
		};

		////console.log(headers)
		
		return this.http.get <SearchResponse>(url,{headers})
			.pipe(
				tap(resp => {
					if(resp.statusResponse ){
						this._proceduresDetail = resp.statusResponseBody;
					}
				}),
				map(resp => resp),
				catchError(err => of(err))
			)
	}

}
