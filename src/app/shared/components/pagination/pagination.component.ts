import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject, combineLatest, distinctUntilChanged, first, Subscription, withLatestFrom } from 'rxjs';
import { IPaginationState } from '../../interfaces/paginationState';
import { ActivatedRoute, Router } from '@angular/router';
import { PAGINATION_DEFAULTS, PAGINATION_NAMESPACES } from '../../../core/variables';
import { PageEvent } from '@angular/material/paginator';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit, OnChanges, OnDestroy {
  @Input() totalLength = 0;
  paginationState$: BehaviorSubject<IPaginationState> = new BehaviorSubject<IPaginationState>({
    [PAGINATION_NAMESPACES.PAGE]: PAGINATION_DEFAULTS.PAGE,
    [PAGINATION_NAMESPACES.SIZE]: PAGINATION_DEFAULTS.SIZE
  })
  page$ = this.paginationState$.pipe(map(state => state[PAGINATION_NAMESPACES.PAGE]));
  size$ = this.paginationState$.pipe(map(state => state[PAGINATION_NAMESPACES.SIZE]));
  sizeOptions = PAGINATION_DEFAULTS.SIZE_OPTIONS;
  queryParamSubscription$!: Subscription;
  paginationStateSubscription$!: Subscription;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.queryParamSubscription$ = this.route.queryParams.pipe(
      distinctUntilChanged(),
      withLatestFrom(this.paginationState$)
    ).subscribe(([params, state]) => {
      if (
        params[PAGINATION_NAMESPACES.PAGE] && params[PAGINATION_NAMESPACES.SIZE]
        && (+params[PAGINATION_NAMESPACES.PAGE] !== state[PAGINATION_NAMESPACES.PAGE]
          || +params[PAGINATION_NAMESPACES.SIZE] !== state[PAGINATION_NAMESPACES.SIZE]
        )
      ) {
        this.paginationState$.next({
          [PAGINATION_NAMESPACES.PAGE]: +params[PAGINATION_NAMESPACES.PAGE],
          [PAGINATION_NAMESPACES.SIZE]: +params[PAGINATION_NAMESPACES.SIZE]
        })
      }
    });

    this.paginationStateSubscription$ = this.paginationState$.pipe(
      distinctUntilChanged()
    ).subscribe(state => {
      this.router.navigate([], {
        queryParams: state,
        queryParamsHandling: 'merge'
      })
    })
  };

  ngOnChanges(changes: SimpleChanges) {
    combineLatest([this.page$, this.size$]).pipe(
      first()
    ).subscribe(([page, size]) => {
      const minimumRequiredItems = (page * size) - size - 1;
      const newTotalLength = changes['totalLength']?.currentValue || 1;
      if(newTotalLength < minimumRequiredItems) {
        const lastPossiblePage = Math.round(newTotalLength / size) || PAGINATION_DEFAULTS.PAGE;
        this.paginationState$.next({
          [PAGINATION_NAMESPACES.PAGE]: lastPossiblePage,
          [PAGINATION_NAMESPACES.SIZE]: size
        })
      }
    })
  }

  handleChange(e: PageEvent): void {
    const { pageSize, pageIndex } = e;
    this.paginationState$.next({
      [PAGINATION_NAMESPACES.PAGE]: pageIndex + 1,
      [PAGINATION_NAMESPACES.SIZE]: pageSize
    });
  }

  ngOnDestroy() {
    this.queryParamSubscription$.unsubscribe();
  }

}
