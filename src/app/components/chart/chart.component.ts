import { Component } from '@angular/core';
import { Server } from 'src/app/Types/Servers';
import { OTP } from 'src/app/Types/User';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent {
  chartString: any;
  chart: any;
  servers: Server[] = [];

  constructor(private serverService: ServerService) {}

  async getServers() {
    let value =
      localStorage.getItem('user') || localStorage.getItem('guest_user');
    let user_id;
    if (value != null) {
      user_id = JSON.parse(value) as OTP;
    }

    await this.serverService
      .getServerById(user_id?.userId)
      .subscribe((data) => {
        this.servers = data;
        this.initializeChart();
      });
  }

  ngOnInit() {
    this.getServers();
    this.initializeChart();
    let x = this.initializeChart();
    this.chartString = x.chartOptions;
    if (window.innerHeight < 900) {
      x.chartOptions.width = 750;
    } else {
      x.chartOptions.width = 950;
    }
  }

  initializeChart = () => {
    if (this.servers.length != 0) {
      console.log(this.servers);
    }

    let chartOptions = {
      animationEnabled: true,
      theme: 'light2',
      height: 0,
      width: 0,
      exportFileName: 'Network Perfomance.pdf', //Give any name accordingly
      exportEnabled: true,
      title: {
        text: 'Up vs Down Servers',
      },
      axisX: {
        title: 'Time',
        suffix: ' s',
      },
      axisY: {
        title: 'Number of Servers',
      },
      toolTip: {
        shared: true,
      },
      legend: {
        cursor: 'pointer',
        itemclick: function (e: any) {
          if (
            typeof e.dataSeries.visible === 'undefined' ||
            e.dataSeries.visible
          ) {
            e.dataSeries.visible = false;
          } else {
            e.dataSeries.visible = true;
          }
          e.chart.render();
        },
      },
      data: [
        {
          type: 'line',
          showInLegend: true,
          name: 'Up Servers',
          xValueFormatString: '#### sec',
          dataPoints: [{ x: 0, y: 0 }],
        },
        {
          type: 'line',
          showInLegend: true,
          name: 'Down Servers',
          dataPoints: [{ x: new Date(2021, 8, 1), y: 60 }],
        },
      ],
    };
    return { chartOptions };
  };
}
