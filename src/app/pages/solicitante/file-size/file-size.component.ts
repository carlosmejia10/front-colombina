// file-size.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-file-size',
  templateUrl: './file-size.component.html',
  styleUrls: ['./file-size.component.css']
})
export class FileSizeComponent {
  @Input() fileSizeMB: number = 0;
  @Input() successMessage: string = '';
  isVisible: boolean = false;

  open(sizeInMB: number) {
    this.fileSizeMB = sizeInMB;
    this.isVisible = true;
  }

  openSuccess(message: string) {
    this.fileSizeMB = 0;
    this.successMessage = message;
    this.isVisible = true;
  }
  

  close() {
    this.isVisible = false;
  }
}
