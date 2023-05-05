import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-deneme',
  templateUrl: './deneme.component.html',
  styleUrls: ['./deneme.component.css']
})
export class DenemeComponent {
  linechart = new Chart({
    chart: {
      type: 'line'
    },

    title: {
      text: 'Gelir Grafiği'
    },
    credits: {
      enabled: false
    },
    xAxis:{
      categories:["Ocak","Nisan","Temmuz","Ekim","Aralık"]
   },
    series: [{
      name: 'Line 1',
      data: [4, 2,3,4,5],
      type: undefined
    }
    ]
  });

  piechart = new Chart(
    {
      chart : {
        plotBorderWidth: null,
        plotShadow: false
     },
     title : {
        text: 'Browser market shares at a specific website, 2014'   
     },
     tooltip : {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
     },
     plotOptions : {
        pie: {
           shadow: false,
           center: ['50%', '50%'],
           size:'45%',
           innerSize: '20%'            
        }
     },
     series : [{
        type: 'pie',
        name: 'Browser share',
        data: [
           ['Firefox',   45.0],
           ['IE',       26.8],
           {
              name: 'Chrome',
              y: 12.8,
              sliced: true,
              selected: true
           },
           ['Safari',    8.5],
           ['Opera',     6.2],
           ['Others',      0.7]
        ]
     }]
    }
  )

  add() {
    this.linechart.addPoint(Math.floor(Math.random() * 10));
    this.piechart.addPoint(Math.floor(Math.random() * 10));

  }
}
