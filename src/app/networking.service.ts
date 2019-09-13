import { Injectable } from '@angular/core';
import { CommunicatorService } from './communicator.service';
import { HttpClient } from '@angular/common/http';
import { InventoryItem } from './interfaces/inventory-item';

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
}
