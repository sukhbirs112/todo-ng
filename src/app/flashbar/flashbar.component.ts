import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-flashbar',
  templateUrl: './flashbar.component.html',
  styleUrls: ['./flashbar.component.css']
})
export class FlashbarComponent implements OnInit {

  @Input() message:string;

  constructor() { }

  ngOnInit(): void {
    
  }

}
