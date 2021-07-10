import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Data } from '../../../../shared/models/BreadcumbData';
import { DocumentsData } from '../../../../shared/models/DocumentsData';
import { documents_data } from '../../../../shared/data/data';
import { Title } from '@angular/platform-browser';
import { AppConstants } from '../../../../shared/constants';

@Component({
	selector: 'app-documents',
	templateUrl: './documents.component.html',
	styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

	documents: DocumentsData[] = documents_data;
	public textBeadcunb:string = '';
	bread : Data[] = [];

	constructor(
		private titleService : Title,
		public acttivatedRouter: ActivatedRoute,
		public router: Router
	) {
		
	}

	ngOnInit(): void {
		
		this.acttivatedRouter.queryParamMap.subscribe(params =>{
			this.titleService.setTitle(`${AppConstants.AppName} ::: Documentos - ${params.get('t')}`);
			this.textBeadcunb = params.get('t');
			this.bread = [
				{
					text: 'Inicio',
					url: '../'
				},
				{
					text: 'Documentos',
					url: ''
				},
				{
					text: params.get('t'),
					url: ''
				}
			]
		})
	}

}
