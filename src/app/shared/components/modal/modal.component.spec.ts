import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './modal.component';
import {MatDialogRef,MAT_DIALOG_DATA,MatDialogModule} from '@angular/material/dialog';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[MatDialogModule],
      declarations: [ ModalComponent ],
      providers:[
        { provide: MatDialogRef, useValue: {
          close: () => {}
        } },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('should close', () => {
    spyOn(component, 'close').and.callThrough();

    component.close();

    expect(component.close).toHaveBeenCalled();
  });
});
