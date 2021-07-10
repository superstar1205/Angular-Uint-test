import { Component, OnInit } from '@angular/core';
import { Applications } from '../../../../shared/models/Applications';
import { applications } from '../../../../shared/data/data';


@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

	apps: Applications[] = applications;

	constructor() { }

	ngOnInit(): void {
	}

}
