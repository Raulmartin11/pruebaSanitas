import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject, debounceTime, distinctUntilChanged, filter, fromEvent, map, switchMap, takeUntil, tap } from 'rxjs';
import { PhotoData } from '../../models/photo.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'c-table',
  templateUrl: './c-table.component.html',
  styleUrls: ['./c-table.component.scss'],
})
export class CTableComponent implements OnInit, OnDestroy {
  jsonArray$!: Observable<PhotoData[]>;
  dataSource!: MatTableDataSource<PhotoData>;
  displayedColumns!: string[];
  totalData = 20;
  destroy$ = new Subject<void>();
  filter: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.jsonArray$ = this.dataService.getData();
    this.jsonArray$.pipe(takeUntil(this.destroy$),).subscribe((response: PhotoData[]) => {
      this.dataSource = new MatTableDataSource(response.slice(0,this.totalData))
      this.displayedColumns = Object.keys(response[0])
    })
  }
  
  ngAfterViewInit() {
    this.filterAndPaginate();
  }


  filterAndPaginate(): void {
    fromEvent(window, 'scroll')
    .pipe(
      takeUntil(this.destroy$),
      debounceTime(200),
      distinctUntilChanged(),
      filter(() => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollPosition = windowHeight + scrollTop;
        return scrollPosition >= documentHeight;
      }),
      tap(() => this.totalData += 10),
      switchMap(() => this.jsonArray$)
    )
    .subscribe((response) => {
      this.filter ? this.filterObservable() : this.dataSource = new MatTableDataSource(response.slice(0, this.totalData));
    });
  }
  
  applyFilter(event?: Event): void {
    this.filter = (event?.target as HTMLInputElement).value.trim();
    this.filter ? this.filterObservable() : this.getData();
  }

  private filterObservable() {
    this.jsonArray$.pipe(
      takeUntil(this.destroy$),
      debounceTime(300),
      distinctUntilChanged(),
      map((obj: PhotoData[]) => 
          obj.filter(object => object.id.toString().trim() === this.filter || object.text.trim().includes(this.filter)))
    ).subscribe((response: PhotoData[]) => this.dataSource = new MatTableDataSource(response.slice(0, this.totalData)))
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}