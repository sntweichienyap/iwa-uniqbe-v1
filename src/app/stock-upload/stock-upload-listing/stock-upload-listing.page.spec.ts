import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockUploadListingPage } from './stock-upload-listing.page';

describe('StockUploadListingPage', () => {
  let component: StockUploadListingPage;
  let fixture: ComponentFixture<StockUploadListingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockUploadListingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockUploadListingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
