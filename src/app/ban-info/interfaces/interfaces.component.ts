import { Component, OnInit, Input, Inject, EventEmitter, Output } from '@angular/core';
import { InterfacesService } from './../../services/interfaces.service';
import { LoaderSpinnerService } from 'src/app/services/loader-spinner.service';

declare var $: any;

@Component({
  selector: 'app-interfaces',
  templateUrl: './interfaces.component.html',
  styleUrls: ['./interfaces.component.css']
})
export class InterfacesComponent implements OnInit {

  interfacesToOrderAction: Array<InterfacesToOrderAction>;
  @Input() requestData = {} as RequestData;

  msInterfacesData: Array<InterfacesData>;

  modalInterface: string;
  modalInterfaceType: string;
  modalContent: string;
  searchText = '';

  isLoaded = false;
  @Output() isloadedDone = new EventEmitter<boolean>();

  constructor(
    private interfaceService: InterfacesService,
    private loader: LoaderSpinnerService
    ) { }

  ngOnInit() {
    this.retrieveInterfacesData();
  }

  retrieveInterfacesData() {
    // this.loader.isDisplayLoading(true);
    this.interfaceService.RetrieveInterfacesData(this.requestData).subscribe(
      (value: Array<InterfacesToOrderAction>) => {
        // this.interfacesToOrderAction = value;
        this.setMsInterfacesData(value);
        this.setInterfacesToOrderAction(value);
        console.log(this.interfacesToOrderAction);
        this.isLoaded = true;
        this.isloadedDone.emit(true);
        // this.loader.isDisplayLoading(false);

      }
    );
  }

  setInterfacesToOrderAction(value: Array<InterfacesToOrderAction>) {
    let interfacesWithNoMs: Array<InterfacesToOrderAction> = new Array();
    for (const currInterface of value) {
      if (currInterface.orderAction !== 'MS') {
        interfacesWithNoMs.push(currInterface);
      }
    }

    this.interfacesToOrderAction = interfacesWithNoMs;
  }

  setMsInterfacesData(value: Array<InterfacesToOrderAction>) {
    const msInterfaces = value.filter(x => x.orderAction === 'MS');
    if (msInterfaces && msInterfaces.length > 0) {
      this.msInterfacesData = msInterfaces.pop().interfacesData;
    }
  }

  showModal(interfaceName: string, interfaceType: string, content: string) {
    this.modalInterface = interfaceName;
    this.modalInterfaceType = interfaceType;
    this.modalContent = content;
    $('#interfaceModal').modal('show');
    $('#interfaceModal').scrollTop(0);
  }

  copyMessage() {

  }

  resetSearchInput() {
    this.searchText = '';
  }
}

export interface InterfacesToOrderAction {
  orderAction: string;
  orderActionType: string;
  interfacesData: Array<InterfacesData>;
}

export interface InterfacesData {
  interfaceName: string;
  stepInstanceId: string;
  xmlType: string;
  seqNo: string;
  sentAt: string;
  serverName: string;
  fileContent: string;
}

export interface RequestData {
  dbUserName: string;
  dbPassword: string;
  dbInstance: string;
  isDirectConnect: boolean;
  host: string;
  port: string;
  serviceName: string;
  banId: string;
}
