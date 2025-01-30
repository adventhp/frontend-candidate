import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSearchParams } from 'src/app/services/user.service.model';
import { COLORS } from './constants';
import { UserSearchForm } from './search-filter.component.model';

@Component({
  selector: 'app-search-filters',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-filters.component.html',
  styleUrl: './search-filters.component.scss'
})
export class SearchFiltersComponent {

  @Output() searchEvent = new EventEmitter<UserSearchParams>();

  filterForm: FormGroup<UserSearchForm>;
  colors: string[] = COLORS;

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.initForm();
    this.applyQueryParams();
  }

  private initForm(): void {
    this.filterForm = this.fb.group({
      term: [''],
      color: [''],
    });
  }

  private applyQueryParams(): void {
    this.route.queryParams.subscribe(params => {
      const selectedColor = params['color'];

      if (selectedColor && this.colors.some(c => c === selectedColor)) {
        this.filterForm.patchValue({ color: selectedColor });
      }
      else {
        this.filterForm.patchValue({ color: this.colors[0] });
      }
    });

    this.onSearch();
  }

  onSearch(): void {
    const formValue = this.filterForm.getRawValue();

    if (formValue.color) {
      // Update the URL with the selected color
      this.router.navigate([], {
        queryParams: { color: formValue.color },
        queryParamsHandling: 'merge',
      });
    }

    this.searchEvent.emit(formValue);
  }
}
