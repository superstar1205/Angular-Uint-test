import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { Data } from '../../../../shared/models/BreadcumbData';
import { Affiliates } from '../../../../shared/models/Affiliate';
import { User } from '../../../../shared/models/User';

import { affiliates_data } from '../../../../shared/data/data';
import { Title } from '@angular/platform-browser';
import { AppConstants } from '../../../../shared/constants';
import { AffiliateService } from '../../../services/affiliate/affiliate.service';
import { SearchData } from '../../../../shared/models/SearchData';
import { EncodeData, DeleteStorage, DecodeData } from 'src/app/shared/storage-handler';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';

import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SetUserSearchSelectAction } from '../../../../state/user-search-select/user-search-select.actions';
import { UserLogedInitial } from '../../../../state/InitialStates/UserLoged';


@Component({
	selector: 'app-search-result',
	templateUrl: './search-result.component.html',
	styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit,AfterContentInit {

	users$: Observable<User>;
	public userDefault: User = UserLogedInitial;

	public user?: User;
	public status : string = 'Cargando datos...'
	public ShowLoading: boolean = false;
	public statusText: string;

	//affiliates: Affiliates[] = affiliates_data;
	affiliates$: Observable<Affiliates[]>;
	affiliatesdata: Affiliates[] = [];
	// affiliates : Affiliates[] = [{
    //     "codigoPersona": "1328252",
    //     "cuspp": "532011PZUOQ7",
    //     "identificacionTipo": "DNI",
    //     "identificacionNumero": "25822119",
    //     "nombrePrimero": "POMPEYO",
    //     "nombreSegundo": "CIPRIANO",
    //     "apellidoPaterno": "ZAMORA",
    //     "apellidoMaterno": "UBAQUI",
    //     "indicadorRetiro": "3",
    //     "motivoRetiro": "asdasd"
    // }]
	bread : Data[] = [
		{
			text: 'Inicio',
			url: '../../'
		},
		{
			text: 'Búsqueda de Afiliado',
			url: '../'
		},
		{
			text: 'Resultados',
			url: ''
		}
	]

	constructor(
		public dialog: MatDialog,
		private titleService: Title,
		private router : Router,
		private affiliateService: AffiliateService,
		private store: Store
	) {
		this.affiliates$ = this.store.select(state => state.userSearch.affiliates);
		this.users$ = this.store.select(state => state.userLoged.user);
	}

	openDialog() {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.data = {
			text: this.statusText
		};
		this.dialog.open(ModalComponent,dialogConfig);

	}

	ngOnInit(): void {
		this.affiliates$.subscribe(resp =>{
			this.affiliatesdata = resp || [];
		})

		this.users$.subscribe(resp =>{
			this.userDefault = resp || UserLogedInitial;

			const {id,email,name,code} = this.userDefault ;
			const datos = {id,email,name,code};
			this.user = datos;
		})
		

		this.titleService.setTitle(`${AppConstants.AppName} ::: Resultados`);
		//this.affiliates = DecodeData(AppConstants.AffiliateStorage) || [];
	}

	ngAfterContentInit():void{
		if(this.affiliatesdata.length <= 0){
			this.statusText = `No existen datos del afiliado`;
			this.openDialog();
			this.router.navigateByUrl('dashboard/consulta-360/search')
		}
	}

	GenInt = (num:string):number =>{
		////console.log(parseInt(num))
		return parseInt(num);
	}

	ClientDetail = (docNum,cuspp,programa,codigoPersona) =>{
		// this.ShowLoading = true;
		// this.store.dispatch(new SetUserSearchSelectAction({}))
		// this.affiliateService.ValidateUser(cuspp,codigoPersona,programa)
		// 	.subscribe(resp =>{
		// 		if(resp.statusResponse){
		// 			const resultQuery = resp.statusResponseBody;
		// 			localStorage.setItem('id_token_',resultQuery.token);
		// 			const acceso = parseInt(resultQuery.acceso);
		// 			if(acceso===0){
		// 				const data = {codigoPersona: docNum};
		// 				this.affiliateService.SearchAffiliatexCode()
		// 					.subscribe(resp =>{
		// 						////console.log("resp=>",resp.statusResponseBody)
		// 						//EncodeData(AppConstants.AffiliateDataResult,resp.statusResponseBody);
		// 						this.store.dispatch(new SetUserSearchSelectAction(resp.statusResponseBody))
		// 						this.ShowLoading = false;
		// 						if(resp.statusResponse){
		// 							this.router.navigateByUrl('dashboard/consulta-360/search/result/client')
		// 						}else{
		// 							this.statusText = resp.statusResponseMessage === undefined ? `No se puede conectar con el servidor \n Error: ${resp.statusText}` : resp.statusResponseMessage;
		// 							this.openDialog();
		// 						}
		// 					})
		// 			}else{
		// 				this.ShowLoading = false;
		// 				this.statusText = `No posee acceso al CUSPP`;
		// 				this.openDialog();
		// 			}
		// 		}else{
		// 			this.ShowLoading = false;
		// 			this.statusText = resp.statusResponseMessage === undefined ? `No se puede conectar con el servidor \n Error: ${resp.statusText}` : resp.statusResponseMessage;
		// 			this.openDialog();
		// 		}
		// 	})


	
		const dataMock = {
			"codigoPersona": "1328252",
			"cuspp": "532011PZUOQ7",
			"identificacionTipo": "DNI",
			"identificacionNumero": "25822119",
			"apellidoPaterno": "ZAMORA",
			"apellidoMaterno": "UBAQUI",
			"nombrePrimero": "POMPEYO",
			"nombreSegundo": "CIPRIANO",
			"fechaNacimiento": "19630711",
			"sexo": "M",
			"direccionAvenida": "MZ.F1 LOTE 22 SECTOR F AA.HH.MI PERU",
			"direccionNumero": "",
			"direccionUrbanizacion": "",
			"departamentoDescripcion": "CALLAO",
			"provinciaDescripcion": "CALLAO",
			"distritoDescripcion": "VENTANILLA",
			"direccionReferencia": "",
			"telefonoResidencia": "",
			"telefonoOficina": "",
			"celular": "",
			"emailPrincipal": "",
			"emailSecundario": ""
		};
		this.store.dispatch(new SetUserSearchSelectAction(dataMock))
		this.router.navigateByUrl('dashboard/consulta-360/search/result/client')

		
	}

}
