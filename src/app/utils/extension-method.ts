import { Environment } from "./environment";

declare global {
  interface Number {}

  interface String {
  }

  interface Boolean{
    convertToStringFlag(): String;
  }

  interface Array<T> {}
}
Boolean.prototype.convertToStringFlag = function(): String {
  return this ? "Yes" : "No";
};

export {};
