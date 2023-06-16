import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { developmentURI } from 'src/environments/environment.development';
import { GPT } from '../Types/GPT';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})

export class ChatService {
  constructor(private http: HttpClient) {}
  textGPT(message: GPT):Observable<GPT> {
    return this.http.post<GPT>(developmentURI.chatgpt, message);
  }
}
