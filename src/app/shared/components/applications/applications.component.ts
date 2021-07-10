import { Component, OnInit, Input } from '@angular/core';
import { Applications } from '../../models/Applications';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-applications',
	templateUrl: './applications.component.html',
	styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {

	@Input() apps?: Applications[];
	public bulletActive : number = 1;
	public bulletManagerWidth : number = 100;
	public carrouselMargin: number = 0;
	public screenWidth: number;

	constructor() { 
		this.screenWidth = 1000;
	}

	ngOnInit(): void {
		var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
		if (isMobile) {
			this.screenWidth = 500;
		}
	}

	onResize(event) {
		this.screenWidth =	event.target.innerWidth;
	}

	clickBullet(id){
		this.bulletActive = id;
		const margin = (id*this.bulletManagerWidth)-this.bulletManagerWidth;
		this.carrouselMargin = margin;
	}

}