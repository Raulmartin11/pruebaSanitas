import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CTableComponent } from './c-table.component';
import { DataService } from '../../services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { PhotoData } from 'src/app/models/photo.model';



describe('CTableComponent', () => {
  let component: CTableComponent;
  let dataService: DataService;
  let fixture: ComponentFixture<CTableComponent>;

  const mockData: PhotoData[] = [
    { id: 1, photo: "https://picsum.photos/id/1/500/500.jpg", text: "Lorem ipsum dolor sit amet" },
    { id: 2, photo: "https://picsum.photos/id/2/500/500.jpg", text: "consectetur adipiscing elit" }
  ];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [DataService],
      declarations: [
        CTableComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(CTableComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it("test_data_retrieval_success", () => {
    spyOn(dataService, 'getData').and.returnValue(of(mockData));

    component.ngOnInit();

    expect(component.dataSource.data).toEqual(mockData.slice(0, component.totalData));
    expect(component.displayedColumns).toEqual(['id', 'photo', 'text']);
});

  it("test_large_data", () => {
    spyOn(dataService, 'getData').and.returnValue(of(JSON.parse(dataService.generateRandomArray())));

    component.ngOnInit();

    expect(component.dataSource.data.length).toBeGreaterThan(0);
  });

  it("test_scroll_and_filter", fakeAsync(() => {
    const spyFilter = spyOn(component, 'filterAndPaginate');
    const scrollEvent = new Event('scroll');

    window.dispatchEvent(scrollEvent);
    tick(200);


    expect(spyFilter).toHaveBeenCalled();
    expect(component.totalData).toBe(25);
  }))

  it("test_mat_table_data_source", () => {

    component.jsonArray$ = of(mockData);
    component.filterAndPaginate();
    const scrollEvent = new Event('scroll');
    window.dispatchEvent(scrollEvent);

    expect(component.dataSource.data.length).toBe(mockData.length);
  });

  it("test_total_data_greater_than_response", () => {
    component.jsonArray$ = of(mockData);
    component.totalData = 1;

    component.filterAndPaginate();
    const scrollEvent = new Event('scroll');
    window.dispatchEvent(scrollEvent);

    expect(component.dataSource.data.length).toBe(1);
  });

  it("test_empty_filter", () => {
    spyOn(dataService, 'getData').and.returnValue(of(mockData));

    component.ngOnInit();
    const filterEvent = { target: { value: '' } } as unknown as Event;
    component.applyFilter(filterEvent);

    expect(component.dataSource.data).toEqual(mockData.slice(0, component.totalData));
  });

  it("test_filter_by_number", () => {
    spyOn(dataService, 'getData').and.returnValue(of(mockData));

    component.ngOnInit();
    const filterEvent = { target: { value: '1' } } as unknown as Event;
    component.applyFilter(filterEvent);

    expect(component.dataSource.data.length).toBe(1);
    expect(component.dataSource.data[0].id).toBe(1);
  });

  it("test_filter_by_text", () => {
    spyOn(dataService, 'getData').and.returnValue(of(mockData));

    component.ngOnInit();
    const filterEvent = { target: { value: 'consectetur' } } as unknown as Event;
    component.applyFilter(filterEvent);

    expect(component.dataSource.data.length).toBe(1);
    expect(component.dataSource.data[0].id).toBe(2);
  });

  it("test_filter_with_non_existent_id", () => {
    spyOn(dataService, 'getData').and.returnValue(of(mockData));

    component.ngOnInit();
    const filterEvent = { target: { value: '12' } } as unknown as Event;
    component.applyFilter(filterEvent);

    expect(component.dataSource.data.length).toBe(0);
  });

  it("test_filter_with_non_existent_text", () => {
    spyOn(dataService, 'getData').and.returnValue(of(mockData));

    component.ngOnInit();
    const filterEvent = { target: { value: 'non-existent' } } as unknown as Event;
    component.applyFilter(filterEvent);

    expect(component.dataSource.data.length).toBe(0);
  });
});
