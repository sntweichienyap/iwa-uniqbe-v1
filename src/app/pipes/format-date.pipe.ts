import { Pipe, PipeTransform } from "@angular/core";
import { formatDate } from "@angular/common";

@Pipe({
  name: "formatDate"
})
export class FormatDatePipe implements PipeTransform {
  transform(value: any): string {
    if (value && value instanceof Date) {
      var date = new Date(value);
      return formatDate(date, "d/M/yyyy", "en-MY");
    }

    return value;
  }
}
