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

  }

  interface Array<T> { }
}

Boolean.prototype.convertToStringFlag = function (): string {
  return this ? "Yes" : "No";
};

String.prototype.isApiSuccess = function (): boolean {
  return this === Environment.API_FLAG_SUCCESS;
};

String.prototype.isEmpty = function (): boolean {
  return this === "";
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

Number.prototype.isEmpty = function (): boolean {
  return 0 >= this;
};

export { };
