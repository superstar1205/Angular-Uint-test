import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Applications } from '../../../shared/models/Applications';
import { applications } from '../../../shared/data/data';

import { Title } from '@angular/platform-browser';
import { AppConstants } from '../../../shared/constants';
import { User } from '../../../shared/models/User';
import { DecodeData } from 'src/app/shared/storage-handler';

@Component({
	selector: 'app-app-list',
	templateUrl: './app-list.component.html',
	styleUrls: ['./app-list.component.css']
})
export class AppListComponent implements OnInit {

	public user?: User;

	apps: Applications[] = applications;
  
  
	constructor(
		private titleService: Title,
		private router: Router,
	) { 

	}

	ngOnInit(): void {
		this.titleService.setTitle(`${AppConstants.AppName} ::: Aplicaciones`);
		const {id,email,name,code} = DecodeData(AppConstants.UserDataLS) || {} ;
		const datos = {id,email,name,code};
		this.user = datos;
	}

}
