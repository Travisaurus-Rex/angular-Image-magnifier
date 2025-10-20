import { Component } from '@angular/core';
import { NgxImageMagnifierComponent } from '../image-magnifier/ngx-image-magnifier.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgxImageMagnifierComponent],
  template: `
    <div class="demo-container">
      <h1>Angular Image Magnifier Demo</h1>
      <ngx-image-magnifier
        [imgThumb]="'assets/minotaur.png'"
        [lensSize]="100"
        [thumbSize]="{ width: '200px', height: '200px' }"
      ></ngx-image-magnifier>
    </div>
  `,
  styles: [`
    .demo-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background: #121212;
      color: #f0f0f0;
      font-family: Arial, sans-serif;
    }

    app-image-magnifier {
      margin-top: 1rem;
      border-radius: 8px;
      overflow: hidden;
    }
  `]
})
export class AppComponent {}
