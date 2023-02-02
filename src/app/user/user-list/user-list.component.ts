import {Component, OnInit} from '@angular/core';
import {JsonPlaceholderService} from "../../core/services/json-placeholder.service";
import { IUser, userSearchKeys } from '../../shared/interfaces/user';
import { ISearchInputProps } from '../../shared/interfaces/searchInputProps';
import { generateSearchInputProps } from '../../core/utils/generateSearchInputProps';
import { IListResponse } from '../../shared/interfaces/listResponse';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  searchProps: ISearchInputProps[] = [];
  data: IUser[] = [];
  dataTotalCount = 0;

  constructor(private jsonPlaceholderService: JsonPlaceholderService) {}

  request$ = this.jsonPlaceholderService.getUsers.bind(this.jsonPlaceholderService);

  ngOnInit() {
    this.searchProps = generateSearchInputProps<IUser>({
      keys: userSearchKeys,
      numberKeys: ['id'],
    });
  }

  onDataUpdate(data: IListResponse<IUser>): void {
    this.dataTotalCount = data.totalCount;
    this.data = data.list;
  }
}
