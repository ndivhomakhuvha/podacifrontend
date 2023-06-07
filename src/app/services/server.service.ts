import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { developmentURI } from 'src/environments/environment.development';
import { Server } from '../Types/Servers';
@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }
  getServerById(userId: any) {
    return this.http.get<Server>(`${developmentURI.serversByID}/${userId}`)

  }
}
