import { Component, OnInit } from '@angular/core';
import { Affiliates } from '../../models/Affiliate';
import { DecodeData } from '../../storage-handler';
import { AppConstants } from '../../constants';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-head-client-data',
	templateUrl: './head-client-data.component.html',
	styleUrls: ['./head-client-data.component.css']
})
export class HeadClientDataComponent implements OnInit {

	affiliates$: Observable<Affiliates>;
	affiliate: Affiliates = {};

	//public affiliate?: Affiliates = DecodeData(AppConstants.AffiliateDataResult) || {} ;

	constructor(
		private router: Router,
		private store: Store
	) { 
		this.affiliates$ = this.store.select(state => state.userSearchSelect.affiliate);
	}

	ngOnInit(): void {
		this.affiliates$.subscribe(resp =>{
			this.affiliate = resp || {};
		})
	}

	GoToResults = () =>{
		this.router.navigateByUrl('dashboard/consulta-360/search/result');
	}

}
