import { Environment } from "./environment";

declare global {
  interface Number {
    isEmpty(): boolean;
  }

  interface String {
    isApiSuccess(): boolean;
    isEmpty(): boolean;
    convertToDotNetJSONDate(): string;
    convertToJSDate(): Date;
  }

  interface Boolean {
    convertToStringFlag(): string;
  }

  interface Date {
    formatDate(): string;
  }

  interface Array<T> { }
}
Number.prototype.isEmpty = function (): boolean {
  return 0 >= this;
};

String.prototype.isApiSuccess = function (): boolean {
  return this === Environment.API_FLAG_SUCCESS;
};

String.prototype.isEmpty = function (): boolean {
  return typeof (Object).toString() === "object" || !this;
};

String.prototype.convertToDotNetJSONDate = function (): string {
  var newDate = Date.parse(this);
  return '/Date(' + newDate + '+0800)/';
}

String.prototype.convertToJSDate = function (): Date {
  var pattern = /Date\(([^)]+)\)/;
  var results = pattern.exec(this);
  var dt = new Date(parseFloat(results[1]));

  return dt;
}

Boolean.prototype.convertToStringFlag = function (): string {
  return this ? "Yes" : "No";
};

Date.prototype.formatDate = function (): string {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dev"];
  
  var dd = this.getDate();
  if(dd < 10){
    dd = '0' + dd;
  }
  
  return `${dd} ${months[this.getMonth()]} ${this.getFullYear()}`;
}



export { };
