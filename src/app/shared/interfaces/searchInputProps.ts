import {FormControl} from '@angular/forms';

export interface ISearchInputProps {
  name: string;
  label: string;
  control: FormControl;
  isNumber?: boolean;
  select?: ISearchInputSelectProp
}

export interface ISearchInputSelectProp {
  list: any[],
  getValue: (val: any) => any;
  getLabel: (val: any) => string;
}
