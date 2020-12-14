import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  baseUrl = environment.apiUrl + 'clients/';

  constructor(private http: HttpClient) { }

  getClients(): Observable<Client[]> {
    const url = `${this.baseUrl}`;
    var payLoad = this.http.get<Client[]>(url);
    return payLoad;
  }

  getClient(clientId: number): Observable<Client> {
    const url = `${this.baseUrl + clientId}`;
    var payLoad = this.http.get<Client>(url);
    return payLoad;
  }

  createClient(workSpaceUser: Client): Observable<boolean> {
    const url = `${this.baseUrl}`;
    var payLoad = this.http.post<boolean>(url, workSpaceUser);
    return payLoad;
  }

  updateClient(updatedWorkSpaceUser: Client): Observable<boolean> {
    const url = `${this.baseUrl}`;
    var payLoad = this.http.put<boolean>(url, updatedWorkSpaceUser);
    return payLoad;
  }

  deleteClient(id: number): Observable<boolean> {
    const url = `${this.baseUrl + id}`;
    var payLoad = this.http.delete<boolean>(url);
    return payLoad;
  }
}
