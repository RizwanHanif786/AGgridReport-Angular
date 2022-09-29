import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {
  CellClickedEvent,
  ColDef,
  ColumnApi,
  GridApi,
  GridReadyEvent,
} from 'ag-grid-community';
import { Observable } from 'rxjs';
import { CheckboxRendererComponent } from '../../components/checkbox-renderer/checkbox-renderer.component';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  public rowData: any[] = [];
  private gridApi!: GridApi;
  public columnDefs: ColDef[] = [];
  public defaultColDef: ColDef = {
    sortable: true,
    flex: 1,
    editable: true,
    filter: true,
  };
  private gridColumnApi!: ColumnApi;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.setColumnsDefinition();
    this.getRowsData();
  }

  setColumnsDefinition() {
    let settings = JSON.parse(localStorage.getItem('columnSettings') as any);
    if (settings?.length ) {
      this.columnDefs = settings;
      this.columnDefs = this.columnDefs.map((item) => {
        if(item.field == 'isSelected') {
           item = {...item, ...{cellRendererFramework: CheckboxRendererComponent}}
        }
        return item
      })
    } else {
      this.columnDefs = [
        {
          headerName: 'Select',
          field: 'isSelected',
          width: 150,
          cellRendererFramework: CheckboxRendererComponent
        },
        {
          headerName: 'SR.No',
          field: 'id',
          sortable: true,
          unSortIcon: true,
          filter: 'agNumberColumnFilter'
        },
        {
          headerName: 'Name',
          field: 'name',
          getQuickFilterText: (params) => {
            return params.value.name;
          },
          sortable: true,
          unSortIcon: true,
          filter: 'agTextColumnFilter'
        },

        {
          headerName: 'Age',
          field: 'age',
          sortable: true,
          unSortIcon: true,
          filter: 'agNumberColumnFilter'
        },
        {
          headerName: 'Country',
          field: 'country',
          sortable: true,
          unSortIcon: true,
          filter: 'agTextColumnFilter'
        },
      ];
    }
  }

  getRowsData() {
    this.rowData = [
      {
        id: 1,
        name: 'Michael Phelps',
        age: 23,
        country: 'United States',
        city: 'New York',
        address: 'near New York City Hall',
        isSelected: false,
      },
      {
        id: 2,
        name: 'Michael Phelps',
        age: 19,
        country: 'United States',
        city: 'California',
        address: 'near California City Hall',
        isSelected: false,
      },
      {
        id: 3,
        name: 'Michael Phelps',
        age: 27,
        country: 'United States',
        city: 'California',
        address: 'near California Subway',
        isSelected: false,
      },
      {
        id: 4,
        name: 'Natalie Coughlin',
        age: 25,
        country: 'United States',
        city: 'Texas',
        address: 'near Texas Mall',
        isSelected: false,
      },
      {
        id: 5,
        name: 'eAleksy Nemov',
        age: 24,
        country: 'Russia',
        city: 'Moscow',
        address: 'street J  near Moscow Mall',
        isSelected: false,
      },
      {
        id: 6,
        name:'Alicia Coutts',
        age: 24,
        country: 'Australia',
        city: 'Melbourne',
        address: 'located at center of melbourne city.',
        isSelected: false,
      },
      {
        id: 7,
        name:'Alicia Coutts',
        age: 24,
        country: 'Australia',
        city: 'Melbourne',
        address: 'located at center of melbourne city.',
        isSelected: false,
      },
      {
        id: 8,
        name:'Alicia Coutts',
        age: 24,
        country: 'Australia',
        city: 'Melbourne',
        address: 'located at center of melbourne city.',
        isSelected: false,
      },
      {
        id: 9,
        name:'Alicia Coutts',
        age: 24,
        country: 'Australia',
        city: 'Melbourne',
        address: 'located at center of melbourne city.',
        isSelected: false,
      },
      {
        id: 10,
        name:'Alicia Coutts',
        age: 24,
        country: 'Australia',
        city: 'Melbourne',
        address: 'located at center of melbourne city.',
        isSelected: false,
      },
      {
        id: 11,
        name:'Alicia Coutts',
        age: 24,
        country: 'Australia',
        city: 'Melbourne',
        address: 'located at center of melbourne city.',
        isSelected: false,
      },
      {
        id: 12,
        name:'Alicia Coutts',
        age: 24,
        country: 'Australia',
        city: 'Melbourne',
        address: 'located at center of melbourne city.',
        isSelected: false,
      },
      {
        id: 13,
        name:'Alicia Coutts',
        age: 24,
        country: 'Australia',
        city: 'Melbourne',
        address: 'located at center of melbourne city.',
        isSelected: false,
      },
      {
        id: 14,
        name:'Alicia Coutts',
        age: 24,
        country: 'Australia',
        city: 'Melbourne',
        address: 'located at center of melbourne city.',
        isSelected: false,
      },
      {
        id: 15,
        name:'Alicia Coutts',
        age: 24,
        country: 'Australia',
        city: 'Melbourne',
        address: 'located at center of melbourne city.',
        isSelected: false,
      },
      {
        id: 16,
        name:'Alicia Coutts',
        age: 24,
        country: 'Australia',
        city: 'Melbourne',
        address: 'located at center of melbourne city.',
        isSelected: false,
      },
      {
        id: 17,
        name:'Alicia Coutts',
        age: 24,
        country: 'Australia',
        city: 'Melbourne',
        address: 'located at center of melbourne city.',
        isSelected: false,
      },
      {
        id: 18,
        name:'Alicia Coutts',
        age: 24,
        country: 'Australia',
        city: 'Melbourne',
        address: 'located at center of melbourne city.',
        isSelected: false,
      },
    ];
  }

  onFilterTextBoxChanged() {
    this.gridApi.setQuickFilter(
      (document.getElementById('filter-text-box') as HTMLInputElement).value
    );
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }

  ondisplayVisibleFields(list: any) {
    const visibleColums = list.map((item: any) => item.headerName);
    this.columnDefs = list;
    this.columnDefs = this.columnDefs.map((item) => {
      if(item.field == 'isSelected') {
         item = {...item, ...{cellRendererFramework: CheckboxRendererComponent}}
      }
      return item
    })
    console.log(this.columnDefs, ' this.columnDefs');
    console.log(visibleColums, ' visibleColums');
    console.log(this.gridColumnApi, 'api');
  }

  gridOptions = {
    onGridReady: (params: any) => {
      params.api.sizeColumnsToFit();
    }
  };
  refreshListList() {
    localStorage.removeItem('columnSettings')
    this.setColumnsDefinition()
  }
}
