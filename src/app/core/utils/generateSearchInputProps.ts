import {ISearchInputProps, ISearchInputSelectProp} from '../../shared/interfaces/searchInputProps';
import {camelToTitleCase} from './camelToTitleCase';
import {FormControl, Validators} from '@angular/forms';

interface IProps<T> {
  keys: T[];
  numberKeys?: T[];
  select?: { [key: string]: ISearchInputSelectProp },
}

export const generateSearchInputProps = <T>({keys, numberKeys, select}: IProps<keyof T>): ISearchInputProps[] => {
  return keys.map(key => {
    return {
      name: key as string,
      label: camelToTitleCase(key as string),
      control: new FormControl('', [Validators.required].concat(numberKeys?.includes(key) ? Validators.min(1) : [])),
      isNumber: numberKeys?.includes(key),
      select: select?.[key as string]
    }
  })
}
