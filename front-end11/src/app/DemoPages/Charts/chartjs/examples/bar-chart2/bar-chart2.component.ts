import {Component, OnInit} from '@angular/core';
import {ChartOptions, ChartType, ChartDataSets} from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import * as moment from 'moment';
import {Label} from 'ng2-charts';
import { Orders1Service } from 'src/app/services/orders1.service';

@Component({
  selector: 'app-bar-chart2',
  templateUrl: './bar-chart2.component.html',
})
export class BarChart2Component implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {xAxes: [{}], yAxes: [{}]},
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels  = [];

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    {data: [], label: 'Par jours'},
    
  ];

  list1
  constructor( private reportsservice:Orders1Service) {
  }

  ngOnInit() {

    
 
    this.reportsservice.tempstravaille().subscribe(
 
      dataCodeof => {
       
          this.list1 = dataCodeof
          this.barChartData.forEach(element2 => {
          this.list1.forEach(element => {
            var debut
            var fin
 
            var a = moment(element.DATEFINREEL);
var b = moment(element.DATEDEBUTREEL);

console.log("dddddd",a.diff(b, 'days') )
     var xx= (element.QTE_TRAVAILLEE/element.QTE_OF)*100
       this.barChartLabels.push( element.CODEOF)

var yy:any
yy = a.diff(b, 'days');

      
       (element2.data as number[]).push(parseFloat(yy))
       console.log("eeeeeeeeee",element2)
          });

     
      
        
               });
       
      },
      err => {
          console.error(err)
     
      }
  )
  }

   
  
}
