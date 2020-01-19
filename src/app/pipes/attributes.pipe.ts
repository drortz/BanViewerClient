import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'searchByAttributeName' })
export class SearchByAttributeNamePipe implements PipeTransform {
  transform(inputAttributes: Array<Attribute>, searchText: string) {
    return inputAttributes.filter(Attributes => Attributes.name.toLowerCase().includes(searchText.toLowerCase()));
  }
}


export interface Attribute {
  'name': string;
  'value': string;
}


// let returnValue: Array<Attribute> = new Array();
// for (const attr of Attributes) {
//   if (attr.name.toLowerCase().toString().includes(searchText.toLowerCase())) {
//     returnValue.push(attr);
//   }
// }
// return returnValue;
