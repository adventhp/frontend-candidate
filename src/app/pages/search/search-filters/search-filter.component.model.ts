import { FormControl } from "@angular/forms";

export type UserSearchForm = {
  term: FormControl<string>;
  color: FormControl<string>;
};