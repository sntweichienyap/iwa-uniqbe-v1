import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { FormatDatePipe } from "./format-date.pipe";
import { FormatDatetimePipe } from "./format-datetime.pipe";

@NgModule({
  declarations: [FormatDatePipe, FormatDatetimePipe],
  exports: [FormatDatePipe, FormatDatetimePipe],
  imports: [CommonModule]
})
export class PipeModule {}
