import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import * as agCharts from 'ag-charts-community';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-view-report-chart',
  templateUrl: './view-report-chart.component.html',
  styleUrls: ['./view-report-chart.component.scss']
})
export class ViewReportChartComponent implements OnInit {
  data: any;
  options:any
  HighchartsSpark = Highcharts;
  rowData: any;

  getData() {
    return   [
      {
          Country: 'Russia',
          name: 'eAleksy Nemov',
          Q2: 560,
          Q3: 600,
          Q4: 700,
      },
      {
        Country: 'Australia',
        name:'Alicia Coutts',
          Q2: 380,
          Q3: 450,
          Q4: 520,
      },
      {
        Country: 'United States',
        name: 'Natalie Coughlin',
          Q2: 170,
          Q3: 190,
          Q4: 200,
      },
      {
        Country: 'Switzerland',
        name: 'Samantha Wiliams',
          Q2: 170,
          Q3: 190,
          Q4: 200,
      },
  ];
    
  }


  ngOnInit(): void {
    this.options = {
      chart: {
        type: 'area'
    },
    title: {
        text: 'View Report Chart '
    },
    subtitle: {
        text: 'Report Chart '
    },
    accessibility: {
        point: {
            valueDescriptionFormat: '{index}. {point.category}, {point.y:,.0f} millions, {point.percentage:.1f}%.'
        }
    },
    xAxis: {
        categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050', '2070'],
        tickmarkPlacement: 'on',
        title: {
            enabled: false
        }
    },
    yAxis: {
        labels: {
            format: '{value}%'
        },
        title: {
            enabled: false
        }
    },
    tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.0f} millions)<br/>',
        split: true
    },
    plotOptions: {
        area: {
            stacking: 'percent',
            lineColor: '#ffffff',
            lineWidth: 1,
            marker: {
                lineWidth: 1,
                lineColor: '#ffffff'
            }
        }
    },
    series: this.rowData
    }
  }
  constructor(public dialogRef: DynamicDialogRef, public config: DynamicDialogConfig) {
    this.rowData = this.config.data.rowData.map((item: any) => {
      return {
        name: item.name,
        data: [item.id]
      }
    })
    
   
  }

   /**
   * closes confimation model && return false
   */
    decline() {
      this.dialogRef?.close(false);
    }
  

}
