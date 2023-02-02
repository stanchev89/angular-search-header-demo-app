import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BaseObj } from '../../types/baseObj';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataListComponent {
  @Input() data: BaseObj[] = [];
  @Input() itemIcon: string | null = null;
}
