import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  //Populate id automatically from the route params
  @Input() id: number;;

  constructor() { }

  ngOnInit(): void {
  }

}
