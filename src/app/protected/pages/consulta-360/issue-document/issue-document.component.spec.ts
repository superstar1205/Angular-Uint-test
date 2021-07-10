import 'zone.js/dist/zone-testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { APP_CONFIG } from 'src/app/injectors';
import { IssueDocumentComponent } from './issue-document.component';
import { BreadcumbComponent } from '../../../../shared/components/breadcumb/breadcumb.component';
import { HeadClientDataComponent } from 'src/app/shared/components/head-client-data/head-client-data.component';
import { NgxsModule } from '@ngxs/store';

const appConfig = require('src/assets/configs/config.json');

describe('IssueDocumentComponent', () => {
  let component: IssueDocumentComponent;
  let fixture: ComponentFixture<IssueDocumentComponent>;

  beforeEach(fakeAsync(async () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        RouterTestingModule.withRoutes([]),
        NgxsModule.forRoot()
      ],
      declarations: [IssueDocumentComponent, BreadcumbComponent, HeadClientDataComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: APP_CONFIG, useValue: appConfig },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });
});
