import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { UserQuoteItem } from './details.component.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  //Populate id automatically from the route params
  @Input() id: number;;

  user: User;
  quotes: UserQuoteItem[];
  errorData: HttpErrorResponse | undefined;

  private userService = inject(UserService);
  private location = inject(Location);

  ngOnInit(): void {
    this.userService.getUserById(this.id)
      .subscribe({
        next: user => {
          this.user = user;
          this.quotes = this.generateUserQuoteItems(user.quotes);
          this.errorData = undefined;
        },
        error: (res: HttpErrorResponse) => this.errorData = res,
      });
  }

  goBack(): void {
    this.location.back(); // Возвращает на предыдущую страницу
  }

  generateUserQuoteItems(rawQuotes: { [key: number]: string[] }): UserQuoteItem[] {
    // Create an array of UserQuoteItem objects from the raw quotes object
    const quotesArr: UserQuoteItem[] = Object.keys(rawQuotes).map(key => {
      return {
        content: rawQuotes[key][0],
        likes: +key
      }
    });

    // Sort the quotes by likes in descending order, and by content in ascending order if the likes are equal
    quotesArr.sort((a, b) => {
      if (a.likes == b.likes) {
        if (a.content < b.content) return -1;
        if (a.content > b.content) return 1;
        return 0;
      }
      else {
        return b.likes - a.likes;
      }
    });

    return quotesArr;
  }
}
