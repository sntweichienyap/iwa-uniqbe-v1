import { Environment } from "./environment";

declare global {
  interface Number { }

  interface String {
    isApiSuccess(): Boolean;
  }

  interface Boolean {
    convertToStringFlag(): String;
  }

  interface Array<T> { }
}

Boolean.prototype.convertToStringFlag = function (): String {
  return this ? "Yes" : "No";
}

String.prototype.isApiSuccess = function (): Boolean {
  return this === Environment.API_FLAG_SUCCESS;
}
export { };
