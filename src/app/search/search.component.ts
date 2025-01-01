import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { FormControl, FormGroup } from '@angular/forms';
import { SelectOption } from '../models/select-option';
import { Person } from '../models/person';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public searchForm: FormGroup;
  public searchResults: Person[];
  public showSearchResults: boolean = false;
  public showError: boolean = false;
  public error: string;

  public colorOptions: SelectOption[] = [
    { label: 'red', value: 'red'},
    { label: 'blue', value: 'blue' },
    { label: 'green', value: 'green' }
  ];

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({ 
      term: new FormControl<string | null | undefined>(null),
      color: new FormControl<string | null | undefined>(null)
    });

    let searchData = JSON.parse(sessionStorage.getItem('searchData'));
    this.searchResults = searchData.searchResults;
    this.searchForm.controls.term.setValue(searchData.term);
    this.searchForm.controls.color.setValue(searchData.color);
    this.showSearchResults = this.searchResults.length > 0;

    sessionStorage.removeItem('searchData');    
  }

  search() {
    this.searchService.search(this.searchForm.value.term, this.searchForm.value.color).subscribe(
      (response) => {
        this.error = null;
        this.searchResults = [...response.matches];
        this.showSearchResults = true;

        let searchData = {
          term: this.searchForm.value.term,
          color: this.searchForm.value.color,
          searchResults: this.searchResults
        }

        sessionStorage.setItem('searchData', JSON.stringify(searchData));
      },
      (error) => {
        this.error = `Something went wrong, please try again.`;
      }
    );
  }

  selectedChanged($event) {
    this.searchForm.controls.color.setValue($event.target.value == 'null' ? null : $event.target.value);
  }
}
