import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { CommunicatorService } from '../communicator.service';
import { InventoryItem } from '../interfaces/inventory-item';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { NetworkingService } from '../networking.service';
import { Currencies } from '../interfaces/currencies';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { AppComponent } from '../app.component';
import { MatDialog } from '@angular/material/dialog';
import { ItemDetailsDialogComponent } from '../item-details-dialog/item-details-dialog.component';

@Component({
  selector: 'app-inventory-view',
  templateUrl: './inventory-view.component.html',
  styleUrls: ['./inventory-view.component.css']
})
export class InventoryViewComponent implements OnInit {
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

  private debounceTimer: number;

  columnsToDisplay = [
    'productName',
    'manufacturer',
    'units',
    'lastUpdated',
    'category',
    'unitPrice'
  ];


  constructor(
    private comms: CommunicatorService,
    private network: NetworkingService,
    private scroll: ScrollDispatcher,
    private changeRef: ChangeDetectorRef,
    private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<InventoryItem>();
  }

  ngOnInit() {
    this.paginator.pageSize = this.pageLength;
    this.paginator.ngOnInit();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.comms.postMessage(this, AppComponent.messageKey, {
      'get-inventory': null
    });
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

  rowClicked(item: InventoryItem) {
    // console.log(item);
    this.dialog.open(ItemDetailsDialogComponent, {
      data: item
    });
  }

  @HostListener('window:scroll', ['$event'])
  tableScrolled(ev) {
    const elem = window;
    if (this.debounceTimer) {
      window.cancelAnimationFrame(this.debounceTimer);
    }
    this.debounceTimer =  elem.requestAnimationFrame(() => {
      if ((elem.innerHeight + elem.pageYOffset + 200) >= document.body.offsetHeight && this.pageLength <= this.dataLength) {
        console.log('scroll');
        this.pageLength += 20;
        this.debounceTimer = 0;
        this.paginator._changePageSize(this.pageLength);
      }
    });
  }

  applyFilter(filter: string) {
    console.log(filter);
    this.dataSource.filter = filter.trim().toLowerCase();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
