import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-server-error-card',
  standalone: true,
  imports: [],
  templateUrl: './server-error-card.component.html',
  styleUrl: './server-error-card.component.scss'
})
export class ServerErrorCardComponent implements OnInit {
  @Input() errorTitle: string = 'Server Error';
  @Input({ required: true }) errorData: HttpErrorResponse;

  message: string = 'Something went wrong. Please try again later.';

  ngOnInit(): void {
    this.message = this.errorData?.error?.error || this.message;
  }
}
