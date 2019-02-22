import { Pipe, PipeTransform } from "@angular/core";
import { formatDate } from "@angular/common";

@Pipe({
  name: "formatDatetime"
})
export class FormatDatetimePipe implements PipeTransform {
  transform(value: any): string {
    if (value && value instanceof Date) {
      var date = new Date(value);
      return formatDate(date, "d/M/yyyy h:m:ss a", "en-MY");
    }

    return value;
  }
}
