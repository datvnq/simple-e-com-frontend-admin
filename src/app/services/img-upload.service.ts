import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImgUploadService {

  private baseURL = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }

  upload(file: File): Observable<any> {
    const formData = new FormData();
    formData.append("file", file, file.name);
    return this.httpClient.post(`${this.baseURL}/api/upload`, formData);
  }
}
