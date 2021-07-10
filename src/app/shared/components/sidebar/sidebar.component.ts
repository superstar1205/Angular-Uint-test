import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

	public sidebarShow : boolean = false;

	constructor() { }

	ngOnInit(): void {
	}

	OpenSidebar = (status) =>{
		this.sidebarShow = status;
	}

}
