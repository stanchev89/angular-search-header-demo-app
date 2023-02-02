import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.scss']
})
export class SidebarItemComponent {
  @Input() icon = 'disabled_by_default';
  @Input() link = '';
  @Input() text = 'DEFAULT';

}
