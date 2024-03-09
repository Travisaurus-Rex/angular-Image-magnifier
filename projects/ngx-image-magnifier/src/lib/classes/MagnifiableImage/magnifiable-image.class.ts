import { TwoDimensionable } from "../TwoDimensionable/two-dimensionable.class";
import { IMagnifiableImage } from "./interfaces/magnifiable-image.interface";

export class MagnifiableImage extends TwoDimensionable implements IMagnifiableImage {

  // source image

  
  private _source: string;
  
  constructor(src: string = '') {
    super();

    this.source = src;
  }

  set source(val: string ) {
    this._source = val;
  }

  get source() {
    return this._source;
  }
}