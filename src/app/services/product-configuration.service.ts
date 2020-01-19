import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductConfigurationService {

  constructor(private httpClient: HttpClient) { }

  retrieveProductConfiguration(request: RequestData) {
    const url = environment.URL + '/retrieveAttributesCompare/';
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
