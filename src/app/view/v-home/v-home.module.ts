import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../../../material.module';;
import { HttpClientModule } from '@angular/common/http';
import { VHomeComponent } from './v-home.component';
import { CTableModule } from 'src/app/components/c-table/c-table.module';

@NgModule({
  declarations: [
    VHomeComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    CTableModule
  ],
  providers: [],
  exports: [VHomeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class VHomeModule { }
