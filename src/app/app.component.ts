import { Component, OnInit } from '@angular/core';
import { NetworkingService } from './networking.service';
import { CommunicatorService } from './communicator.service';
import { InventoryItem } from './interfaces/inventory-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'InventoryManager';
  private url = 'http://localhost:3000/products';
  constructor(private network: NetworkingService, private comms: CommunicatorService) {}

  ngOnInit() {
    this.network.getData<InventoryItem[]>(this.url, '@all');
  }
}
