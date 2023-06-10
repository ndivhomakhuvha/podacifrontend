import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { developmentURI } from 'src/environments/environment.development';
import { CreateServer, Server } from '../Types/Servers';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ServerService {

  constructor(private http: HttpClient) { }
  getServerById(userId: number) {
    return this.http.get<Server[]>(`${developmentURI.serversByID}/${userId}`);
  }
  pingServer(server_id: any, ipaddress: any) {
    return this.http.put(
      `${developmentURI.pingServer}/${server_id}`,
      ipaddress
    );
  }
  deleteOneServer(server_id: number) {
    return this.http.delete(`${developmentURI.deleteOne}/${server_id}`);
  }


  createServer(serverData: CreateServer): Observable<any> {
    return this.http.post(developmentURI.createServer, serverData);
  }
}
