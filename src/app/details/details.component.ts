import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../services/search.service';
import { Person } from '../models/person';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  public person: Person;
  public error: string;

  constructor(private route: ActivatedRoute, private searchService: SearchService) { }

  ngOnInit(): void {
    this.searchService.getDetails(this.route.snapshot.paramMap.get('id')).subscribe(
      (response) => {
      this.person = response;
      },
      (error) => {
        this.error = 'Oops, something went wrong.  Please try again.';
      }
    );
  }
}
