import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'g-cursor',
  templateUrl: './cursor.component.html',
  styleUrls: ['./cursor.component.css']
})
export class CursorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() activated: boolean = true;
}
