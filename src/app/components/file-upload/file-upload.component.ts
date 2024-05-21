import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {
  selectedFiles: FileList | null = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event) {
    this.selectedFiles = (event.target as HTMLInputElement).files;
  }

  onUpload() {
    if (this.selectedFiles) {
      const formData = new FormData();
      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('files', this.selectedFiles[i]);
      }

      this.http.post('/api/compress', formData, { responseType: 'blob' }).subscribe(
        (response: Blob) => {
          const url = window.URL.createObjectURL(response);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'compressed_files.zip';
          a.click();
        },
        error => {
          console.error('Error uploading files', error);
        }
      );
    }
  }
}
