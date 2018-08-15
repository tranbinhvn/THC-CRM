import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfmakeService } from './pdfmake.service';
//import { MHTC1089Component} from 'pdfmake-apply/components/1089_mhtc.component';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    PdfmakeService
  ]
})
export class PdfmakeModule { }
