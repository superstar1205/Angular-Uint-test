import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/User';
import { Notifications } from '../../models/Notifications';
import { notifications_data } from '../../data/data';
import { FormsModule } from '@angular/forms';
import { AuthAzureService } from '../../../auth/services/auth/auth-azure.service';
import { DecodeData } from '../../storage-handler';
import { AppConstants } from '../../constants';
import { ReadAuthCookie, RemoveAuthCookie } from '../../cookie';
import { DeleteAllStorage } from 'src/app/shared/storage-handler';

import { UserLogedInitial } from '../../../state/InitialStates/UserLoged';

import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-main-menu',
	templateUrl: './main-menu.component.html',
	styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

	users$: Observable<User>;
	userDefault: User = UserLogedInitial;

	public user?: User;
	@Input() notify?:boolean;
	ShowListNotifications: boolean = false;
	dataNotifications:Notifications[]=notifications_data;

	ShowNotifications = () =>{
		this.ShowListNotifications = !this.ShowListNotifications;
	}

	constructor( 
		private authAzureService: AuthAzureService,
		private router: Router,
		private store: Store
		 ) { 
			this.users$ = this.store.select(state => state.userLoged.user);
		 }

	ngOnInit(): void {
		this.users$.subscribe(resp =>{
			this.userDefault = resp || UserLogedInitial;

			const {id,email,name,code} = this.userDefault ;
			const datos = {id,email,name,code};
			this.user = datos;
		})
		
	}

	logout(){
		

		RemoveAuthCookie();
		DeleteAllStorage();
		this.router.navigateByUrl('/auth');
	}

}
