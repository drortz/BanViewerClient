import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderActionServiceService {

  constructor(private httpClient: HttpClient) { }

  RetrieveOrderActionDetails(inputData: {'dbUserName': string, 'dbPassword': string, 'dbInstance': string, 'banId': string}) {
    const url = environment.URL + '/retrieveOrderActionDetails';
    return this.httpClient.post(url, inputData);
  }
}
