import { Injectable } from '@angular/core';
import { CommunicatorService } from './communicator.service';
import { HttpClient } from '@angular/common/http';
import { InventoryItem } from './interfaces/inventory-item';
import { HttpHeaders } from '@angular/common/http';
import { InventoryViewComponent } from './inventory-view/inventory-view.component';

@Injectable({
  providedIn: 'root'
})
export class NetworkingService {

  constructor(private comms: CommunicatorService, private http: HttpClient) { }

  getData<T>(url: string, dest: string, key = 'inventory') {
    this.http.get<T>(url).subscribe(res => {
      // console.log(res);
      this.comms.postMessage(this, dest, {[key]: res});
    });
  }

  postData<T>(url: string, dest: string, data: string, key = 'inventory') {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })};
    this.http.post<T>(url, data, httpOptions).subscribe(res => {
      this.comms.postMessage(this, dest, {[key]: res});
    });
  }
}
