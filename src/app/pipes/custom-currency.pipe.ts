import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value >= 1000){
      value = value.toString().substr(0, value.toString().length - 3) + "," + value.toString().substr(value.toString().length - 3)
    }

    value = "$" + value
    return value;
  }

}
