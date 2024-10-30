// file-size.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-file-size',
  templateUrl: './file-size.component.html',
  styleUrls: ['./file-size.component.css']
})
export class FileSizeComponent {
  @Input() fileSizeMB: number = 0;
  isVisible: boolean = false;

  open(sizeInMB: number) {
    this.fileSizeMB = sizeInMB;
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
  }
}
