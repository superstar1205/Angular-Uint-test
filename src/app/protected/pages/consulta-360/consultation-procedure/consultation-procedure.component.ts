import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { Data } from '../../../../shared/models/BreadcumbData';
import { Title } from '@angular/platform-browser';
import { AppConstants } from '../../../../shared/constants';
import { Procedures } from '../../../../shared/models/Procedures';
import { AffiliateService } from '../../../services/affiliate/affiliate.service';
import { EncodeData, DeleteStorage, DecodeData } from 'src/app/shared/storage-handler';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';

import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SetAffiliateSelectProcedureDetailAction } from '../../../../state/affiliate-select-procedure-detail/affiliate-select-procedure-detail.actions';

@Component({
	selector: 'app-consultation-procedure',
	templateUrl: './consultation-procedure.component.html',
	styleUrls: ['./consultation-procedure.component.css']
})
export class ConsultationProcedureComponent implements OnInit,AfterContentInit {

	//proceduresList: Procedures[] = DecodeData(AppConstants.AffiliateDataProcedure) || [];
	procedures$: Observable<Procedures[]>;
	proceduresList: Procedures[] = [];
	public ShowLoading: boolean = false;
	public statusText: string;
	public status : string = 'Cargando datos...'

	bread : Data[] = [
		{
			text: 'Inicio',
			url: '../../../../'
		},
		{
			text: 'Búsqueda de Afiliado',
			url: '../../../'
		},
		{
			text: 'Resultados',
			url: '../../'
		},
		{
			text: 'Cliente',
			url: '../'
		},
		{
			text: 'Consulta de Trámites',
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
		this.procedures$ = this.store.select(state => state.affiliateSelectProcedure.procedures);
	}

	openDialog() {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.data = {
			text: this.statusText
		};
		this.dialog.open(ModalComponent,dialogConfig);

	}

	ngOnInit(): void {
		this.titleService.setTitle(`${AppConstants.AppName} ::: Consulta de trámites`);
		this.procedures$.subscribe(resp =>{
			this.proceduresList = resp || [];
		})
	}

	ngAfterContentInit():void{
		if(this.proceduresList.length <= 0){
			this.statusText = `No existen datos`;
			this.openDialog();
			this.router.navigateByUrl('dashboard/consulta-360/search')
		}
	}

	TransformFecha = (fecha="") =>{
		if(fecha===""){
			return "";
		}else{
			return `${fecha.substring(6, 8)}/${fecha.substring(4, 6)}/${fecha.substring(0, 4)}`;
		}
	}

	Cut = (text="") =>{
		if(text===""){
			return "";
		}else{
			const length = text.length;
			const ini = length - 5;
			const final = text.substring(ini,length);
			return `***${final}`;
		}
	}

	ProcedureDetail = (id: string) =>{
		this.ShowLoading = true;
		this.store.dispatch(new SetAffiliateSelectProcedureDetailAction([]))
		this.affiliateService.GetConsultationProcedureDetail(id)
			.subscribe(resp =>{
				this.store.dispatch(new SetAffiliateSelectProcedureDetailAction(resp.statusResponseBody))
				this.ShowLoading = false;
				if(resp.statusResponse){
					this.router.navigateByUrl('dashboard/consulta-360/search/result/client/consultation-procedure/procedure-detail');
				}else{
					this.statusText = resp.statusResponseMessage === undefined ? `No se puede conectar con el servidor \n Error: ${resp.statusText}` : resp.statusResponseMessage;
					this.openDialog();
				}
			})

		// const detail = [
		// 	{
		// 		"tipoSolicitud": "Retiro de 4UIT",
		// 		"numeroSolicitud": "3987594",
		// 		"fechaSolicitud": "",
		// 		"estadoSolicitud": "CAR",
		// 		"subEstado": "GER",
		// 		"motivoRechazo": "Realizó Cargo Cuenta",
		// 		"tipoPago": "Depósito",
		// 		"entidadFincaciera": "BANCO INTERBANK",
		// 		"cuenta": "************079",
		// 		"tipoCuenta": "Ahorros",
		// 		"armada": "3",
		// 		"fechaPago": "9991231"
		// 	}
		// 	,
		// 	{
		// 		"tipoSolicitud": "Retiro de 4UIT",
		// 		"numeroSolicitud": "3987594",
		// 		"fechaSolicitud": "",
		// 		"estadoSolicitud": "CAR",
		// 		"subEstado": "GER",
		// 		"motivoRechazo": "Realizó Cargo Cuenta",
		// 		"tipoPago": "APV Aporte sin fin provisional",
		// 		"entidadFincaciera": "",
		// 		"cuenta": "",
		// 		"tipoCuenta": "",
		// 		"armada": "3",
		// 		"fechaPago": "9991231"
		// 	}
		// ];
		// this.store.dispatch(new SetAffiliateSelectProcedureDetailAction(detail))
		// this.ShowLoading = false;
		// this.router.navigateByUrl('dashboard/consulta-360/search/result/client/consultation-procedure/procedure-detail');
	}

}
