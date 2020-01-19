import { ProductConfigurationService } from './../../services/product-configuration.service';
import { Component, OnInit, AfterViewChecked, Input, Output, EventEmitter } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-product-configuration',
  templateUrl: './product-configuration.component.html',
  styleUrls: ['./product-configuration.component.css']
})
export class ProductConfigurationComponent implements OnInit, AfterViewChecked {

  @Input() requestData = {} as RequestData;
  @Output() isLoadedEmit = new EventEmitter<boolean>();

  constructor(private productService: ProductConfigurationService) { }

  componentAttrVersionsView = {} as Array<MainComponentsVersionsView>;
  isLoaded = false;

  ngOnInit() {
    this.productService.retrieveProductConfiguration(this.requestData).subscribe(
      (val: Array<MainComponentsVersionsView>) => {
        this.componentAttrVersionsView = val;
        console.log(this.componentAttrVersionsView);
        this.isLoadedEmit.emit(true);
        this.isLoaded = true;
      }
    );
  }

  ngAfterViewChecked() {

  }

  countChangedAttr(comp: ComponentsVersionsView) {
    let count = 0;
    let countedAttr = [];

    for(let single of comp.singleVersion) {
      for(let attr of single.attributes) {
        if(attr.wasChanged && !countedAttr.includes(attr.name)) {
          count++;
          countedAttr.push(attr.name);
        }
      }
    }

    return count === 0 ? undefined : count;
  }



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

export interface MainComponentsVersionsView {
  serviceType: string;
  apId: string;
  componentVersionView: Array<ComponentsVersionsView>;
}

export interface ComponentsVersionsView {
  serviceType: string;
  apId: string;
  singleVersion: Array<ComponentSingleVersionView>;
}

export interface ComponentSingleVersionView {
  serviceType: string;
  apId: string;
  version: string;
  status: string;
  state: string;
  attributes: Array<AttributeView>;
}

export interface AttributeView {
  name: string;
  value: string;
  wasChanged: boolean;
}

