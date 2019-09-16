import { Component, OnInit } from '@angular/core';
import { CommunicatorService } from '../communicator.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currencies = [
    'INR',
    'GBP',
    'USD',
    'EUR'
  ];

  public selectedCurrency = 'INR';

  constructor(private comms: CommunicatorService) { }

  ngOnInit() {
    this.postCurrency();
  }

  selectChanged() {
    this.postCurrency();
  }

  postCurrency() {
    this.comms.postMessage(this, 'inventory-view', {
      currency: this.selectedCurrency
    });
  }

}
