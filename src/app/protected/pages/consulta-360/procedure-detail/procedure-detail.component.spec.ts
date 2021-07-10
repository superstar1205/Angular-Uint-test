import { ComponentFixture, TestBed } from "@angular/core/testing"
import { Title } from "@angular/platform-browser"
import { BrowserTestingModule } from "@angular/platform-browser/testing"
import { RouterModule } from "@angular/router"
import { RouterTestingModule } from "@angular/router/testing"
import { NgxsModule } from "@ngxs/store"
import { BreadcumbComponent } from "src/app/shared/components/breadcumb/breadcumb.component"
import { HeadClientDataComponent } from "src/app/shared/components/head-client-data/head-client-data.component"
import { ProcedureDetailComponent } from "./procedure-detail.component"

describe('ProcedureDetailComponent', () => {
	let component: ProcedureDetailComponent;
	let fixture: ComponentFixture<ProcedureDetailComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				BrowserTestingModule,
				NgxsModule.forRoot(),
				RouterTestingModule
			],
			declarations: [
				ProcedureDetailComponent,
				BreadcumbComponent,
				HeadClientDataComponent
			],
			providers: [
				
			]
		}).compileComponents()
	})

	beforeEach(() => {
		fixture = TestBed.createComponent(ProcedureDetailComponent);
		component = fixture.componentInstance;
		component.detail = [{
			tipoSolicitud: 'tipoSolicitud',
			numeroSolicitud: 'numeroSolicitud'
		}];
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	})

	it('TransformFecha() should return empty when arg is empty', () => {
		expect(component.TransformFecha('')).toEqual('');
	})

	it('TransformFecha() should return transformed string when arg is valid', () => {
		expect(component.TransformFecha('012345678')).toEqual('67/45/0123');
	})
})