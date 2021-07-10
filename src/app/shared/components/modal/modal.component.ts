import { Component, OnInit, Input, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.css']
})
export class ModalComponent {
	// @Input() text?:string;

	// constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

	text:string;
    title:string;

    constructor(
        private dialogRef: MatDialogRef<ModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data) {
			
        this.text = data.text;
        this.title = data.title;
    }

    close() {
        this.dialogRef.close();
    }
}
export interface DialogData {}