import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, HostListener } from '@angular/core';
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
import * as CanvasJS from '../../assets/js/canvasjs.min';
import { ItemDetailsDialogComponent } from '../item-details-dialog/item-details-dialog.component';
import { MatTabChangeEvent } from '@angular/material/tabs';


interface PlotLabels {
  y: number;
  name: string;
}

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

  public infos = {
    alert: 0,
    warn: 0
  };

  plotData: PlotLabels[] = [];

  public chart: CanvasJS.Chart;
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
          this.processData();
          console.log(this.plotData);
          if (this.chart) {
            this.chart.options.data[0].dataPoints = this.plotData;
            this.chart.render();
          }
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
    this.dialog.open(ItemDetailsDialogComponent, {
      height: '80%',
      width: '80%',
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


  tabSelectIndexChange(ev: MatTabChangeEvent) {
    if (ev.index === 1) {
      this.generateChart();
    }
  }

  generateChart() {
    this.chart = new CanvasJS.Chart(
      'chartcontainer',
      {
        theme: 'light2',
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: 'Inventory contents'
        },
        data: [{
          type: 'pie',
          showInLegend: true,
          toolTipContent: '<b>{name}</b> ${y} (#percent%)',
          indexLabel: '{name} - #percent%',
          dataPoints: this.plotData
        }]
      });

    this.chart.render();
  }

  processData() {
    this.infos = {
      warn: 0,
      alert: 0
    };

    const datapoints = {};

    // const plots = [];

    this.inventory.forEach(item => {
      if (item.units < 10000) {
        this.infos.alert++;
      } else if (item.units < 50000) {
        this.infos.warn++;
      }
      if (datapoints[item.category]) {
        datapoints[item.category]++;
      } else {
        datapoints[item.category] = 1;
      }
    });

    Object.keys(datapoints).map(k => {
      this.plotData.push({y: datapoints[k], name: k});
    });

    // console.log(this.plotData);
  }
}
