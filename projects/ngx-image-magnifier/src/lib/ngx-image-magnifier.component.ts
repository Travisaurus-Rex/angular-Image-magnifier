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
  @Input() magnifiedSize: number = 500;
  @Input() thumbSize: { width: string; height: string };
  @Input() alt: string = 'Web friendly image!';
  @Input() allowHover: boolean = true; // for touch screens?

  isMagnifying: boolean = false;
  lensPositionX: number;
  lensPositionY: number;

  private lensSizeRadius: number;
  private magnifiedPositionX: number;
  private magnifiedPositionY: number;
  private ratio: number;
  private thumbBox: DOMRect;
  private backgroundWidth: number;
  private backgroundHeight: number;
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
    return `${this.magnifiedPositionX}px ${this.magnifiedPositionY}px`;
  }

  private correctLensPos(): void {
    this.lensSizeRadius = this.lensSize / 2;
  }

  private setRatio(): void {
    this.ratio = this.magnifiedSize / this.lensSize;
  }

  private moveLens(event: MouseEvent): void {
    this.lensPositionX = event.clientX - this.lensSizeRadius;
    this.lensPositionY = event.clientY - this.lensSizeRadius;
    this.preventOutOfBounds(event);
  }

  private preventOutOfBounds(event: MouseEvent): void {
    const left = this.thumbBox.left;
    const right = this.thumbBox.right;
    const top = this.thumbBox.top;
    const bottom = this.thumbBox.bottom;

    this.allowBackgroundXMovement = !(this.outOfBoundsLeft(left) || this.outOfBoundsRight(right));
    this.allowBackroundYMovement = !(this.outOfBoundsTop(top) || this.outOfBoundsBottom(bottom));

    this.setBackgroundPos(event);
  }

  private outOfBoundsLeft(boxLeft: number): boolean {
    if (this.lensPositionX < boxLeft) {
      this.lensPositionX = boxLeft;
      return true;
    }

    return false;
  }

  private outOfBoundsRight(boxRight: number): boolean {
    if (this.lensPositionX + this.lensSize > boxRight) {
      this.lensPositionX = boxRight - this.lensSize;
      return true;
    }

    return false;
  }

  private outOfBoundsTop(boxTop: number): boolean {
    if (this.lensPositionY < boxTop) {
      this.lensPositionY = boxTop;
      return true;
    }

    return false;
  }

  private outOfBoundsBottom(boxBottom: number): boolean {
    if (this.lensPositionY + this.lensSize > boxBottom) {
      this.lensPositionY = boxBottom - this.lensSize;
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
      this.magnifiedPositionX = this.calculateMagnifiedPosition(event.offsetX);
    }

    if (this.allowBackroundYMovement) {
      this.magnifiedPositionY = this.calculateMagnifiedPosition(event.offsetY);
    }
  }

  private calculateMagnifiedPosition(offset: number): number {
    return -((offset - this.lensSizeRadius) * this.ratio);
  }
}
