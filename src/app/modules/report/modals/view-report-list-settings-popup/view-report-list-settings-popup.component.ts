import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CheckboxRendererComponent } from '../../components/checkbox-renderer/checkbox-renderer.component';

@Component({
  selector: 'app-view-report-list-settings-popup',
  templateUrl: './view-report-list-settings-popup.component.html',
  styleUrls: ['./view-report-list-settings-popup.component.scss'],
})
export class ViewReportListSettingsPopupComponent implements OnInit {
  public availableFields: any[] = [];
  public visibleFields: any[] = [];
  public columnTemplates: any[] = [];
  public count:number = 0;
  public templateName: string = '';

  constructor(
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.getColumnTemplates()
    this.availableFields = [
      {
        headerName: 'Select',
        field: 'isSelected',
        width: 150,
        cellRendererFramework: CheckboxRendererComponent,
      },
      {
        headerName: 'SR.No',
        field: 'id',
        sortable: true,
        unSortIcon: true,
        filter: 'agNumberColumnFilter',
      },
      {
        headerName: 'Address',
        field: 'address',
        sortable: true,
        unSortIcon: true,
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'City',
        field: 'city',
        sortable: true,
        unSortIcon: true,
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Country',
        field: 'country',
        sortable: true,
        unSortIcon: true,
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Age',
        field: 'age',
        sortable: true,
        unSortIcon: true,
        filter: 'agNumberColumnFilter',
      },
      {
        headerName: 'Name',
        field: 'name',
        sortable: true,
        unSortIcon: true,
        filter: 'agTextColumnFilter',
      },
    ];
    let settings = JSON.parse(localStorage.getItem('columnSettings') as any);
    if (settings?.length) {
      this.visibleFields = settings;
      this.visibleFields.forEach((item) => [
        (this.availableFields = this.availableFields.filter(
          (x) => item.field !== x.field
        )),
      ]);
    }
  }
  getColumnTemplates() {
    let savedCOlumnTemplates = JSON.parse(localStorage.getItem('ColumnTemplates') as any) || [];
    if(savedCOlumnTemplates) {
      this.columnTemplates = savedCOlumnTemplates;
    }
    
  }

  drop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.visibleFields = event.container.data;
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  /**
   * closes confimation model && return true
   */
  Save(colTemplates?: any) {
    if (!this.visibleFields?.length) {
      this.visibleFields = this.availableFields;
    }
    localStorage.setItem('columnSettings', JSON.stringify(this.visibleFields));
    this.dialogRef?.close({visibleField: this.visibleFields, colTemplates});
  }

  /**
   * closes confimation model && return false
   */
  decline() {
    this.dialogRef?.close(false);
  }

  SaveTemplate() {
    if(this.templateName) {
      const template = {
        templateName: this.templateName,
        columnTemplates: this.visibleFields
      }
      this.columnTemplates.push(template)
      localStorage.setItem('ColumnTemplates', JSON.stringify( this.columnTemplates));
      this.Save(this.columnTemplates);
    }else{
      alert('Please enter Template Name')
    }
  

  }
}
