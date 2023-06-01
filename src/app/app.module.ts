import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/material.module';
import { CTableComponent } from 'src/components/c-table.component';
import { DataService } from 'src/services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    CTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
