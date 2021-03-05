/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KruskalComponent } from './Kruskal.component';

describe('KruskalComponent', () => {
  let component: KruskalComponent;
  let fixture: ComponentFixture<KruskalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KruskalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KruskalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
