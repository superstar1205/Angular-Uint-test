import { Component, OnInit } from '@angular/core';
import { Data } from '../../../../shared/models/BreadcumbData';
import { Title } from '@angular/platform-browser';
import { AppConstants } from '../../../../shared/constants';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	bread : Data[] = [
		{
			text: 'Inicio',
			url: ''
		}
	]

	constructor(
		private titleService: Title
	) { 
		
	 }

	ngOnInit(): void {
		this.titleService.setTitle(`${AppConstants.AppName} ::: Inicio`);
	}

}
