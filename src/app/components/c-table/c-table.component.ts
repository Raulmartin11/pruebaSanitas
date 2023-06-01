import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Observable, debounceTime, distinctUntilChanged, filter, first, fromEvent, map, take } from 'rxjs';
import { PhotoData } from '../../models/photo.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'c-table',
  templateUrl: './c-table.component.html',
  styleUrls: ['./c-table.component.scss'],
})
export class CTableComponent implements OnInit {
  jsonArray$!: Observable<PhotoData[]>;
  dataSource!: MatTableDataSource<PhotoData>;
  displayedColumns: string[] = [];
  isLoading = false;
  observer: IntersectionObserver;
  constructor(private dataService: DataService) {}
  
  @ViewChild('tableContainer', { static: true }) tableContainer!: ElementRef;

  ngOnInit() {
    this.jsonArray$ = this.dataService.getData();
    this.jsonArray$.subscribe((response: PhotoData[]) => {
      console.log(response.slice(0,20));
      
      this.dataSource = new MatTableDataSource(response.slice(0,20))
      this.displayedColumns = Object.keys(response[0])
    })
    
    const scroll$ = fromEvent(this.tableContainer.nativeElement, 'scroll').pipe(
      map((event: any) => event.target),
      filter(({ scrollHeight, scrollTop, clientHeight }) => scrollHeight - scrollTop === clientHeight),
      debounceTime(200),
      distinctUntilChanged()
    );

    // Cargar más datos cuando se hace scroll
    scroll$.subscribe(() => {
      this.isLoading = true;
      this.loadMoreData().then((newData: any[]) => {
        console.log('1');
        
        const currentData = this.dataSource.data;
        this.dataSource.data = [...currentData, ...newData];
        this.isLoading = false;
      });
    });
  }

  loadMoreData(): Promise<any[]> {
    // Simulación de carga de datos
    return new Promise((resolve) => {
      setTimeout(() => {
        const newData = Array.from({ length: 10 }, (_, index) => ({
          id: this.dataSource.data.length + index + 1,
          name: `User ${this.dataSource.data.length + index + 1}`,
          email: `user${this.dataSource.data.length + index + 1}@example.com`
        }));
        resolve(newData);
      }, 1500);
    });
  }

  applyFilter(event: Event): void {
    const filter = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
    this.dataSource.filter = filter;
  } 
}