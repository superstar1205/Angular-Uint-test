import { Component, OnInit,Input } from '@angular/core';
import { Data } from '../../../shared/models/BreadcumbData';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-breadcumb',
	templateUrl: './breadcumb.component.html',
	styleUrls: ['./breadcumb.component.css']
})
export class BreadcumbComponent implements OnInit {

	@Input() items?: Data[];

	constructor() { 

	}

	ngOnInit(): void {
	}

}
