import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxImageMagnifierComponent } from '../../projects/ngx-image-magnifier/src/public-api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxImageMagnifierComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Image Magnifier Test';
}
