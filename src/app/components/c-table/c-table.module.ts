import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../../../material.module';
import { CTableComponent } from './c-table.component';
import { DataService } from '../../services/data.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    CTableComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [DataService],
  exports: [CTableComponent]
})
export class CTableModule { }
