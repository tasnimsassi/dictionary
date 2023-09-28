import {Component, OnInit} from '@angular/core';
import {ChartOptions, ChartType, ChartDataSets} from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { float } from 'html2canvas/dist/types/css/property-descriptors/float';
import {Label} from 'ng2-charts';
import { Orders1Service } from 'src/app/services/orders1.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
})
export class BarChartComponent implements OnInit {
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
  // public barChartType: ChartType = 'line';
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
//wini api mte3 hedi 3AMltha fi servie .
  public barChartData: ChartDataSets[] = [
    {data: [], label: '%',backgroundColor:"blue",borderColor:"blue"},
  
    
    
  ];

  list1
  constructor( private reportsservice:Orders1Service) {
  }

  ngOnInit() {

     //ekteblei opration lena (QTE_TRAVAILLEE/QTE_OF)*100
 
    this.reportsservice.statecommande().subscribe(
 
      dataCodeof => {
       
          this.list1 = dataCodeof
          this.barChartData.forEach(element2 => {
          this.list1.forEach(element => {


            this.barChartLabels.push( element.CODEOF)


     var xx=    ((element.QTE_TRAVAILLEE/element.QTE_OF)*100).toFixed(2);
    
    
  //  element2.data.push(parseFloat(xx))
  //       //  element2.data.push())
  (element2.data as number[]).push(parseFloat(xx))
          });

   
        
               });
       
      },
      err => {
          console.error(err)
     
      }
  )
  }

   
  // events
  // public chartClicked({event, active}: { event: MouseEvent, active: {}[] }): void {
  //   console.log(event, active);
  // }

  // public chartHovered({event, active}: { event: MouseEvent, active: {}[] }): void {
  //   console.log(event, active);
  // }

  // public randomize(): void {
  //   // Only Change 3 values
  //   const data = [
  //     Math.round(Math.random() * 100),
  //     59,
  //     80,
  //     (Math.random() * 100),
  //     56,
  //     (Math.random() * 100),
  //     40];
  //   this.barChartData[0].data = data;
  // }
}
