import { ITwoDimensionable } from "./interfaces/two-dimenionsable.interface";

export class TwoDimensionable implements ITwoDimensionable {
  width: number;
  height: number;

  constructor(w: number = 0, h: number = 0) {
    this.width = w;
    this.height = h;
  }
}