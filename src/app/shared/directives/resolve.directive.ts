import { Directive, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISearchInputProps } from '../interfaces/searchInputProps';
import {
  combineLatest, debounce,
  distinctUntilChanged, interval,
  Observable,
  of,
  shareReplay,
  startWith
} from 'rxjs';
import { map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { BaseObj } from '../types/baseObj';
import { ActivatedRoute } from '@angular/router';
import { DEBOUNCE_SEARCH_INPUT, PAGINATION_DEFAULTS, PAGINATION_NAMESPACES } from '../../core/variables';

interface InputsValue {
  name: string;
  value: string|number;
}

@Directive({
  selector: '[appResolve]',
  exportAs: 'appResolve'
})
export class ResolveDirective<Params extends BaseObj = {}, Response = any> implements OnInit {
  private isLoading: boolean = false;
  private isInitialized = false;
  @Input() inputProps: ISearchInputProps[] = [];
  @Input() withPagination = true;
  @Input() appResolve: (args: Params) => Observable<Response> = (args: Params) => of({} as Response);
  @Output() handleDataUpdate = new EventEmitter<Response>();

  private allFormControls!: { name: string, control: FormControl }[];
  private combinedValueChanges$!: Observable<Array<string>>;
  private inputs$!: Observable<Array<InputsValue>>;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.allFormControls = this.inputProps.map(p => ({
      name: p.name,
      control: p.control
    }));

    this.combinedValueChanges$ = combineLatest(
      this.allFormControls.map(({ control }) => control.valueChanges.pipe(startWith(control.value)))
    )

    this.inputs$ = this.combinedValueChanges$.pipe(
      map((values) => values.map((v, i) => {
          const inputProp = this.inputProps.find(p => p.name === this.allFormControls[i].name);
          return {
            name: inputProp?.name || '',
            value: inputProp?.isNumber ? +v : v
          }
        })
      ),
      map(res => res.filter(o => !this.allFormControls.find(el => el.name === o.name && !el.control.valid))),
      distinctUntilChanged(this.checkInputDiff),
      shareReplay(1),
    )

    combineLatest([
      this.inputs$.pipe(
        map(values => values.filter(v => this.inputProps.find(p => p.name === v.name && !!p.select))),
        distinctUntilChanged(this.checkInputDiff),
      ),
      this.inputs$.pipe(
        map(values => values.filter(v => this.inputProps.find(p => p.name === v.name && !p.select))),
        distinctUntilChanged(this.checkInputDiff),
        debounce(() => interval(this.isInitialized ? DEBOUNCE_SEARCH_INPUT : 0))
      ).pipe(distinctUntilChanged(this.checkInputDiff)),
      this.withPagination
        ? this.route.queryParams.pipe(
          map(params => ({
            [PAGINATION_NAMESPACES.PAGE]: Number(params[PAGINATION_NAMESPACES.PAGE] || PAGINATION_DEFAULTS.PAGE),
            [PAGINATION_NAMESPACES.SIZE]: Number(params[PAGINATION_NAMESPACES.SIZE] || PAGINATION_DEFAULTS.SIZE)
          })),
          distinctUntilChanged((previous, current) =>
            previous[PAGINATION_NAMESPACES.PAGE] === current[PAGINATION_NAMESPACES.PAGE]
            && previous[PAGINATION_NAMESPACES.SIZE] === current[PAGINATION_NAMESPACES.SIZE]
          ),
        )
        : of({})
    ]).subscribe(([reactiveInputs, debounceInputs, paginationState]) => {
      this.isLoading = true;
      this.isInitialized = true;
      const params = reactiveInputs.concat(debounceInputs).reduce((acc, cur) => ({
        ...acc,
        [cur.name]: cur.value
      }), paginationState);
      this.appResolve(params as Params).subscribe(data => {
        this.handleDataUpdate.emit(data)
        this.isLoading = false;
      })
    })

  }

  private checkInputDiff(previous: InputsValue[], current: InputsValue[]): boolean {
    return current.length === previous.length && !current.find((cur, i) => cur.value !== previous[i].value)
  }

  get isResolving(): boolean {
    return this.isLoading;
  }

}
