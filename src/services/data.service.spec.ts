import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";
import { DataService } from './data.service';


describe('DataService', () => {
  let service = DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        DataService
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(DataService);
    const service = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(service).toBeTruthy();
  });
});
