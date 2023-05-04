import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as echarts from 'echarts/core';
import { GridComponent, GridComponentOption } from 'echarts/components';
import { LineChart, LineSeriesOption } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { EChartsOption } from 'echarts';
echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);
@Component({
  selector: 'app-chart',
  templateUrl: './chart1.component.html',
  styleUrls: ['./chart1.component.css']
})
export class Chart1Component implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    this.option && this.myChart.setOption(this.option);
  }
  chartDom: any
  myChart: any
  option: any;

  ngOnInit(): void {
    this.createChart();
    this.dataEvent.emit(
      {
        message:"Merhaba",
      }
    )
  }

  @Output() dataEvent: EventEmitter<any> = new EventEmitter();

  createChart() {
    this.chartDom = document.getElementById('chart-container')!;
    this.myChart = echarts.init(this.chartDom);
    this.option = {
      xAxis: {
        type: 'category',
        data: ['Ocak', 'Nisan', 'Temmuz', 'Ekim', 'Aralık']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [1000, 870, 111, 218, 135, 147, 260],
          type: 'line'
        }
      ]
    };
  }

  createPie() {

  }
}
