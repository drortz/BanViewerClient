import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-flow-details',
  templateUrl: './flow-details.component.html',
  styleUrls: ['./flow-details.component.css']
})
export class FlowDetailsComponent implements OnInit {

  @Input() requestData = {} as RequestData;
  @Output() isLoadedEmit = new EventEmitter<boolean>();

  isloaded = false;
  flowDetails: Array<OrderFlowView>;

  formGroup: FormGroup;

  constructor(
    private httpClient: HttpClient,
    private _formBuilder: FormBuilder) {

    }

  ngOnInit() {
    this.postRetrieveOrderFlowView(this.requestData).subscribe(
      (val: Array<OrderFlowView>) => {
        this.flowDetails = val;
        console.log(val);
        this.isLoadedEmit.emit(true);
        this.isloaded = true;
      }
    );

    this.formGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });

  }

  getIconPerProduct(product: string) {
    if (product.includes('DTVM')) {
      return 'fas fa-satellite-dish mt-2';
    } else if (product.includes('UMC')) {
      return 'fas fa-tv mt-2';
    } else if (product.includes('WDM') || product.includes('WVM')) {
      return 'fas fa-globe-americas mt-2';
    } else if (product.includes('WSPMC')) {
      return 'fas fa-wifi mt-2';
    }
  }

  postRetrieveOrderFlowView(request: RequestData) {
    const url = environment.URL + '/retrieveOrderFlowView';
    return this.httpClient.post(url, request);
  }

}

export interface OrderFlowView {
  orderId: string;
  productFlowView: Array<ProductFlowView>;
}

export interface ProductFlowView {
  orderActionId: string;
  orderActionType: string;
  orderActionStatus: string;
  productName: string;
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
