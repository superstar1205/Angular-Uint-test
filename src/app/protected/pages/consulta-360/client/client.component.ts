import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { Data } from '../../../../shared/models/BreadcumbData';
import { DocumentsData } from '../../../../shared/models/DocumentsData';
import { documents_data } from '../../../../shared/data/data';
import { Title } from '@angular/platform-browser';
import { AppConstants } from '../../../../shared/constants';
import { AffiliateService } from '../../../services/affiliate/affiliate.service';
import { EncodeData, DeleteStorage, DecodeData } from 'src/app/shared/storage-handler';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { Affiliates } from '../../../../shared/models/Affiliate';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';

import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SetAffiliateSelectProcedureAction } from '../../../../state/affiliate-select-procedure/affiliate-select-procedure.actions';

@Component({
	selector: 'app-client',
	templateUrl: './client.component.html',
	styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit,AfterContentInit {

	documents: DocumentsData[] = documents_data;
	documentsSelected : any[] = [];
	public ShowLoading: boolean = false;
	//affiliates: Affiliates[] = DecodeData(AppConstants.AffiliateStorage) || [];
	affiliates$: Observable<Affiliates[]>;
	affiliatesdata: Affiliates[] = [];
	public statusText: string;
	public status : string = 'Cargando datos...'

	bread : Data[] = [
		{
			text: 'Inicio',
			url: '../../../'
		},
		{
			text: 'Búsqueda de Afiliado',
			url: '../../'
		},
		{
			text: 'Resultados',
			url: '../'
		},
		{
			text: 'Cliente',
			url: ''
		}
	]

	constructor(
		public dialog: MatDialog,
		private titleService: Title,
		private router: Router,
		private affiliateService: AffiliateService,
		private store: Store
	) {
		this.affiliates$ = this.store.select(state => state.userSearch.affiliates);
	 }

	openDialog() {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.data = {
			text: this.statusText
		};
		this.dialog.open(ModalComponent,dialogConfig);

	}

	ngOnInit(): void {
		this.titleService.setTitle(`${AppConstants.AppName} ::: Cliente`);
		this.affiliates$.subscribe(resp =>{
			this.affiliatesdata = resp || [];
		})
	}

	ngAfterContentInit():void{
		if(this.affiliatesdata.length <= 0){
			this.statusText = `No existen datos del afiliado`;
			this.openDialog();
			this.router.navigateByUrl('dashboard/consulta-360/search')
		}
	}

	SelectCheck = (id:any) => {
		const existe = this.documentsSelected.indexOf(id);
		if(existe<=-1){
			this.documentsSelected.push(id);
		}else{
			this.documentsSelected.splice(existe,1);
		}
	}

	IsChecked = (id:any) =>{
		const existe = this.documentsSelected.indexOf(id);
		return existe<=-1 ? '' : 'active';
	}

	GoToProcedureConsultant = () =>{
		this.ShowLoading = true;
		this.store.dispatch(new SetAffiliateSelectProcedureAction([]))

		// this.affiliateService.GetConsultationProcedure()
		// 	.subscribe(resp =>{
		// 		this.store.dispatch(new SetAffiliateSelectProcedureAction(resp.statusResponseBody))
		// 		this.ShowLoading = false;
		// 		if(resp.statusResponse){
		// 			this.router.navigateByUrl('dashboard/consulta-360/search/result/client/consultation-procedure')
		// 		}else{
		// 			this.statusText = resp.statusResponseMessage === undefined ? `No se puede conectar con el servidor \n Error: ${resp.statusText}` : resp.statusResponseMessage;
		// 			this.openDialog();
		// 		}
		// 	})


			const tramites = [
				{
					"codigoPersona": "466957",
					"keyAfp": "",
					"numeroTramite": "9052052",
					"tipoSolicitud": "",
					"fechaSolicitud": "",
					"totalArmada": "0",
					"armada": "0",
					"estadoSolicitud": "ANU",
					"subEstado": "FHO"
				},
				{
					"codigoPersona": "466957",
					"keyAfp": "",
					"numeroTramite": "9052051",
					"tipoSolicitud": "",
					"fechaSolicitud": "",
					"totalArmada": "0",
					"armada": "0",
					"estadoSolicitud": "ANU",
					"subEstado": "FHO"
				},
				{
					"codigoPersona": "466957",
					"keyAfp": "05245161-20201210-112928",
					"numeroTramite": "4450199",
					"tipoSolicitud": "Retiro de 4UIT",
					"fechaSolicitud": "20201210",
					"totalArmada": "1",
					"armada": "1",
					"estadoSolicitud": "RCH",
					"subEstado": "NER"
				},
				{
					"codigoPersona": "466957",
					"keyAfp": "",
					"numeroTramite": "3987594",
					"tipoSolicitud": "",
					"fechaSolicitud": "",
					"totalArmada": "0",
					"armada": "0",
					"estadoSolicitud": "TRS",
					"subEstado": ""
				}
			]

			this.store.dispatch(new SetAffiliateSelectProcedureAction(tramites))
			this.ShowLoading = false;
			this.router.navigateByUrl('dashboard/consulta-360/search/result/client/consultation-procedure')
	}

}
