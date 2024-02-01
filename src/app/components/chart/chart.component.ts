import { Component } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent {
  chartString: any;
  chart: any;
  initializeChart = () => {
    let chartOptions = {
      animationEnabled: true,
      theme: 'light2',
      height: 250,
      width: 800,
      exportFileName: "Network Perfomance.pdf",  //Give any name accordingly
      exportEnabled: true,
      title: {
        text: 'Up vs Down Servers',
      },
      axisX: {
        valueFormatString: 'D MMM',
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
          xValueFormatString: 'MMM DD, YYYY',
          dataPoints: [
            { x: new Date(2021, 8, 1), y: 63 },
            { x: new Date(2021, 8, 2), y: 69 },
            { x: new Date(2021, 8, 3), y: 65 },
            { x: new Date(2021, 8, 4), y: 70 },
            { x: new Date(2021, 8, 5), y: 71 },
            { x: new Date(2021, 8, 6), y: 65 },
            { x: new Date(2021, 8, 7), y: 73 },
            { x: new Date(2021, 8, 8), y: 86 },
            { x: new Date(2021, 8, 9), y: 74 },
            { x: new Date(2021, 8, 10), y: 75 },
            { x: new Date(2021, 8, 11), y: 76 },
            { x: new Date(2021, 8, 12), y: 84 },
            { x: new Date(2021, 8, 13), y: 87 },
            { x: new Date(2021, 8, 14), y: 76 },
            { x: new Date(2021, 8, 15), y: 79 },
          ],
        },
        {
          type: 'line',
          showInLegend: true,
          name: 'Down Servers',
          dataPoints: [
            { x: new Date(2021, 8, 1), y: 60 },
            { x: new Date(2021, 8, 2), y: 57 },
            { x: new Date(2021, 8, 3), y: 51 },
            { x: new Date(2021, 8, 4), y: 56 },
            { x: new Date(2021, 8, 5), y: 54 },
            { x: new Date(2021, 8, 6), y: 55 },
            { x: new Date(2021, 8, 7), y: 54 },
            { x: new Date(2021, 8, 8), y: 69 },
            { x: new Date(2021, 8, 9), y: 65 },
            { x: new Date(2021, 8, 10), y: 66 },
            { x: new Date(2021, 8, 11), y: 63 },
            { x: new Date(2021, 8, 12), y: 67 },
            { x: new Date(2021, 8, 13), y: 66 },
            { x: new Date(2021, 8, 14), y: 56 },
            { x: new Date(2021, 8, 15), y: 64 },
          ],
        },
      ],
    };
    return { chartOptions };
  }


  ngOnInit() {

    this.initializeChart()
    let x = this.initializeChart()
    this.chartString = x.chartOptions;
    if (window.innerHeight < 900) {
      x.chartOptions.width = 750;
    }
    else {
      x.chartOptions.width = 950;
    }

  }
}
