import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('OpenSidebar should change sidebarShow to true', () => {
    spyOn(component, 'OpenSidebar').and.callThrough();

    component.OpenSidebar(true);

    expect(component.OpenSidebar).toHaveBeenCalled();
    expect(component.sidebarShow).toBeTrue();
  });

  it('OpenSidebar should change sidebarShow to false', () => {
    spyOn(component, 'OpenSidebar').and.callThrough();

    component.OpenSidebar(false);

    expect(component.OpenSidebar).toHaveBeenCalled();
    expect(component.sidebarShow).toBeFalse();
  });
});
