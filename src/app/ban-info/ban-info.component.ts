
import { DataServiceService } from './../services/data-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ban-info',
  templateUrl: './ban-info.component.html',
  styleUrls: ['./ban-info.component.css']
})
export class BanInfoComponent implements OnInit {

  banId: string;
  dbUserName: string;
  dbPass: string;
  dbInstance: string;

  // requestData: {'dbUserName': string, 'dbPassword': string, 'dbInstance': string, 'banId': string} =
  // {dbUserName: '', dbPassword: '', dbInstance: '', banId: ''};

  requestData = {} as RequestData;

  constructor(
    private dataService: DataServiceService,
    private router: Router
    ) {
  }

  isFlowDetailLoading = true;
  isToDisplayOALoading = true;
  isToDisplayinterfacesLoading = true;
  isToDisplayProductConfigurationLoading = true;

  onFlowDetailsLoaded(isFlowDetailLoaded: boolean) {
    this.isFlowDetailLoading = false;
  }

  onOALoaded(isOALoaded: boolean) {
    this.isToDisplayOALoading = false;
  }

  onInterfacesLeaded(isInterfacesLoaded: boolean) {
    this.isToDisplayinterfacesLoading = false;
  }

  onProductConfigurationLeaded(isLoaded: boolean) {
    this.isToDisplayProductConfigurationLoading = false;
  }

  refreshPage(dataService: RequestData) {

    console.log('Reload request');
    this.requestData = dataService;
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/banviewer/info']);
    });
  }

  onLogViewerClick() {
    window.open('http://cltv0281.sldc.sbc.com:8080/searchLogs.html', '_blank');
  }
  ngOnInit() {
    this.dataService.banId.subscribe(value => this.requestData.banId = value);
    this.dataService.dbUserNmae.subscribe(value => this.requestData.dbUserName = value);
    this.dataService.dbPassword.subscribe(value => this.requestData.dbPassword = value);
    this.dataService.dbInstance.subscribe(value => this.requestData.dbInstance = value);

    this.dataService.dbIsDirectConnect.subscribe(value => this.requestData.isDirectConnect = value);
    this.dataService.dbHost.subscribe(value => this.requestData.host = value);
    this.dataService.dbPort.subscribe(value => this.requestData.port = value);
    this.dataService.dbServiceName.subscribe(value => this.requestData.serviceName = value);

    if (this.routedWithNoData()) {
      this.router.navigateByUrl('\banviewer\details');
    }
  }

  routedWithNoData() {
    if (!this.requestData.isDirectConnect) {
      return this.requestData.banId === undefined || this.requestData.banId === '' ||
      this.requestData.dbUserName === undefined || this.requestData.dbUserName === '' ||
      this.requestData.dbPassword === undefined || this.requestData.dbPassword === '' ||
      this.requestData.dbInstance === undefined || this.requestData.dbInstance === '';
    }

    return this.requestData.banId === undefined || this.requestData.banId === '' ||
      this.requestData.dbUserName === undefined || this.requestData.dbUserName === '' ||
      this.requestData.dbPassword === undefined || this.requestData.dbPassword === '' ||
      this.requestData.host === undefined || this.requestData.host === '' ||
      this.requestData.port === undefined || this.requestData.port === '' ||
      this.requestData.serviceName === undefined || this.requestData.serviceName === '';
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
