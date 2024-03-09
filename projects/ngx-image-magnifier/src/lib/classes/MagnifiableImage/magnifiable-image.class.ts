import { TwoDimensionable } from "../TwoDimensionable/two-dimensionable.class";

export class MagnifiableImage extends TwoDimensionable {

  // source image
  protected src: string = '';

  
  private _source: string;
  
  constructor(src: string = '') {
    super();

    this.src = src;
  }

  set source(val: string ) {
    this._source = val;
  }

  get source() {
    return this._source;
  }
}