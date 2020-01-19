import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private banIdSource = new BehaviorSubject('');
  banId = this.banIdSource.asObservable();

  private dbUserNmaeSource = new BehaviorSubject('');
  dbUserNmae = this.dbUserNmaeSource.asObservable();

  private dbPasswordSource = new BehaviorSubject('');
  dbPassword = this.dbPasswordSource.asObservable();

  private dbInstanceSource = new BehaviorSubject('');
  dbInstance = this.dbInstanceSource.asObservable();

  private dbIsDirectConnectSource = new BehaviorSubject<boolean>(false);
  dbIsDirectConnect = this.dbIsDirectConnectSource.asObservable();

  private dbHostSource = new BehaviorSubject('');
  dbHost = this.dbHostSource.asObservable();

  private dbPortSource = new BehaviorSubject('');
  dbPort = this.dbPortSource.asObservable();

  private dbServiceNameSource = new BehaviorSubject('');
  dbServiceName = this.dbServiceNameSource.asObservable();

  constructor() { }

  setBanId(input: string) {
    this.banIdSource.next(input);
  }

  setDbUserNmaeSource(input: string) {
    this.dbUserNmaeSource.next(input);
  }

  setDbPasswordSource(input: string) {
    this.dbPasswordSource.next(input);
  }

  setDbInstanceSource(input: string) {
    this.dbInstanceSource.next(input);
  }

  setDBHost(input: string) {
    this.dbHostSource.next(input);
  }

  setDBPort(input: string) {
    this.dbPortSource.next(input);
  }

  setDBServiceName(input: string) {
    this.dbServiceNameSource.next(input);
  }

  setDbIsDirectConnect(input: boolean) {
    this.dbIsDirectConnectSource.next(input);
  }
}
