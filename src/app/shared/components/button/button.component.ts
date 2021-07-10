import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

	@Input() type?:string;

	constructor() { }

	ngOnInit(): void {
	}

}
