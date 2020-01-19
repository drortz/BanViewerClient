import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'searchByInterfaceName' })
export class SearchByInterfaceNamePipe implements PipeTransform {
  transform(interfaces: Array<InterfacesData>, searchText: string) {
    return interfaces.filter(InterfacesData => InterfacesData.interfaceName.toLowerCase().includes(searchText.toLowerCase()));
  }
}

export interface InterfacesData {
  interfaceName: string;
  stepInstanceId: string;
  xmlType: string;
  seqNo: string;
  sentAt: string;
  serverName: string;
  fileContent: string;
}
