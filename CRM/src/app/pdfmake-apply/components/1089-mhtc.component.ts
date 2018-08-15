import { Component, OnInit } from '@angular/core';
import { PdfmakeService } from 'pdfmake-apply/pdfmake.service';

@Component({
  selector: 'thc-1089-mhtc-template',
  template: `<button (click)="pdfmake.download()">MHTC PDF</button>`,
  styleUrls: []
})
export class MHTC1089Component implements OnInit {

  _content: any;
  _styles: any;
  object: { text: string }
  constructor(private pdfmake: PdfmakeService) { }

  ngOnInit() {
    this._styles = {
      header: {
        fontSize: 18,
        bold: true
      },
      bigger: {
        fontSize: 15,
        italics: true,
      },
      textBoldCenter: {
        bold: true,
        alignment: 'center'
      },
      textBoldUnderline: {
        bold: true,
        decoration: 'underline',
        alignment: 'center'
      }
    }
    this._content = [
      {
        columns: [
          { alignment: 'center', text: 'TẬP ĐOÀN VIỄN THÔNG QUÂN ĐỘI' },
          { style: 'textBoldCenter', text: 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM' }
        ]
      },
      {
        columns: [
          { style: 'textBoldUnderline', text: 'TỔNG CÔNG TY CP ĐẦU TƯ QUỐC TẾVIETTEL' },
          { style: 'textBoldUnderline', text: 'Độc lập-Tựdo-Hạnh phúc\n\n' }
        ]
      },
      {
        columns: [
          { text: '' },
          { alignment: 'center', text: 'Ngày 04 tháng 06 năm 2017' }
        ]
      },
      {
        columns: [
          { alignment: 'center', text: 'Số: /TTr-VTG-TCNS' },
          { text: '' }
        ]
      },
      {
        columns: [
          { style: 'textBoldCenter', text: 'PHÊ DUYỆT' },
          { text: '' }
        ]
      },
      {
        columns: [
          { alignment: 'center', text: 'Ngày tháng06năm 2017' },
          { text: '' }
        ]
      },
      {
        columns: [
          { style: 'textBoldCenter', text: 'TỔNG GIÁM ĐỐC\n\n\n' },
          { text: '' }
        ]
      },
      { style: 'textBoldCenter', text: 'TỜ TRÌNH' },
      { style: 'textBoldUnderline', text: 'Về việc kiện toàn mô hình tổ chức Tổng Công ty VTG.\n\n' },
      {
        columns: [
          { alignment: 'right', text: 'Kính gửi: ' },
          { alignment: 'left', text: ' Tổng Giám đốc.\n' }
        ]
      },
      { bold: true, text: 'I. Vấn đề trình:' },
      { text: '1. Thành lập Trung tâm Quy hoạch Thiết kế, Tổng Công ty VTG.' },
      { text: '2. Kiện toàn mô hình tổ chức, chức năng nhiệm vụ của một số đơn vị thuộc Tổng Công ty VTG phù hợp với thực tế.' },
    ]


    this.pdfmake.addContent(this._content);
    this.pdfmake.configureStyles(this._styles);
  }
}
