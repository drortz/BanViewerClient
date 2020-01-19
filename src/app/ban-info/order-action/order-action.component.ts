import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { OrderActionServiceService } from './../../services/order-action-service.service';
import { LoaderSpinnerService } from 'src/app/services/loader-spinner.service';
import { CdkTableModule} from '@angular/cdk/table';
import {DataSource} from '@angular/cdk/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatTable } from '@angular/material';

declare var $: any;

@Component({
  selector: 'app-order-action',
  templateUrl: './order-action.component.html',
  styleUrls: ['./order-action.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class OrderActionComponent implements OnInit {
  constructor(
    private orderActionService: OrderActionServiceService,
    private loader: LoaderSpinnerService) { }

  orderActionsToDisplay: OrderAction[] = [];
  @ViewChild('orderActionTable') orderActionTable: MatTable<any>;
  @ViewChild('PricePlaneUpdateTable') pricePlanUpdateTable: MatTable<any>;
  dataSource = this.orderActionsToDisplay;
  headElementsChangedAps = ['AP ID', 'Version', 'Service Type', 'Status', 'State', 'Attributes'];
  headElementsChangedPPs = ['Billing ID', 'Item Def ID', 'Version', 'Type', 'Description'
                            , 'Actual Price', 'State', 'Status'];
  columnsToDisplay;
  expandedElement: OrderAction | null;

  modalAttributes: Array<Attribute>;
  modalTitle: string;
  searchText = '';

  xmlModalOrderAction: string;
  xmlModalContent: string;
  xmlModalTitle: string;
  isloaded = false;
  panelOpenState = false;

  orders = new Array<string>();
  ordersFlag = 1;

  exceptionDisplay: Array<ExceptionDisplay> = new Array<ExceptionDisplay>();

  @Output() isLoadedEmit = new EventEmitter<boolean>();

  /**
   * Pre-defined columns list for user table
   */
  columnNames = [{
    id: 'orderActionId',
    value: 'Order Action ID'
  },
  {
    id: 'creationDateTime',
    value: 'Creation Date'
  },
  {
    id: 'status',
    value: 'Status'
  },
  {
    id: 'actionType',
    value: 'Action'
  },
  {
    id: 'apId',
    value: 'AP ID'
  },
  {
    id: 'orderId',
    value: 'Order ID'
  },
  // {
  //   id: 'parentOrder',
  //   value: 'Parent Order'
  // },
  {
    id: 'ownerRole',
    value: 'Owner Role'
  }];

  @Input() requestData = {} as RequestData;

  ngOnInit() {
    this.columnsToDisplay = this.columnNames.map(x => x.id);
    this.loadOrderActions();
    this.orderActionTable.renderRows();
    this.pricePlanUpdateTable.renderRows();
  }

  loadOrderActions() {
    // this.loader.isDisplayLoading(true);
    this.orderActionService.RetrieveOrderActionDetails(this.requestData).subscribe(
      (value: OrderAction[]) => {
        console.log(value);
        for (const oa of value) {
          this.orderActionsToDisplay.push(oa);
        }
        this.isloaded = true;
        this.isLoadedEmit.emit(true);
        // this.loader.isDisplayLoading(false);
        this.populateExceptionsToDisplay();
      }
    );
  }

  populateExceptionsToDisplay() {
    for (let oa of this.orderActionsToDisplay) {
      for (let ass of oa.assignments) {
        if (ass.exception !== null) {
          let currentExceptionToDisplay = {} as ExceptionDisplay;
          currentExceptionToDisplay.assignment = ass;
          currentExceptionToDisplay.orderAction = oa;

          this.exceptionDisplay.push(currentExceptionToDisplay);
        }
      }
    }
  }

  isToLoad() {
    return this.isloaded;
  }

  showModal(serviceType: string, version: string, attributes: Array<Attribute>) {
    this.searchText = '';
    this.modalAttributes = attributes;
    this.modalTitle = serviceType + ' Attributes For Version ' + version;

    $('#exampleModal').modal('show');
    $('#exampleModal').scrollTop(0);
  }

  showXmlModal(orderAction: string, contnet: string, type: string) {
    this.xmlModalOrderAction = orderAction;
    this.xmlModalContent = contnet;
    this.xmlModalTitle = type + ' - Order Action ' + orderAction;

    $('#xmlModal').modal('show');
    $('#xmlModal').scrollTop(0);
  }

  changeAssignmentsBackground(assignments: Array<Assignment>): any {
    for (const ass of assignments) {
      if (ass.exception) {
        return {background: '#ffcccc'};
      }
    }

    return {};
  }

  getOrderActionColor(orderAction: OrderAction): any {

    // if (!this.orders.includes(orderAction.orderId)) {
    //   this.orders.push(orderAction.orderId);

    //   if(this.ordersFlag === 0) {
    //     this.ordersFlag = 1;
    //     return {background: '#b9f6ca'};
    //   } else {
    //     this.ordersFlag = 0;
    //     return {background: '#fffde7'};
    //   }
    // } else {
    //   if(this.ordersFlag === 0) {
    //     this.ordersFlag = 1;
    //     return {background: '#fffde7'};
    //   } else {
    //     this.ordersFlag = 0;
    //     return {background: '#b9f6ca'};
    //   }
    // }


    if (orderAction.status === 'CA') {
      return {background: '#f5f5f5'};
    } else if (orderAction.actionType === 'PR' && orderAction.status === 'AM') {
      return {background: '#b9f6ca'};
    } else if (orderAction.actionType === 'PR') {
      return {background: '#00e676'};
    } else if (orderAction.actionType === 'AM') {
      return {background: '#b9f6ca'};
    } else if (orderAction.actionType === 'RS') {
      return {background: '#1de9b6'};
    } else if (orderAction.actionType === 'SR') {
      return {background: '#1de9b6'};
    } else if (orderAction.actionType === 'ND') {
      return {background: '#b3e5fc'};
    } else if (orderAction.actionType === 'CH' && orderAction.status === 'AM') {
      return {background: '#fffde7'};
    } else if (orderAction.actionType === 'CH') {
      return {background: '#fff9c4'};
    } else if (orderAction.actionType === 'CE') {
      return {background: '#ffccbc'};
    } else if (orderAction.actionType === 'CM') {
      return {background: '#fbe9e7'};
    } else if (orderAction.actionType === 'SU') {
      return {background: '#fbe9e7'};
    } else if (orderAction.actionType === 'SS') {
      return {background: '#fbe9e7'};
    } else if (orderAction.actionType === 'PV' && orderAction.status === 'AM') {
      return {background: '#e8f5e9'};
    } else if (orderAction.actionType === 'PV') {
      return {background: '#c8e6c9'};
    } else if (orderAction.actionType === 'CC') {
      return {background: '#bbdefb'};
    }
    return {};
  }
}

export interface Attributes {
  attributes: Array<Attribute>;
}

export interface Attribute {
  'name': string;
  'value': string;
}

export interface OrderAction {
  'actionType': string;
  'apId': string;
  'creationDateTime': string;
  'orderActionId': string;
  'orderId': string;
  'parentOrder': string;
  'status': string;
  'crmLic': string;
  'upcReq': string;
  'icsReq': string;
  'userSkills': UserSkills;
  'dynamicAttributes': Array<Attribute>;
  'assignments': Array<Assignment>;
  'componentsChangedInOrderAction': Array<componentsChangedInOrderAction>;
  'pricePlanesChangedInOrderAction': Array<PricePlanesChangedInOrderAction>;
  'addressLocalViewList': Array<AddressLocalView>;
}

export interface Assignment {
  'stepInstanceId': string;
  'orderActionId': string;
  'state': string;
  'time': string;
  'disaplyName': string;
  'exception': string;
}

export interface componentsChangedInOrderAction {
  'apId': string;
  'version': string;
  'serviceType': string;
  'status': string;
  'state': string;
  'attributes': Array<Attributes>;
}

export interface PricePlanesChangedInOrderAction {
  'apId': string;
  'version': string;
  'billingId': string;
  'itemDefId': string;
  'type': string;
  'description': string;
  'actualPrice': string;
  'proratedAmount': string;
  'state': string;
  'status': string;
}

export interface AddressLocalView {
  'apItemId': string;
  'type': string;
  'id': string;
  'streetName': string;
  'city': string;
  'state': string;
  'zipCode': string;
  'siteId': string;
  'version': string;
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

export interface UserSkills {
  securityProfiles: Array<string>;
  skills: Array<string>;
}

export interface ExceptionDisplay {
  assignment: Assignment;
  orderAction: OrderAction;
}
