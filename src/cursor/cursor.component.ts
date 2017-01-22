import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'g-cursor',
  styles: [`
        @keyframes blink-cursor {
            from, to {
                color : transparent
            }
            50% {
                color : #000;
            }
        }

        .cursor {
            animation : blink-cursor .75s step-end infinite;
        }
    `],
  template: `
        <span [style.display]="activated ? 'inline-block' : 'none'" class="cursor">
            <ng-content></ng-content>
        </span>
    `
})
export class CursorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() activated: boolean = true;
}
