import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CTableComponent } from './c-table.component';
import { DataService } from '../../services/data.service';



describe('CTableComponent', () => {
  let component: CTableComponent;
  const fakeDataService: Partial<DataService> = {}
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [DataService],
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
