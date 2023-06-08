import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { developmentURI } from 'src/environments/environment.development';
import { Server } from '../Types/Servers';
@Injectable({
  providedIn: 'root',
})
export class ServerService {
  constructor(private http: HttpClient) {}
  getServerById(userId: number) {
    return this.http.get<Server[]>(`${developmentURI.serversByID}/${userId}`);
  }
  pingServer(server_id: any, ipaddress: any) {
    return this.http.put(
      `${developmentURI.pingServer}/${server_id}`,
      ipaddress
    );
  }
  deleteOneServer(server_id: any) {
    return this.http.delete(developmentURI.deleteOne, server_id);
  }
}
