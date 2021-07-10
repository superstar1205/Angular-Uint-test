import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ApplicationsComponent } from './applications.component';

describe('ApplicationsComponent', () => {
  let component: ApplicationsComponent;
  let fixture: ComponentFixture<ApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('should call onResize', () => {
    spyOn(component, 'onResize').and.callThrough();

    component.onResize({target: {innerWidth: 400}});

    expect(component.onResize).toHaveBeenCalled();
  });

  it('should set bullet active equal id', () => {
    spyOn(component, 'clickBullet').and.callThrough();

    component.clickBullet(11);

    expect(component.clickBullet).toHaveBeenCalled();
    expect(component.bulletActive ).toEqual(11);
  });

  it('should set screenWidth in mobile', () => {
    spyOnProperty(navigator, 'userAgent').and.returnValue('iPhone');

    component.ngOnInit();

    expect(component.screenWidth ).toEqual(500);
  });
});
