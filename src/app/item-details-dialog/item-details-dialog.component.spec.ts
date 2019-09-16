import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailsDialogComponent } from './item-details-dialog.component';
import { materialImports } from '../material.imports';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('ItemDetailsDialogComponent', () => {
  let component: ItemDetailsDialogComponent;
  let fixture: ComponentFixture<ItemDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemDetailsDialogComponent ],
      imports: [
        ...materialImports,
        MatDialogModule
      ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: {}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
