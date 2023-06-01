import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../../../material.module';
import { DataService } from '../../services/data.service';
import { CToolbarComponent } from './c-toolbar.component';

@NgModule({
  declarations: [
    CToolbarComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
  ],
  providers: [],
  exports: [CToolbarComponent]
})
export class CToolbarModule { }
