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

  chartOptions: any;

  constructor(private serverService: ServerService) {}

  getServers() {
    let value =
      localStorage.getItem('user') || localStorage.getItem('guest_user');
    let user_id;
    if (value != null) {
      user_id = JSON.parse(value) as OTP;
    }

    return this.serverService.getServerById(user_id?.userId);
  }

  initializeChart() {
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
          dataPoints: [],
        },
        {
          type: 'line',
          showInLegend: true,
          name: 'Down Servers',
          dataPoints: [],
        },
      ],
    };

    return { chartOptions };
  }

  updateChartData() {
    const currentTime = Math.floor(Date.now() / 1000); // Convert milliseconds to seconds

    const upServersCount = this.servers.filter(
      (server) => server.status == 'SERVER UP'
    ).length;

    const downServersCount = this.servers.filter(
      (server) => server.status == 'SERVER DOWN'
    ).length;
    console.log(upServersCount);

    this.chartOptions.data[0].dataPoints.push({
      x: currentTime,
      y: upServersCount,
    });
    this.chartOptions.data[1].dataPoints.push({
      x: currentTime,
      y: downServersCount,
    });

    // Optional: Remove old data points to prevent the array from growing indefinitely
    if (this.chartOptions.data[0].dataPoints.length > 20) {
      this.chartOptions.data[0].dataPoints.shift();
      this.chartOptions.data[1].dataPoints.shift();
    }
  }

  ngOnInit() {
    this.getServers().subscribe((data) => {
      this.servers = data;
      this.chartOptions = this.initializeChart().chartOptions;

      // Start a timer to update the chart every second
      setInterval(() => {
        this.updateChartData();
        this.initializeChart();
        // Render the chart here if needed
      }, 1000); 

      if (window.innerHeight < 900) {
        this.chartOptions.width = 750;
      } else {
        this.chartOptions.width = 950;
      }
    });
  }
}
