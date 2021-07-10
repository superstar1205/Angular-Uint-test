import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from './guards/validar-token.guard';
import { FormsModule } from '@angular/forms';

const routes: Routes = [

	{
		path: 'auth',
		loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
	},
	{
		path: 'dashboard',
		loadChildren: () => import('./protected/protected.module').then(m => m.ProtectedModule),
		canActivate: [ValidarTokenGuard],
	},
	{
		path: '**',
		redirectTo: 'auth'
	},

];

@NgModule({
	imports: [RouterModule.forRoot(routes), FormsModule],
	exports: [RouterModule]
})
export class AppRoutingModule { }
