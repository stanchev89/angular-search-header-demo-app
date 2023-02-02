import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ISearchInputProps } from '../../interfaces/searchInputProps';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { distinctUntilChanged, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchHeaderComponent implements OnInit, OnDestroy {
  @Input() inputProps: ISearchInputProps[] = [];
  form: FormGroup = new FormGroup<any>({});
  queryParamSubscription!: Subscription;
  formChangeSubscriptions!: Subscription;
  errorStateMatcher: ErrorStateMatcher = {
    isErrorState: (control: FormControl|null) => !control?.valid && (!['', null].includes(control?.value))
  }

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.form = this.fb.group(this.inputProps.reduce((acc, cur) => {
      return {
        ...acc,
        [cur.name]: cur.control
      }
    }, {}));

    this.queryParamSubscription = this.route.queryParams.pipe(
      distinctUntilChanged()
    ).subscribe((params) => {
      this.inputProps.forEach(prop => {
        if (params[prop.name] && params[prop.name] !== prop.control.value) {
          this.form.patchValue({ [prop.name]: prop.isNumber ? +params[prop.name] : params[prop.name] })
        }
      })
    });

    this.formChangeSubscriptions = this.form.valueChanges.pipe(
      distinctUntilChanged(),
    ).subscribe((values: { [key: string]: string|number }) => {

      const queryParams = Object.entries(values)
        .reduce((acc, [k, v]) => ({ ...acc, [k]: v === '' ? null : v }), {});

      this.router.navigate([], {
        queryParams,
        queryParamsHandling: 'merge'
      })
    })
  }

  resetValues(): void {
    this.form.reset();
  }

  ngOnDestroy() {
    this.queryParamSubscription.unsubscribe();
    this.formChangeSubscriptions.unsubscribe();
  }
}
