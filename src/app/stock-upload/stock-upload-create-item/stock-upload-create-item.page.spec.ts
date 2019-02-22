import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockUploadCreateItemPage } from './stock-upload-create-item.page';

describe('StockUploadCreateItemPage', () => {
  let component: StockUploadCreateItemPage;
  let fixture: ComponentFixture<StockUploadCreateItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockUploadCreateItemPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockUploadCreateItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
