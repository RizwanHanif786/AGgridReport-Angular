import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ViewReportChartComponent } from '../../modals/view-report-chart/view-report-chart.component';
import { ViewReportListSettingsPopupComponent } from '../../modals/view-report-list-settings-popup/view-report-list-settings-popup.component';

@Component({
  selector: 'app-report-filters',
  templateUrl: './report-filters.component.html',
  styleUrls: ['./report-filters.component.scss'],
  providers: [DialogService],
})
export class ReportFiltersComponent implements OnInit {
  @Output() filterTextBoxChanged = new EventEmitter();
  @Output() displayVisibleFields = new EventEmitter();
  @Output() refreshListList = new EventEmitter();
  @Input()  columnDefs: any[] = [];
  @Input()  rowData: any[] = [];

  dialogRef: DynamicDialogRef | undefined;
  items: MenuItem[] = [];
  columnTemplates: any[] = [];
  selectedTemplate: any;

  constructor(public dialogService: DialogService) {}

  ngOnInit(): void {
    this.menuItem();
    this.getColumnTemplates();
  }

  onFilterTextBoxChanged() {
    console.log('called');
    this.filterTextBoxChanged.emit();
  }
  getColumnTemplates() {
    let savedCOlumnTemplates =
      JSON.parse(localStorage.getItem('ColumnTemplates') as any) || [];
    if (savedCOlumnTemplates) {
      this.columnTemplates = savedCOlumnTemplates;
    }
  }

  showListViewSetting() {
    this.dialogRef = this.dialogService.open(
      ViewReportListSettingsPopupComponent,
      {
        header: 'Select Field To Display',
        closeOnEscape: true,
      }
    );

    this.dialogRef.onClose.subscribe((data:any) => {
      if (data) {
        this.displayVisibleFields.emit(data.visibleField);
        this.columnTemplates = data.colTemplates;
      }
    });
  }

  showReportChart() {
    this.dialogRef = this.dialogService.open(ViewReportChartComponent, {
      width: '1000px',
      height: '1000px',
      closeOnEscape: true,
      data: {
        rowData: this.rowData
      }
    });
  }

  menuItem() {
    this.items = [
      {
        label: 'chart',
        icon: 'pi pi-fw pi-chart-pie',
        command: () => this.showReportChart(),
      },
      {
        label: 'Settings',
        icon: 'pi pi-fw pi-cog',
        command: () => this.showListViewSetting(),
      },
      {
        label: 'refresh List',
        icon: 'pi pi-fw pi-refresh',
        command: () => this.refreshList(),
      },
    ];
  }

  refreshList() {
    this.refreshListList.emit();
  }
  onViewChange(event: any) {
    console.log('event: ', event);
    this.displayVisibleFields.emit(this.selectedTemplate);
  }
}
