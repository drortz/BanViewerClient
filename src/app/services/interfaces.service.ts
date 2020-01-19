import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InterfacesService {

  constructor(private httpClient: HttpClient) { }

  RetrieveInterfacesData(inputData: {'dbUserName': string, 'dbPassword': string, 'dbInstance': string, 'banId': string}) {
    const url = environment.URL + '/retrieveInterfaces';
    return this.httpClient.post(url, inputData);
  }
}
