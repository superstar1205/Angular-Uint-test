import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { Data } from '../../../../shared/models/BreadcumbData';
import { Title } from '@angular/platform-browser';
import { AppConstants } from '../../../../shared/constants';
import { Affiliates } from '../../../../shared/models/Affiliate';
import { DecodeData } from 'src/app/shared/storage-handler';

import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-affiliate-data',
	templateUrl: './affiliate-data.component.html',
	styleUrls: ['./affiliate-data.component.css']
})
export class AffiliateDataComponent implements OnInit,AfterContentInit {

	//affiliate : Affiliates = DecodeData(AppConstants.AffiliateDataResult) || {} ;

	affiliates$: Observable<Affiliates>;
	affiliate: Affiliates = {};

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
			text: 'Datos del Afiliado',
			url: ''
		}
	]

	constructor(
		private titleService: Title,
		private router: Router,
		private store: Store
	) {
		this.affiliates$ = this.store.select(state => state.userSearchSelect.affiliate);
	 }

	ngOnInit(): void {
		this.titleService.setTitle(`${AppConstants.AppName} ::: Detalle de Trámite`);
		this.affiliates$.subscribe(resp =>{
			this.affiliate = resp || {};
		})
	}

	ngAfterContentInit():void{
		// if(this.affiliate){
		// 	this.router.navigateByUrl('dashboard/consulta-360/search')
		// }
	}

	Back = () =>{
		this.router.navigateByUrl('dashboard/consulta-360/search/result/client');
	}

	GetFecNac = (fecha="") =>{
		if(fecha===""){
			return "";
		}else{
			return `${fecha.substring(6, 8)}/${fecha.substring(4, 6)}/${fecha.substring(0, 4)}`;
		}
	}

}
