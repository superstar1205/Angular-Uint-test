import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UserLogedState } from './state/user-loged/user-loged.state';
import { UserSearchState } from './state/user-search/user-search.state';
import { UserSearchSelectState } from './state/user-search-select/user-search-select.state';
import { AffiliateSelectProcedureState } from './state/affiliate-select-procedure/affiliate-select-procedure.state';
import { AffiliateSelectProcedureDetailState } from './state/affiliate-select-procedure-detail/affiliate-select-procedure-detail.state';
import { environment } from 'src/environments/environment';


@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		BrowserAnimationsModule,
		NgxsModule.forRoot(
			[
				UserLogedState,
				UserSearchState,
				UserSearchSelectState,
				AffiliateSelectProcedureState,
				AffiliateSelectProcedureDetailState,
			],
			{ developmentMode: !environment.production }
		),
		NgxsReduxDevtoolsPluginModule.forRoot({
			disabled: environment.production
		}),
		NgxsLoggerPluginModule.forRoot({
			disabled: environment.production
		})
	],
	providers: [
		Title,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
