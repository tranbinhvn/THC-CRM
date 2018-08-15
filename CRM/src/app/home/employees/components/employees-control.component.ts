import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// Other
import { ContantValues } from 'sharedmodule/global-contants/value.contants';
import { ResponseModel } from 'api/response.model';
import { TranslateService } from 'ng2-translate';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
    templateUrl: './../pages/employees-control.component.html'
})
export class EmployeesComponent {
    public ChartLabels:string[] = [];
    public ChartData:number[] = [];
    public ChartType:string = 'pie';
  
    constructor(){
    }
  
    //-- Line Chart --//
    public lineChartData: Array<any> = [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Loại A' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Loại B' },
      { data: [18, 48, 77, 9, 100, 27, 40], label: 'Loại C' }
    ];
    public lineChartLabels: Array<any> = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    public lineChartOptions: any = {
      responsive: true
    };
    public lineChartColors: Array<any> = [
      { // grey
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },
      { // dark grey
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)'
      },
      { // grey
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      }
    ];

    public lineChartLegend: boolean = true;
    public lineChartType: string = 'line';
    public randomizeLineChart(): void {
      let _lineChartData: Array<any> = new Array(this.lineChartData.length);
      for (let i = 0; i < this.lineChartData.length; i++) {
        _lineChartData[i] = { data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label };
        for (let j = 0; j < this.lineChartData[i].data.length; j++) {
          _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
        }
      }
      this.lineChartData = _lineChartData;
    }
  
    // Bart Chart
    public barChartOptions: any = {
      scaleShowVerticalLines: false,
      responsive: true
    };
    public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;
  
    public barChartData: any[] = [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Loại A' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Loại B' },
      { data: [58, 68, 41, 59, 26, 20, 90], label: 'Loại C' }
    ];
  
    public randomizeBarChart(): void {
      // Only Change 3 values
      let data = [
        Math.round(Math.random() * 100),
        59,
        80,
        (Math.random() * 100),
        56,
        (Math.random() * 100),
        40];
      let clone = JSON.parse(JSON.stringify(this.barChartData));
      clone[0].data = data;
      this.barChartData = clone;
      /**
       * (My guess), for Angular to recognize the change in the dataset
       * it has to change the dataset variable directly,
       * so one way around it, is to clone the data, change it and then
       * assign it;
       */
    }
  
    // Doughnut Chart
    public doughnutChartLabels: string[] = ['Bán hàng bằng lượt tải', 'Bán hàng tại chỗ', 'Đặt hàng qua mail'];
    public doughnutChartData: number[] = [350, 450, 100];
    public doughnutColors:any[] = [{ backgroundColor: ['#1ABB9C', '#E74C3C', '#9CC2CB'] }]
    public doughnutChartType: string = 'doughnut';
  
    // Radar
    public radarChartLabels: string[] = ['Ăn', 'Uống', 'Ngủ', 'Thiết kế', 'Coding', 'Đạp xe', 'Chạy'];
    public radarChartData: any = [
      { data: [65, 59, 90, 81, 56, 55, 40], label: 'Loại A' },
      { data: [28, 48, 40, 19, 96, 27, 100], label: 'Loại B' }
    ];
    public radarChartType: string = 'radar';
  
    // Pie
    public pieChartLabels: string[] = ['Bán hàng bằng lượt tải', 'Bán hàng tại chỗ', 'Bán hàng qua mail'];
    public pieChartData: number[] = [300, 500, 100];
    public pieChartType: string = 'pie';
  
    // PolarArea
    public polarAreaChartLabels: string[] = ['Bán hàng bằng lượt tải', 'Bán hàng tại chỗ', 'Bán hàng qua mail', 'Bán hàng qua điện thoại', 'Doanh số bán hàng công ty'];
    public polarAreaChartData: number[] = [300, 500, 100, 40, 120];
    public polarAreaLegend: boolean = true;
    public polarAreaChartType: string = 'polarArea';
  
    // events
    public chartClicked(e: any): void {
      console.log(e);
    }
  
    public chartHovered(e: any): void {
      console.log(e);
    }
    
}
