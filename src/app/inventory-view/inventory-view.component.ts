import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommunicatorService } from '../communicator.service';
import { InventoryItem } from '../interfaces/inventory-item';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { NetworkingService } from '../networking.service';
import { Currencies } from '../interfaces/currencies';
import { debounceTime, map } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { ScrollDispatchModule, ScrollDispatcher } from '@angular/cdk/scrolling';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';

@Component({
  selector: 'app-inventory-view',
  templateUrl: './inventory-view.component.html',
  styleUrls: ['./inventory-view.component.css']
})
export class InventoryViewComponent implements OnInit, AfterViewInit {
  public static messageKey = 'inventory-view';

  inventory: InventoryItem[];
  dataSource: MatTableDataSource<InventoryItem>;
  currencies: Currencies;
  private dataLength: number;
  private pageLength = 20;

  private exchangeRateUrl = 'https://api.exchangeratesapi.io/latest?base=INR&symbols=USD,GBP,EUR,INR';

  selectedCurrency = 'INR';

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('inventoryTable', {read: ElementRef, static: true}) inventoryTable: ElementRef;
  private  paginator = new MatPaginator(
    new MatPaginatorIntl(),
    this.changeRef
  );

  columnsToDisplay = [
    'productName',
    'units',
    'lastUpdated',
    'category',
    'unitPrice'
  ];


  constructor(
    private comms: CommunicatorService,
    private network: NetworkingService,
    private scroll: ScrollDispatcher,
    private changeRef: ChangeDetectorRef) {
    this.dataSource = new MatTableDataSource<InventoryItem>();
  }

  ngOnInit() {
    this.paginator.pageSize = this.pageLength;
    this.paginator.ngOnInit();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.comms.getMessages().subscribe(msg => {
      if (msg.dest === '@all' || msg.dest === InventoryViewComponent.messageKey) {
        const data = msg.data;
        if ('inventory' in data) {
          this.inventory = data.inventory;
          this.dataLength = data.inventory.length;
          this.dataSource.data = this.inventory;
          console.log(this.inventory);
        }
        if ('currency' in data) {
          this.selectedCurrency = data.currency;
          console.log(this.selectedCurrency);
        }
        if ('currencies' in data) {
          this.currencies = data.currencies;
          console.log(this.currencies);
        }
      }
    });

    this.network.getData<Currencies>(this.exchangeRateUrl, InventoryViewComponent.messageKey, 'currencies');
  }

  ngAfterViewInit() {
    this.scroll.ancestorScrolled(this.inventoryTable)
      .pipe(debounceTime(200))
      .subscribe(() => {
        this.tableScrolled();
      });
    this.dataSource.paginator = this.paginator;
  }

  rowClicked(item: InventoryItem) {
    console.log(item);
  }

  tableScrolled() {
    const elem = window;
    if ((elem.innerHeight + elem.pageYOffset + 200) >= document.body.offsetHeight && this.pageLength <= this.dataLength) {
      this.pageLength += 20;
      this.paginator._changePageSize(this.pageLength);
      this.dataSource._updatePaginator(this.pageLength);
      // this.dataSource.data = this.inventory;
      // this.paginator.pageSize = this.pageLength;
      // this.dataSource.paginator = this.paginator;
    }
  }
}
