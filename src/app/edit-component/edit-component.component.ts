import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NetworkingService } from '../networking.service';
import { InventoryViewComponent } from '../inventory-view/inventory-view.component';
import { InventoryItem } from '../interfaces/inventory-item';
import { AppComponent } from '../app.component';
import * as uuid4 from 'uuid/v4';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-component',
  templateUrl: './edit-component.component.html',
  styleUrls: ['./edit-component.component.css']
})
export class EditComponentComponent implements OnInit {

  bookingForm = new FormGroup({
    nameControl: new FormControl('', [Validators.required]),
    manufControl: new FormControl('', [Validators.required]),
    catControl: new FormControl('', [Validators.required]),
    unitsControl: new FormControl('', [Validators.required, Validators.min(1)]),
    priceControl: new FormControl('', [Validators.required, Validators.min(1)]),
    tagsControl: new FormControl('', [Validators.required]),
    areaControl: new FormControl('', [Validators.required]),
    streetControl: new FormControl('', [Validators.required]),
    zoneControl: new FormControl('', [Validators.required]),
    shelfControl: new FormControl('', [Validators.required]),
    descControl: new FormControl('', [Validators.required]),
  });

  categories = [
    'mobile', 'electronics', 'fashion', 'home', 'beauty', 'sports', 'toys', 'books'
  ];

  @Input() preValue: InventoryItem;
  @Output() doneEditing = new EventEmitter<InventoryItem>();

  constructor(
    private router: Router,
    private network: NetworkingService) { }

  ngOnInit() {
    if (this.preValue) {
      this.bookingForm.setValue({
        nameControl: this.preValue.productName,
        manufControl: this.preValue.manufacturer,
        catControl: this.preValue.category,
        unitsControl: this.preValue.units,
        priceControl: this.preValue.unitPrice,
        tagsControl: this.preValue.tags.join(', '),
        areaControl: this.preValue.location.area,
        streetControl: this.preValue.location.street,
        zoneControl: this.preValue.location.zone,
        shelfControl: this.preValue.location.shelf,
        descControl: this.preValue.desc
      });
    }
    console.log(this.bookingForm.value);
  }


  onSubmit() {
    const value = this.bookingForm.value;
    const data = {
      productName: value.nameControl,
      manufacturer: value.manufControl,
      id: uuid4(),
      category: value.catControl,
      units: value.unitsControl,
      unitPrice: value.priceControl,
      tags: value.tagsControl.split(',').map(tag => tag.trim()),
      lastUpdated: (new Date()).getTime(),
      location: {
        area: value.areaControl,
        street: value.streetControl,
        zone: value.zoneControl,
        shelf: value.shelfControl
      },
      desc: value.descControl
    };

    console.log(data);

    this.network.postData<InventoryItem>(
      AppComponent.dataUrl,
      AppComponent.messageKey,
      JSON.stringify(data), 'inventory-add'
      );
    this.router.navigate(['']);
  }

  editCancelled() {
    this.doneEditing.emit(null);
  }

  editDone() {
    const value = this.bookingForm.value;
    const data = {
      productName: value.nameControl,
      manufacturer: value.manufControl,
      id: this.preValue.id,
      category: value.catControl,
      units: value.unitsControl,
      unitPrice: value.priceControl,
      tags: value.tagsControl.split(',').map(tag => tag.trim()),
      lastUpdated: (new Date()).getTime(),
      location: {
        area: value.areaControl,
        street: value.streetControl,
        zone: value.zoneControl,
        shelf: value.shelfControl
      },
      desc: value.descControl
    };
    this.doneEditing.emit(data);

    this.network.putData(
      AppComponent.dataUrl + '/' + this.preValue.id,
      AppComponent.messageKey,
      JSON.stringify(data),
      'inventory-modified'
      );
  }
}
