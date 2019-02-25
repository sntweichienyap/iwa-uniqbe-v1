import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterString"
})
export class FilterStringPipe implements PipeTransform {
  transform(value: any, filterText: string, propName: string): any {
    if (!value || value.length === 0) {
      return value;
    }

    const resultArray = [];
    for (const item of value) {
      if (item[propName] === filterText) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }
}
