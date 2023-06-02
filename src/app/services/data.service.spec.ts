import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('DataService', () => {
  let service: DataService;
  let httpClient: HttpClient
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(DataService);
    httpClient = TestBed.inject(HttpClient);
    
  });

  it('should create the app', () => {
    expect(service).toBeTruthy();
  });

  it("test_get_data_returns_expected_data", () => {
    service.getData().subscribe(data => {
        expect(data.length).toBeGreaterThan(0);
        expect(data[0].id).toBeDefined();
        expect(data[0].photo).toBeDefined();
        expect(data[0].text).toBeDefined();
    });
  });

  it("test_generate_random_object_generates_valid_text", () => {
    const obj = service.generateRandomObject();
    expect(obj.id).toBe(1);
  });
});
