import 'zone.js/dist/zone-testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule } from '@ngxs/store';
import { FormsModule } from '@angular/forms';
import { APP_CONFIG } from 'src/app/injectors';
import { HeadClientDataComponent } from './head-client-data.component';

const appConfig = require('src/assets/configs/config.json');

describe('HeadClientDataComponent', () => {
  let component: HeadClientDataComponent;
  let fixture: ComponentFixture<HeadClientDataComponent>;

  beforeEach(fakeAsync(async () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        NgxsModule.forRoot()
      ],
      declarations: [ HeadClientDataComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: APP_CONFIG, useValue: appConfig },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadClientDataComponent);
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
