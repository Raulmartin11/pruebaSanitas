import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { PhotoData } from 'src/models/photo.model';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'c-table',
  templateUrl: './c-table.component.html',
  styleUrls: ['./c-table.component.scss'],
})
export class CTableComponent implements OnInit {
  jsonArray: PhotoData[] = [];
  displayedColumns: string[] = ['id', 'photo', 'texto'];
  constructor(private dataService: DataService) {}
  ngOnInit() {
    this.dataService.getData()
    console.log(this.jsonArray);
    
  }

  applyFilter(event: Event) {
    console.log(event);
    console.log(this.jsonArray);

    // const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}