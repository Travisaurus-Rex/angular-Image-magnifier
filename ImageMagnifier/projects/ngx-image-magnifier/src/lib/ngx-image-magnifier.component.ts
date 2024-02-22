import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'ngx-image-magnifier',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ngx-image-magnifier.component.html',
  styleUrls: ['./ngx-image-magnifier.component.css']
})
export class NgxImageMagnifierComponent implements OnInit {
  @ViewChild('thumbnail') thumbnailRef: ElementRef;

  @Input() imgThumb: string;
  @Input() imgLarge: string;
  @Input() lensSize: number = 100;
  @Input() magBoxSize: number = 500;
  @Input() thumbSize: { width: string; height: string };
  @Input() alt: string = 'Web friendly image!';
  @Input() top: string;
  @Input() offsetMenu: boolean;
  @Input() allowHover: boolean = true;
  @Input() isMobile: boolean;

  isMagnifying: boolean = false;
  lensXPos: number;
  lensYPos: number;

  private lensSizeRadius: number;
  private magXPos: number;
  private magYPos: number;
  private ratio: number;
  private thumbBox: DOMRect;
  private backgroundWidth: number;
  private backgroundHeight: number;
  private menuWidth: number = 300;

  private allowBackroundYMovement: boolean = true;
  private allowBackgroundXMovement: boolean = true;

  constructor() {}

  ngOnInit(): void {
    this.correctLensPos();
    this.setRatio();
  }

  onMouseMove(event: MouseEvent): void {
    this.thumbBox = this.thumbnailRef.nativeElement.getBoundingDOMRect();

    this.moveLens(event);
    this.setBackgroundSize(this.thumbBox);
  }

  toggleIsMagnifying(): void {
    if (this.allowHover) {
      this.isMagnifying = !this.isMagnifying;
    }
  }

  getBackgroundImage(): string {
    return `url(${this.imgLarge})`;
  }

  getBackgroundSize(): string {
    return `${this.backgroundWidth}px ${this.backgroundHeight}px`;
  }

  getBackgroundPos(): string {
    return `${this.magXPos}px ${this.magYPos}px`;
  }

  private correctLensPos(): void {
    this.lensSizeRadius = this.lensSize / 2;
  }

  private setRatio(): void {
    this.ratio = this.magBoxSize / this.lensSize;
  }

  private moveLens(event: MouseEvent): void {
    this.lensXPos = event.clientX - this.lensSizeRadius;
    this.lensYPos = event.clientY - this.lensSizeRadius;

    if (this.offsetMenu) {
      this.lensXPos -= this.menuWidth;
    }

    this.preventOutOfBounds(event);
  }

  private preventOutOfBounds(event: MouseEvent): void {
    const left = this.thumbBox.left;
    const right = this.thumbBox.right;
    const top = this.thumbBox.top;
    const bottom = this.thumbBox.bottom;

    if (this.outOfBoundsLeft(left) || this.outOfBoundsRight(right)) {
      this.allowBackgroundXMovement = false;
    } else {
      this.allowBackgroundXMovement = true;
    }

    if (this.outOfBoundsTop(top) || this.outOfBoundsBottom(bottom)) {
      this.allowBackroundYMovement = false;
    } else {
      this.allowBackroundYMovement = true;
    }

    this.setBackgroundPos(event);
  }

  private outOfBoundsLeft(boxLeft: number): boolean {
    if (this.lensXPos < boxLeft) {
      this.lensXPos = boxLeft;
      return true;
    }

    return false;
  }

  private outOfBoundsRight(boxRight: number): boolean {
    if (this.lensXPos + this.lensSize > boxRight) {
      this.lensXPos = boxRight - this.lensSize;
      return true;
    }

    return false;
  }

  private outOfBoundsTop(boxTop: number): boolean {
    if (this.lensYPos < boxTop) {
      this.lensYPos = boxTop;
      return true;
    }

    return false;
  }

  private outOfBoundsBottom(boxBottom: number): boolean {
    if (this.lensYPos + this.lensSize > boxBottom) {
      this.lensYPos = boxBottom - this.lensSize;
      return true;
    }

    return false;
  }

  private setBackgroundSize(thumbBox: DOMRect): void {
    this.backgroundWidth = thumbBox.width * this.ratio;
    this.backgroundHeight = thumbBox.height * this.ratio;
  }

  private setBackgroundPos(event: MouseEvent): void {
    if (this.allowBackgroundXMovement) {
      this.magXPos = -((event.offsetX - this.lensSizeRadius) * this.ratio);
    }

    if (this.allowBackroundYMovement) {
      this.magYPos = -((event.offsetY - this.lensSizeRadius) * this.ratio);
    }
  }
}
