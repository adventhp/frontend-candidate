import { Component, inject, OnInit, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserPreview } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { UserSearchParams } from 'src/app/services/user.service.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  users = signal<UserPreview[]>([]);
  filterForm: FormGroup;

  private userService: UserService;

  constructor() {
    this.userService = inject(UserService);
  }

  ngOnInit(): void {
  }

  loadUsers(filters: UserSearchParams): void {
    this.userService.getUsers(filters)
      .subscribe(res => this.users.set(res.matches));
  }
}
