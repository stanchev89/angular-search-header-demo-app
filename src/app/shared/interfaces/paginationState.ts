import {PAGINATION_NAMESPACES} from '../../core/variables';

export interface IPaginationState {
  [PAGINATION_NAMESPACES.PAGE]: number;
  [PAGINATION_NAMESPACES.SIZE]: number;
}
