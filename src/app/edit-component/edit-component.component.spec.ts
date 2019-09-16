import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComponentComponent } from './edit-component.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { materialImports } from '../material.imports';
import { MatSelectModule } from '@angular/material/select';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('EditComponentComponent', () => {
  let component: EditComponentComponent;
  let fixture: ComponentFixture<EditComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditComponentComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        RouterTestingModule,
        HttpClientModule,
        ...materialImports
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form on init', () => {
    expect(component.bookingForm.valid).toBeFalsy();
  });

  it('should not accept negative number of units available', () => {
    component.bookingForm.setValue({
      nameControl: 'name',
      manufControl: 'manuf',
      catControl: 'mobile',
      unitsControl: -2,
      priceControl: 10,
      tagsControl: 'tag',
      areaControl: 'area',
      streetControl: 'street',
      zoneControl: 'zone',
      shelfControl: 'shelf',
      descControl: 'desc'
    });

    expect(component.bookingForm.valid).toBeFalsy();
  });

  it('should not accept negative price', () => {
    component.bookingForm.setValue({
      nameControl: 'name',
      manufControl: 'manuf',
      catControl: 'mobile',
      unitsControl: 2,
      priceControl: -10,
      tagsControl: 'tag',
      areaControl: 'area',
      streetControl: 'street',
      zoneControl: 'zone',
      shelfControl: 'shelf',
      descControl: 'desc'
    });
    expect(component.bookingForm.valid).toBeFalsy();
  });

  it('should accept valid values', () => {
    component.bookingForm.setValue({
      nameControl: 'name',
      manufControl: 'manuf',
      catControl: 'mobile',
      unitsControl: 2,
      priceControl: 10,
      tagsControl: 'tag',
      areaControl: 'area',
      streetControl: 'street',
      zoneControl: 'zone',
      shelfControl: 'shelf',
      descControl: 'desc'
    });
    expect(component.bookingForm.valid).toBeTruthy();
  });
});
