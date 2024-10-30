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
  @Input() errorMessage: string = '';
  isVisible: boolean = false;

  open(sizeInMB: number) {
    this.fileSizeMB = sizeInMB;
    this.successMessage = '';
    this.errorMessage = '';
    this.isVisible = true;
  }

  openSuccess(message: string) {
    this.fileSizeMB = 0;
    this.successMessage = message;
    this.errorMessage = '';
    this.isVisible = true;
  }

  openError(message: string) {
    this.fileSizeMB = 0;
    this.successMessage = '';
    this.errorMessage = message;
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
    this.successMessage = '';
    this.errorMessage = '';
  }
}
