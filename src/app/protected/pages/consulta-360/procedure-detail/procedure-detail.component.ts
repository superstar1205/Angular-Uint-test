import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { Data } from '../../../../shared/models/BreadcumbData';
import { Title } from '@angular/platform-browser';
import { AppConstants } from '../../../../shared/constants';
import { ProceduresDetail } from '../../../../shared/models/ProceduresDetail';
import { DecodeData } from 'src/app/shared/storage-handler';

import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-procedure-detail',
	templateUrl: './procedure-detail.component.html',
	styleUrls: ['./procedure-detail.component.css']
})
export class ProcedureDetailComponent implements OnInit,AfterContentInit {

	//detail : ProceduresDetail = DecodeData(AppConstants.AffiliateDataProcedureDetail) || {} ;
	details$: Observable<ProceduresDetail[]>;
	detail: ProceduresDetail[] = [];

  bread : Data[] = [
		{
			text: 'Inicio',
			url: '../../../../../'
		},
		{
			text: 'Búsqueda de Afiliado',
			url: '../../../../'
		},
		{
			text: 'Resultados',
			url: '../../../'
		},
		{
			text: 'Cliente',
			url: '../../'
		},
		{
			text: 'Consulta de Trámites',
			url: '../'
		},
		{
			text: 'Detalle del Trámite',
			url: ''
		}
	]

  	constructor(
		private titleService: Title,
		private router: Router,
		private store: Store
	) { 
		this.details$ = this.store.select(state => state.affiliateSelectProcedureDetail.detail);
	}

	ngOnInit(): void {
		this.titleService.setTitle(`${AppConstants.AppName} ::: Detalle de Trámite`);
		//this.detail = DecodeData(AppConstants.AffiliateDataProcedureDetail) || {};
		this.details$.subscribe(resp =>{
			this.detail = resp || [];
		})
	}

	ngAfterContentInit():void{
		// if(this.detail.numeroSolicitud){
		// 	//this.router.navigateByUrl('dashboard/consulta-360/search')
		// 	//console.log(this.detail)
		// }
	}

	TransformFecha = (fecha="") =>{
		if(fecha===""){
			return "";
		}else{
			return `${fecha.substring(6, 8)}/${fecha.substring(4, 6)}/${fecha.substring(0, 4)}`;
		}
	}

}
