import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Data } from '../../../../shared/models/BreadcumbData';
import { FilterSelectDoc } from '../../../../shared/models/FilterSelectDoc';
import { InputSelectFilter } from '../../../../shared/data/data';
import { Title } from '@angular/platform-browser';
import { AppConstants } from '../../../../shared/constants';
import { AffiliateService } from '../../../services/affiliate/affiliate.service';
import { SearchData } from '../../../../shared/models/SearchData';
import { EncodeData, DeleteStorage } from 'src/app/shared/storage-handler';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';

import { Store } from '@ngxs/store';
import { SetUserSearchAction } from '../../../../state/user-search/user-search.actions';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

	filterDocs : FilterSelectDoc[] = InputSelectFilter;
	public maxlength : string = '';
	public pattern : string = '';
	public type : string = 'number';

	bread : Data[] = [
		{
			text: 'Inicio',
			url: '../'
		},
		{
			text: 'Búsqueda de Afiliado',
			url: ''
		}
	]

	public status : string = 'Cargando datos...'
	public ShowLoading: boolean = false;
	public statusText: string;

	documentSearchForm:any;
	apeNomSearchForm:any;
	private dataSearch : SearchData;

	constructor(
		public dialog: MatDialog,
		private titleService: Title,
		private fb:FormBuilder,
		private router: Router,
		private affiliateService: AffiliateService,
		private store: Store
	) {

	}

	openDialog() {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.data = {
			text: this.statusText
		};
		this.dialog.open(ModalComponent,dialogConfig);

	}

	ngOnInit(): void {
		this.titleService.setTitle(`${AppConstants.AppName} ::: Búsqueda`);
		this.documentSearchForm = this.fb.group({
			LsDocument:['',Validators.required,],
			document:['',Validators.required],
		})

		this.apeNomSearchForm = this.fb.group({
			FirstName:['',Validators.required],
			SecondName:[''],
			ApePat:['',Validators.required],
			ApeMat:['',Validators.required],
		})

	}

	OnChangeDoc = (doc:string) => {
		////console.log(doc)
		//Limpiamos campo
		this.documentSearchForm.controls['document'].setValue('');
		//aplicamos validación
		// this.filterDocs.map((item)=>{
		// 	////console.log(item)
		// 	if(item.element === doc){
		// 		this.maxlength = item.maxlength;
		// 		this.pattern = item.pattern;
		// 		this.type = item.type;
		// 	}
		// })

		this.filterDocs.forEach( (item) => {
			if(item.element === doc){
				this.maxlength = item.maxlength;
				this.pattern = item.pattern;
				this.type = item.type;
			}
		});

	}

	isValidField = (field:string,formPosition:number):string =>{
		let validatedField;
		if(formPosition===0){
			validatedField = this.documentSearchForm.get(field);
		}else{
			validatedField = this.apeNomSearchForm.get(field);
		}
		return (!validatedField.valid && validatedField.touched)
			? 'is-invalid' : validatedField.touched ? 'is-valid' : ''
	}

	SubmitDocumentSearchForm = () =>{
		console.log(escape('>'))
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
			this.store.dispatch(new SetUserSearchAction([dataMock]))
			this.router.navigateByUrl('dashboard/consulta-360/search/result');
			return


			

		// this.ShowLoading = true;
		
		// if(this.documentSearchForm.valid){
		// 	const {LsDocument, document} = this.documentSearchForm.value;
		// 	const data = {identificacionTipo: LsDocument, identificacionNumero: escape(document)};

		// 	//DeleteStorage(AppConstants.AffiliateStorage);
		// 	this.store.dispatch(new SetUserSearchAction([]))
		// 	this.affiliateService.SearchAffiliate(3,data)
		// 	.subscribe(resp =>{
		// 		//console.log("resp=>",resp.statusResponseBody)
		// 		if(resp.countBody ===1){
		// 			//EncodeData(AppConstants.AffiliateStorage,[resp.statusResponseBody]);
		// 			this.store.dispatch(new SetUserSearchAction([resp.statusResponseBody]))
		// 		}else{
		// 			//EncodeData(AppConstants.AffiliateStorage,resp.statusResponseBody);
		// 			this.store.dispatch(new SetUserSearchAction(resp.statusResponseBody))
		// 		}
		// 		this.ShowLoading = false;
		// 		if(resp.statusResponse){
		// 			this.router.navigateByUrl('dashboard/consulta-360/search/result');
		// 		}else{
		// 			this.statusText = resp.statusResponseMessage === undefined ? `No se puede conectar con el servidor \n Error: ${resp.statusText}` : resp.statusResponseMessage;
		// 			this.openDialog();
		// 		}
		// 	})

		// 	//this.statusText = 'La información del afiliado no es accesible';
		// 	//this.openDialog();
		// 	//this.router.navigateByUrl('dashboard/consulta-360/search/result')
		// }else{
		// 	this.ShowLoading = false;
		// 	if(this.documentSearchForm.controls.LsDocument.value === "") {
		// 		this.statusText = 'Seleccione el tipo de documento';
		// 	}else{
		// 		const doc = this.documentSearchForm.controls.LsDocument.value;
		// 		this.filterDocs.forEach( (item) => {
		// 			if(item.element === doc){
		// 				if(this.documentSearchForm.controls.document.value===""){
		// 					this.statusText = `Ingrese el ${doc}`;
		// 				}else if(this.documentSearchForm.controls.document.value.length < parseInt(item.maxlength)){
		// 					this.statusText = `El ${doc} debe tener ${item.maxlength} dígitos.`;
		// 				}
		// 			}
		// 		});
		// 	}
		// 	this.openDialog();
		// }
	}

	SubmitApenomSearchForm = () =>{
		// this.router.navigateByUrl('dashboard/consulta-360/search/result');
		// return
		

		this.ShowLoading = true;
		//DeleteStorage(AppConstants.AffiliateStorage);
		this.store.dispatch(new SetUserSearchAction([]))
		if(this.apeNomSearchForm.valid){
			const {FirstName, SecondName , ApePat , ApeMat} = this.apeNomSearchForm.value;
			console.log(escape(FirstName))
			const data = {primerNombre: escape(FirstName), segundoNombre: escape(SecondName), apellidoPaterno: escape(ApePat), apellidoMaterno: escape(ApeMat)};
			//console.log(data)
			this.affiliateService.SearchAffiliate(2,data)
				.subscribe(resp =>{
					//console.log("resp=>",resp.statusResponseBody)
					//EncodeData(AppConstants.AffiliateStorage,resp.statusResponseBody);
					this.store.dispatch(new SetUserSearchAction(resp.statusResponseBody))
					this.ShowLoading = false;
					if(resp.statusResponse){
						this.router.navigateByUrl('dashboard/consulta-360/search/result');
					}else{
						this.statusText = resp.statusResponseMessage === undefined ? `No se puede conectar con el servidor \n Error: ${resp.statusText}` : resp.statusResponseMessage;
						this.openDialog();
					}
				})
		}else{
			this.ShowLoading = false;
			this.statusText = 'Complete todos los campos';
			this.openDialog();
		}
	}

}
