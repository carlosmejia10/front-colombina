import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css',
})
export class LoaderComponent {
  @Input() height: number = 40;
  @Input() width: number = 40;
  @Input() color: string = 'black';
}
