import { Component, Input, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-data-list-item',
  templateUrl: './data-list-item.component.html',
  styleUrls: ['./data-list-item.component.scss']
})
export class DataListItemComponent implements OnInit {
  @Input() item!: any;
  values :any[] = [];

  constructor(private clipboard: Clipboard) {
  }

  ngOnInit() {
    this.values = Object.entries(this.item);
  }

  copyToClipboard(data: any): void {
    const text = typeof data === 'string' ? data : JSON.stringify(data);
    this.clipboard.copy(text);
  }
}
