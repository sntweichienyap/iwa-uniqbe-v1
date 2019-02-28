import { Environment } from "./environment";

declare global {
  interface Number {
    isEmpty(): Boolean;
  }

  interface String {
    isApiSuccess(): Boolean;
    isEmpty(): Boolean;
    convertToDotNetJSONDate(): String;
  }

  interface Boolean {
    convertToStringFlag(): String;
  }

  interface Date {
    
  }

  interface Array<T> { }
}

Boolean.prototype.convertToStringFlag = function (): String {
  return this ? "Yes" : "No";
};

String.prototype.isApiSuccess = function (): Boolean {
  return this === Environment.API_FLAG_SUCCESS;
};

String.prototype.isEmpty = function (): Boolean {
  return this === "";
};

String.prototype.convertToDotNetJSONDate = function (): String {
  var newDate = Date.parse(this);
  return '/Date(' + newDate + '+0800)/';
}

Number.prototype.isEmpty = function (): Boolean {
  return 0 >= this;
};

export { };
