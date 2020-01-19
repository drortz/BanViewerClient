import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IsBanExistService {

  constructor(private httpClient: HttpClient,
    ) { }

  isBanExist(userName: string, password: string, instance: string, banId: string) {
    const url = environment.URL + '/isBanExist/' + instance + '/' + userName + '/' + password + '/' + banId;
    return this.httpClient.get(url);
  }

  postIsBanExist(request: RequestData) {
    const url = environment.URL + '/isBanExist/';
    return this.httpClient.post(url, request);
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
