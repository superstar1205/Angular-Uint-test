import { NgModule } from '@angular/core';
import { LoadMessagesComponent } from './shared/components/load-messages/load-messages.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		LoadMessagesComponent,
		ModalComponent,
		ButtonComponent,
	],
	exports: [LoadMessagesComponent,ModalComponent,ButtonComponent,],
	imports: [FormsModule],
	providers: [
		{ provide: MatDialogRef, useValue: {} },
		{ provide: MAT_DIALOG_DATA, useValue: {} },
	],
})
export class SharedModule { }