import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatDialogRef, MAT_DIALOG_DATA,MatDialogModule } from '@angular/material/dialog';
import { ProtectedRoutingModule } from './protected-routing.module';
import { AppListComponent } from './pages/app-list/app-list.component';
import { MainComponent } from './pages/consulta-360/main/main.component';
import { HomeComponent } from './pages/consulta-360/home/home.component';
import { SearchComponent } from './pages/consulta-360/search/search.component';
import { SearchResultComponent } from './pages/consulta-360/search-result/search-result.component';
import { ClientComponent } from './pages/consulta-360/client/client.component';
import { DocumentsComponent } from './pages/consulta-360/documents/documents.component';
import { SharedModule } from '../shared.module';
import { HeadClientDataComponent } from '../shared/components/head-client-data/head-client-data.component';
import { MainMenuComponent } from '../shared/components/main-menu/main-menu.component';
import { ApplicationsComponent } from '../shared/components/applications/applications.component';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';
import { BreadcumbComponent } from '../shared/components/breadcumb/breadcumb.component';
import { IssueDocumentComponent } from './pages/consulta-360/issue-document/issue-document.component';
import { AffiliateDataComponent } from './pages/consulta-360/affiliate-data/affiliate-data.component';
import { ConsultationProcedureComponent } from './pages/consulta-360/consultation-procedure/consultation-procedure.component';
import { ProcedureDetailComponent } from './pages/consulta-360/procedure-detail/procedure-detail.component';
@NgModule({
	declarations: [
		AppListComponent,
		MainComponent,
		HomeComponent,
		SearchComponent,
		SearchResultComponent,
		ClientComponent,
		DocumentsComponent,
		HeadClientDataComponent,
		MainMenuComponent,
		ApplicationsComponent,
		SidebarComponent,
		BreadcumbComponent,
		IssueDocumentComponent,
		AffiliateDataComponent,
		ConsultationProcedureComponent,
  		ProcedureDetailComponent,
	],
	imports: [
		CommonModule,
		ProtectedRoutingModule,
		ReactiveFormsModule,
		FormsModule,
		SharedModule,
		MatGridListModule,
		MatDialogModule
	],
	providers: [
		{ provide: MatDialogRef, useValue: {} },
		{ provide: MAT_DIALOG_DATA, useValue: {} },
	],
})
export class ProtectedModule { }
