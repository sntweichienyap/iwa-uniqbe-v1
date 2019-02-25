import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { FormatDatePipe } from "./format-date.pipe";
import { FormatDatetimePipe } from "./format-datetime.pipe";
import { FilterStringPipe } from "./filter-string.pipe";

@NgModule({
  declarations: [FormatDatePipe, FormatDatetimePipe, FilterStringPipe],
  exports: [FormatDatePipe, FormatDatetimePipe, FilterStringPipe],
  imports: [CommonModule]
})
export class PipeModule {}
