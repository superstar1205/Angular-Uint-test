import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppListComponent } from './pages/app-list/app-list.component';
import { HomeComponent } from './pages/consulta-360/home/home.component';
import { MainComponent } from './pages/consulta-360/main/main.component';
import { SearchComponent } from './pages/consulta-360/search/search.component';
import { SearchResultComponent } from './pages/consulta-360/search-result/search-result.component';
import { ClientComponent } from './pages/consulta-360/client/client.component';
import { DocumentsComponent } from './pages/consulta-360/documents/documents.component';
import { IssueDocumentComponent } from './pages/consulta-360/issue-document/issue-document.component';
import { AffiliateDataComponent } from './pages/consulta-360/affiliate-data/affiliate-data.component';
import { ConsultationProcedureComponent } from './pages/consulta-360/consultation-procedure/consultation-procedure.component';
import { ProcedureDetailComponent } from './pages/consulta-360/procedure-detail/procedure-detail.component';
import { FormsModule } from '@angular/forms';
const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'app-list', 
				component: AppListComponent
			},
			{
				path:'',
				component: MainComponent,
				children:[
					{
						path: 'consulta-360',
						children:[
							{
								path:'', 
								component: HomeComponent
							},
							{
								path: 'search', 
								children: [
									{
										path:'',
										component: SearchComponent
									},
									{
										path: 'result', 
										children: [
											{
												path: '', 
												component: SearchResultComponent
											},
											{
												path: 'client',
												children:[
 													{
														path:'', 
														component: ClientComponent
													},
													{
														path: 'issue-document',
														component: IssueDocumentComponent
													},
													{
														path: 'affiliate-data',
														component: AffiliateDataComponent
													},
													{
														path: 'consultation-procedure',
														children:[
															{
																path: '',
																component: ConsultationProcedureComponent
															},
															{
																path: 'procedure-detail',
																component: ProcedureDetailComponent
															}
														]
													}
												]
											}
										]
									}
								]
							},
							{
								path: 'documents/:type', 
								component: DocumentsComponent
							},
						]
					}
				]
			},
			{
				path: '**', 
				redirectTo: 'app-list'
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), FormsModule],
	exports: [RouterModule]
})
export class ProtectedRoutingModule { }
