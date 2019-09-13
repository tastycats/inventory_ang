import { Component, OnInit } from '@angular/core';
import { NetworkingService } from './networking.service';
import { CommunicatorService } from './communicator.service';
import { InventoryItem } from './interfaces/inventory-item';
// import { InventoryViewComponent } from './inventory-view/inventory-view.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public static dataUrl = 'http://localhost:3000/products';
  public static messageKey = 'app-view';
  title = 'InventoryManager';
  inventory: InventoryItem[];
  constructor(private network: NetworkingService, private comms: CommunicatorService) {}

  ngOnInit() {
    this.network.getData<InventoryItem[]>(AppComponent.dataUrl, '@all');
    this.comms.getMessages().subscribe(msg => {
      if (msg.dest === '@all' || msg.dest === AppComponent.messageKey) {
        const data = msg.data;
        if ('inventory' in data) {
          this.inventory = data.inventory;
        }

        if ('get-inventory' in data) {
          console.log('get-inventory');
          if (this.inventory) {
            this.comms.postMessage(this, 'inventory-view', {
              inventory: this.inventory
            });
          }
        }

        if ('inventory-update' in data) {
          if (this.inventory) {
            this.inventory.push(data['inventory-update']);
          } else {
            this.inventory = [data['inventory-update']];
          }
          this.comms.postMessage(this, 'inventory-view', {
            inventory: this.inventory
          });
        }
      }
    });
  }
}
