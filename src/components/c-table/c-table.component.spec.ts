import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CTableComponent } from './c-table.component';



describe('CTableComponent', () => {
  let component: CTableComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        CTableComponent
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(CTableComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
