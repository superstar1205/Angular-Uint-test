import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Data } from '../../../../shared/models/BreadcumbData';
import { Title } from '@angular/platform-browser';
import { AppConstants } from '../../../../shared/constants';


@Component({
	selector: 'app-issue-document',
	templateUrl: './issue-document.component.html',
	styleUrls: ['./issue-document.component.css']
})
export class IssueDocumentComponent implements OnInit {

	private textBeadcunb:string = '';

	bread : Data[] = [];

	constructor(
		private titleService : Title,
		public acttivatedRouter: ActivatedRoute
	) { 
		
	}

	ngOnInit(): void {
		this.titleService.setTitle(`${AppConstants.AppName} ::: Constancias`);
		this.bread = [
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
			}
			,
			{
				text: this.acttivatedRouter.snapshot.queryParamMap.get('t'),
				url: ''
			}
		]
	}

}
