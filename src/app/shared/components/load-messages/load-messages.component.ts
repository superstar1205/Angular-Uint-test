import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-load-messages',
	templateUrl: './load-messages.component.html',
	styleUrls: ['./load-messages.component.css']
})
export class LoadMessagesComponent implements OnInit {

	@Input() text?:string;

	constructor() { }

	ngOnInit(): void {
	}

}
