import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserPreview } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { UserSearchParams } from 'src/app/services/user.service.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  users = signal<UserPreview[]>([]);
  filterForm: FormGroup;
  errorData: HttpErrorResponse | undefined;

  private userService = inject(UserService);

  loadUsers(filters: UserSearchParams): void {
    this.userService.getUsers(filters)
      .subscribe({
        next: res => {
          this.users.set(res.matches);
          this.errorData = undefined;
        },
        error: (res: HttpErrorResponse) => this.errorData = res,
      });
  }
}
