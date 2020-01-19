import { DataServiceService } from './../../services/data-service.service';
import { LoaderSpinnerService } from './../../services/loader-spinner.service';
import { CheckConnectionServiceService } from './../check-connection-service.service';
import { Component, OnInit , ViewChild} from '@angular/core';
import {MatSnackBar, MatAutocompleteSelectedEvent} from '@angular/material';
import { IsBanExistService } from './../../services/is-ban-exist.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {Router } from '@angular/router';
import {TreeNode} from 'primeng/api';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public banId = '';
  public dbUserName = '';
  public dbPass = '';
  public dbInstance = '';
  // Direct Connect:
  isDirectConnect = false;
  isDirectConnectPrivate = false;
  host: string;
  port = '1521';
  serviceName: string;

  private dbConnectionsJSONPath = '../../../assets/conf/DBConnections.json';
  private dbConnectionsICMJSONPath = '../../../assets/conf/DBConnections_ICM.json';
  public dbConnections: {'DBConnections': {'ENV': string, 'username': string, 'password': string, 'TNS': string}[]};
  public dbConnectionsICM: {'DBConnections':
  {'ENV': string, 'username': string, 'password': string, 'host': string, 'serviceName': string}[]};
  public privateSavedDBs: PrivateConnection[] = [];
  public connectionsToDisplay: string[] = [];
  public connectionsToDisplayICM: string[] = [];
  public myControl = new FormControl();
  public myControlICM = new FormControl();
  filteredOptions: Observable<string[]>;
  filteredOptionsICM: Observable<string[]>;

  panelOpenState = false;
  privateEnvName = '';
  privateEnvUserName = '';
  privateEnvPassword = '';
  privateEnvTNS = '';
  privateEnvHost = '';
  privateEnvPort = '1521';
  privateEnvServiceName = '';

  selectedPrivateEnvForDelete: string;

  constructor(
    private checkConnection: CheckConnectionServiceService,
    private snackBar: MatSnackBar,
    private loader: LoaderSpinnerService,
    private isBanExist: IsBanExistService,
    private http: HttpClient,
    private dataService: DataServiceService,
    private router: Router
    ) {

    }

  getDBConnections(): Observable<any> {
      return this.http.get(this.dbConnectionsJSONPath);
  }

  // getDBConnectionsIcm(): Observable<any> {
  //   return this.http.get(this.dbConnectionsICMJSONPath);
  // }

  ngOnInit() {
    this.getDBConnections().subscribe(
      data => this.onSubscribeDBConnections(data)
    );

    // this.getDBConnectionsIcm().subscribe(
    //   dataIcm => this.onSubscribeDBConnectionsICM(dataIcm)
    // );

    this.privateSavedDBs =  JSON.parse(localStorage.getItem('privateSavedDBs') || '[]');
    this.onSubscribeDBConnectionsICM(this.privateSavedDBs);
  }

  onToggleChange(e) {
    if (e.checked === true) {
      this.isDirectConnect = true;
    } else {
      this.isDirectConnect = false;
    }

    this.dbInstance = '';
    this.host = '';
    this.port = '1521';
    this.serviceName = '';
  }

  onToggleChangePrivate(e) {
    if (e.checked === true) {
      this.isDirectConnectPrivate = true;
    } else {
      this.isDirectConnectPrivate = false;
    }

    this.privateEnvTNS = '';
    this.privateEnvHost = '';
    this.privateEnvPort = '1521';
    this.privateEnvServiceName = '';
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.connectionsToDisplay.filter(conn => conn.toLowerCase().includes(filterValue));
  }

  private _filterICM(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.connectionsToDisplayICM.filter(conn2 => conn2.toLowerCase().includes(filterValue));
  }

  onSubscribeDBConnections(data) {
    this.dbConnections = data;
    for(const conn of this.dbConnections.DBConnections) {
      this.connectionsToDisplay.push(conn.ENV);
    }

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  onSubscribeDBConnectionsICM(privateSavedDBs: PrivateConnection[]) {
    this.connectionsToDisplayICM = [];
    for(const conn of this.privateSavedDBs) {
      this.connectionsToDisplayICM.push(conn.envName);
    }

    this.filteredOptionsICM = this.myControlICM.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterICM(value))
      );
  }

  onSubmit() {
    this.onCheckConnection(true);
  }

  onDeleteAllPrivateENVs() {
    this.connectionsToDisplayICM = [];
    this.privateSavedDBs = [];
    this.onSubscribeDBConnectionsICM(this.privateSavedDBs);
    localStorage.clear();

    this.snackBar.open('All Private Environments Have Been Removed !', 'Close', {
      duration: 4000,
    });
  }

  onDeleteSelectedPrivateENV() {
    this.privateSavedDBs = this.privateSavedDBs.filter(value => value.envName !== this.selectedPrivateEnvForDelete);
    this.onSubscribeDBConnectionsICM(this.privateSavedDBs);
    localStorage.setItem('privateSavedDBs', JSON.stringify(this.privateSavedDBs));
    this.snackBar.open(this.selectedPrivateEnvForDelete + ' Removed !', 'Close', {
      duration: 4000,
    });
    this.selectedPrivateEnvForDelete = undefined;
  }

  onDBConnectionsSelect(event: MatAutocompleteSelectedEvent) {
    this.isDirectConnect = false;
    this.host = '';
    this.port = '1521';
    this.serviceName = '';

    const ConnectionToFill = this.dbConnections.DBConnections.find(x => x.ENV === event.option.value);
    this.dbUserName = ConnectionToFill.username;
    this.dbPass = ConnectionToFill.password;
    this.dbInstance = ConnectionToFill.TNS;
  }

  onDBConnectionsSelectICM(event: MatAutocompleteSelectedEvent) {
    const ConnectionToFill = this.privateSavedDBs.find(x => x.envName === event.option.value);
    this.dbUserName = ConnectionToFill.dbUserName;
    this.dbPass = ConnectionToFill.dbPassword;
    this.isDirectConnect = ConnectionToFill.isDirectConnect;
    this.dbInstance = ConnectionToFill.dbInstance;
    this.host = ConnectionToFill.host;
    this.port = '1521';
    this.serviceName = ConnectionToFill.serviceName;
  }

  onCheckConnectionPrivate() {
    let requestData = {} as RequestData;
    requestData.dbUserName = this.privateEnvUserName;
    requestData.dbPassword = this.privateEnvPassword;
    requestData.isDirectConnect = this.isDirectConnectPrivate;
    requestData.dbInstance = this.privateEnvTNS;
    requestData.host = this.privateEnvHost;
    requestData.port = this.privateEnvPort;
    requestData.serviceName = this.privateEnvServiceName;

    this.isToShowLoader(true);
    this.checkConnection.postCheckConnection(requestData).subscribe(
      (value: {testOutput: string}) => {
        if (value.testOutput === 'OK') {
          this.snackBar.open('DB Connection successful !', 'Close', {
            duration: 3000,
          });
          this.isToShowLoader(false);
        } else {
          this.snackBar.open('DB Connection FAILED !', 'Close', {
            duration: 3000,
          });
          this.isToShowLoader(false);
        }
      });
  }

  onCheckConnection(isCalledFromSubmit: boolean) {
    this.isToShowLoader(true);
    const requestData = this.createRequestData();
    this.checkConnection.postCheckConnection(requestData).subscribe(
      (value: {testOutput: string}) => {
        if (value.testOutput === 'OK') {
          if (isCalledFromSubmit) {
            this.isBanExist.postIsBanExist(requestData).subscribe(
              (isExist: boolean) => {
                if (!isExist) {
                  this.snackBar.open('BAN not exist !', 'Close', {
                    duration: 3000,
                  });
                } else { // BanExist
                  this.setDetails();
                  this.router.navigateByUrl('/banviewer/info');
                }
                // this.isToShowLoader(false);
              }
            );
          } else {
            this.snackBar.open('DB Connection successful !', 'Close', {
              duration: 3000,
            });
          }
          // this.isToShowLoader(false);
        } else {
          this.snackBar.open('DB Connection FAILED !', 'Close', {
            duration: 3000,
          });
        }
        this.isToShowLoader(false);
      }
    );
  }

  createRequestData() {
    let requestData = {} as RequestData;
    requestData.dbUserName = this.dbUserName;
    requestData.dbPassword = this.dbPass;
    requestData.dbInstance = this.dbInstance;
    requestData.isDirectConnect = this.isDirectConnect;
    requestData.host = this.host;
    requestData.port = this.port;
    requestData.serviceName = this.serviceName;
    requestData.banId = this.banId;
    return requestData;
  }

  setDetails() {
    this.dataService.setBanId(this.banId);
    this.dataService.setDbUserNmaeSource(this.dbUserName);
    this.dataService.setDbPasswordSource(this.dbPass);
    this.dataService.setDbInstanceSource(this.dbInstance);

    this.dataService.setDbIsDirectConnect(this.isDirectConnect);
    this.dataService.setDBHost(this.host);
    this.dataService.setDBPort(this.port);
    this.dataService.setDBServiceName(this.serviceName);
  }

  isToShowLoader(condition: boolean) {
    this.loader.isDisplayLoading(condition);
    this.privateSavedDBs =  JSON.parse(localStorage.getItem('privateSavedDBs') || '[]');
    this.onSubscribeDBConnectionsICM(this.privateSavedDBs);
  }

  isToDisableCheckConnection() {
    if (!this.isDirectConnect) {
      return this.dbUserName === '' || this.dbUserName === null ||
      this.dbPass === '' || this.dbPass === null ||
      this.dbInstance === '' || this.dbInstance === null;
    }

    return this.dbUserName === '' || this.dbUserName === null ||
    this.dbPass === '' || this.dbPass === null ||
    this.host === '' || this.host === null ||
    this.port === '' || this.port === null ||
    this.serviceName === '' || this.serviceName === null;
  }

  isToDisableCheckConnectionPrivate() {
    if (!this.isDirectConnectPrivate) {
      return this.privateEnvName === '' ||  this.privateEnvName === null ||
      this.privateEnvUserName === '' || this.privateEnvUserName === null ||
      this.privateEnvPassword === '' || this.privateEnvPassword === null ||
      this.privateEnvTNS === '' || this.privateEnvTNS === null;
    }

    return this.privateEnvName === '' ||  this.privateEnvName === null ||
    this.privateEnvUserName === '' || this.privateEnvUserName === null ||
    this.privateEnvPassword === '' || this.privateEnvPassword === null ||
    this.privateEnvHost === '' || this.privateEnvHost === null ||
    this.privateEnvPort === '' || this.privateEnvPort === null ||
    this.privateEnvServiceName === '' || this.privateEnvServiceName === null;
  }

  isToDisableSubmit() {
    return this.isToDisableCheckConnection() || this.banId === '' || this.banId === null;
  }

  onSavePrivateENV() {
    let privateCon = {} as PrivateConnection;
    privateCon.envName = this.privateEnvName;
    privateCon.dbUserName = this.privateEnvUserName;
    privateCon.dbPassword = this.privateEnvPassword;
    if(this.isDirectConnectPrivate) {
      privateCon.isDirectConnect = true;
      privateCon.host = this.privateEnvHost;
      privateCon.port = this.privateEnvPort;
      privateCon.serviceName = this.privateEnvServiceName;
    } else {
      privateCon.isDirectConnect = false;
      privateCon.dbInstance = this.privateEnvTNS;
    }

    this.privateSavedDBs.push(privateCon);
    this.onSubscribeDBConnectionsICM(this.privateSavedDBs);
    localStorage.setItem('privateSavedDBs', JSON.stringify(this.privateSavedDBs));

    this.privateEnvName = '';
    this.privateEnvUserName = '';
    this.privateEnvPassword = '';
    this.privateEnvHost = '';
    this.privateEnvPort = '1521';
    this.privateEnvServiceName = '';
    this.privateEnvTNS = '';

    this.snackBar.open('Environment ' + privateCon.envName + ' Saved !', 'Close', {
      duration: 4000,
    });
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

export interface PrivateConnection {
  envName: string;
  dbUserName: string;
  dbPassword: string;
  dbInstance: string;
  isDirectConnect: boolean;
  host: string;
  port: string;
  serviceName: string;
}
