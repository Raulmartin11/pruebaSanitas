import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, debounceTime, distinctUntilChanged, filter, fromEvent, map, switchMap, tap } from 'rxjs';
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
  displayedColumns!: string[];
  totalData = 20;

  @ViewChild('scrollable') scrollable!: ElementRef;
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.jsonArray$ = this.dataService.getData();
    this.jsonArray$.subscribe((response: PhotoData[]) => {
      this.dataSource = new MatTableDataSource(response.slice(0,this.totalData))
      this.displayedColumns = Object.keys(response[0])
    })
  }
  
  ngAfterViewInit() {
    fromEvent(window, 'scroll')
    .pipe(
      debounceTime(200),
      distinctUntilChanged(),
    )
    .subscribe(() => {
      this.totalData += 5;
      this.filterAndPaginate();
    });
  }


  filterAndPaginate() {
    fromEvent(window, 'scroll')
    .pipe(
      filter(() => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollPosition = windowHeight + scrollTop;
        return scrollPosition >= documentHeight;
      }),
      switchMap(() => this.jsonArray$)
    )
    .subscribe((response) => {
      this.dataSource = new MatTableDataSource(response.slice(0,this.totalData))
    });
  }
  
  applyFilter(event?: Event): void {
    const filter = (event?.target as HTMLInputElement).value.trim();
    if(filter) {
      this.jsonArray$.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        map((obj: PhotoData[]) => 
            obj.filter(object => object.id.toString().trim() === filter || object.text.trim().includes(filter)))
      ).subscribe((response: PhotoData[]) => this.dataSource = new MatTableDataSource(response.slice(0, this.totalData)))
    } else {
      this.getData()
    }
  }
}