import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../material.module';
import { DataService } from '../app/services/data.service';
import { VHomeModule } from '../app/view/v-home/v-home.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CTableModule } from './components/c-table/c-table.module';

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    CTableModule,
    VHomeModule,
    BrowserAnimationsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
