import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckConnectionServiceService {
  constructor(private httpClient: HttpClient) { }

  getCheckConnection(userName: string, password: string, instance: string) {
    const url = environment.URL + '/test-database-connection/' + instance + '/' + userName + '/' + password;
    return this.httpClient.get(url);
  }

  postCheckConnection(requestData: RequestData) {
    const url = environment.URL + '/test-database-connection/';
    return this.httpClient.post(url, requestData);
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
