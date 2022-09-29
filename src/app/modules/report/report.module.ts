import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './pages/reports/reports.component';
import { CheckboxRendererComponent } from './components/checkbox-renderer/checkbox-renderer.component';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ReportFiltersComponent } from './components/report-filters/report-filters.component';
import { ViewReportListSettingsPopupComponent } from './modals/view-report-list-settings-popup/view-report-list-settings-popup.component';
import {DialogModule,} from 'primeng/dialog';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { AgChartsAngularModule } from 'ag-charts-angular';
import { ViewReportChartComponent } from './modals/view-report-chart/view-report-chart.component';
import {MenubarModule} from 'primeng/menubar';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import { HighchartsChartComponent } from 'highcharts-angular';
import { HighchartsChartModule } from 'highcharts-angular';
@NgModule({
  declarations: [
    ReportsComponent,
    CheckboxRendererComponent,
    ReportFiltersComponent,
    ViewReportListSettingsPopupComponent,
    ViewReportChartComponent,    
  ],
  imports: [
    CommonModule,
    AgGridModule,
    FormsModule,
    CheckboxModule,  
    DialogModule,
    DragDropModule,
    AgChartsAngularModule,
    InputTextModule,
    MenubarModule,   
    ButtonModule,
    DropdownModule,
    HighchartsChartModule
  ],
  
})
export class ReportModule { }
