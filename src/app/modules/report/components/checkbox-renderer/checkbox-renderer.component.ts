import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-checkbox-renderer',
  templateUrl: './checkbox-renderer.component.html',
  styleUrls: ['./checkbox-renderer.component.scss']
})
export class CheckboxRendererComponent implements OnInit {
  ngOnInit(): void {
    
  }
  private params: any;
  isChecked: boolean = false;;
  isDisabled: boolean = false;
  event: boolean = false;

  agInit(params: any): void {
    this.params = params;
    this.event = params;
    if (
      params.colDef.headerName === '' &&
      this.params.data.isSelected === true
    ) {
      this.isChecked = true;
    } 
    this.isDisabled = this.changeCheckBoxState(this.event);
  }

  changeCheckBoxState(event?:any) {
    console.log('event: ', event);
    let isDisabled: boolean = false;
    if (
      event.colDef.headerName === '' &&
      this.params.data.isSelected === true 
    ) {
      isDisabled = true;
    }
    return isDisabled;
  }

  changeSelection(event:any) {
    
    this.params.data.isSelected = event.target.checked
  }
}
