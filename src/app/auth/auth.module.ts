import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatDialogRef,MAT_DIALOG_DATA,MatDialogModule } from '@angular/material/dialog';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { LogoComponent } from '../shared/components/logo/logo.component';
import { SharedModule } from '../shared.module';


@NgModule({
declarations: [
LoginComponent,
LogoComponent,
],
imports: [
CommonModule,
AuthRoutingModule,
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
export class AuthModule { }
