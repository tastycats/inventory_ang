import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog';
import { InventoryItem } from '../interfaces/inventory-item';
import { NetworkingService } from '../networking.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-item-details-dialog',
  templateUrl: './item-details-dialog.component.html',
  styleUrls: ['./item-details-dialog.component.css']
})
export class ItemDetailsDialogComponent implements OnInit {

  public editOpen = false;

  constructor(
    public dialogRef: MatDialogRef<ItemDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InventoryItem,
    private network: NetworkingService) { }

  ngOnInit() {

  }

  doneEditing(edited: InventoryItem) {
    this.editOpen = false;
    if (edited !== null) {
      this.data = edited;
    }
  }

  onDelete() {
    this.network.deleteData<InventoryItem>(
      AppComponent.dataUrl + '/' + this.data.id,
      AppComponent.messageKey,
      this.data.id,
      'inventory-delete');
  }
}
