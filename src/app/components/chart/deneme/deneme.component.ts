import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/models/order/order';
import { OrderService } from 'src/app/services/order/order.service';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-deneme',
  templateUrl: './deneme.component.html',
  styleUrls: ['./deneme.component.css']
})
export class DenemeComponent implements OnInit {
  profitByMonths: number[] = [0, 0, 0, 0];
  orders: Order[];
  noShow: boolean = false;
  linechart: any;
  constructor(private orderService: OrderService, private toastrService: ToastrService,private restaurantService:RestaurantService) { }
  ngOnInit(): void {
    this.getAllOrders;
    this.createLineChart();
  }

  getAllOrders(successCallBack?: () => void) {
    this.orderService.getAllOrders().subscribe(response => {
      response.success ? this.orders = response.data : this.toastrService.error("Bir hata meydana geldi.", "HATA")
      if (successCallBack) {
        successCallBack();
      }
    })
  }

  getRestaurants() {
    
  }

  splitProfitByMonths(successCallBack?: () => void) {
    this.getAllOrders(() => {
      for (let i = 0; i < this.orders.length; i++) {
        const ay = this.orders[i].orderDate.split('.');
        let ayNumber = parseInt(ay[1])
        for (let j = 0; j < this.orders[i].menus.length; j++) {
          let price = (((this.orders[i].menus[j].orderPrice) * (this.orders[i].menus[j].quantity)) * 10) / 100
          if (0 < ayNumber && ayNumber <= 3) {
            this.profitByMonths[0] += price;
          }
          else if (4 <= ayNumber && ayNumber <= 6) {
            this.profitByMonths[1] += price;
          }
          else if (7 <= ayNumber && ayNumber <= 9) {
            this.profitByMonths[2] += price;
          }
          else {
            this.profitByMonths[3] += price;
          }
        }
      }
      if (successCallBack) {
        successCallBack();
      }
    })
  }

  createLineChart() {
    this.splitProfitByMonths(() => {
      this.linechart = new Chart({
        chart: {
          type: 'line'
        },
        yAxis: {
          title: {
            text: "Kazanılan Miktar" ,style:{fontSize:"20"}
          }
        },
        accessibility: {
          enabled: false
        },
        title: {
          text: 'Gelir Grafiği'
        },
        credits: {
          enabled: false
        },
        xAxis: {
          title: {
            text: "Aylar", style: { fontSize: "20" }
          },
          categories: ["Ocak-Mart", "Nisan-Haziran", "Temmuz-Eylül", "Ekim-Aralık"]
        },
        series: [{
          name: 'Line 1',
          data: [this.profitByMonths[0], this.profitByMonths[1], this.profitByMonths[2], this.profitByMonths[3]],
          type: undefined
        }]
      });
    });

  }
  changeVisibility() {
    this.noShow = !this.noShow
  }

  giveClass() {
    if (this.noShow == true) {
      return 'resizable'
    }
    else {
      return ''
    }
  }


  piechart = new Chart
    (
      {
        chart: {
          plotBorderWidth: null,
          plotShadow: false
        },
        accessibility: {
          enabled: false
        },
        title: {
          text: 'Browser market shares at a specific website, 2014'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            shadow: false,
            center: ['50%', '50%'],
            size: '45%',
            innerSize: '20%'
          }
        },
        series: [{
          type: 'pie',
          name: 'Browser share',
          data: [
            ['Firefox', 45.0],
            ['IE', 26.8],
            {
              name: 'Chrome',
              y: 12.8,
              sliced: true,
              selected: true
            },
            ['Safari', 8.5],
            ['Opera', 6.2],
            ['Others', 0.7]
          ]
        }
        ]
      }
    )

}
