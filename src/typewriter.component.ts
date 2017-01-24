/**
 * Created by gale on 17-1-22.
 */
import { Component, OnInit, Input } from "@angular/core";
import { TypewriterContent } from "./typewriter.content";
@Component({
    selector: "typewriter",
    template: `
        <div g-typewriter [contents]="contents" [speed]="speed" [beforeType]="beforeType" [beforeStart]="beforeStart"
        [delay]="delay" [afterEnd]="afterEnd" [erasable]="erasable" [deletingAcceleration]="deletingAcceleration" (isDone)="onDone($event)">
            <span class="wrap"></span>
            <g-cursor [activated]="!isDone">{{cursor}}</g-cursor>
        </div>
    `,
    styles: [`
        .special-typewriter {
            color       : darkred;
            font-family : Arial, Helvetica, sans-serif;
            font-weight : bolder;
        }
    `]
})

export class TypewriterComponent implements OnInit {
    constructor() { }

    ngOnInit() {
    }

    @Input() contents: TypewriterContent[] = [];

    /**
     * If it's true, delete previous item of contents before typing next one out.
     * @type {boolean}
     */
    @Input() erasable: boolean = false;

    /**
     * How long before the typewriter will start.
     * @type {number}
     */
    @Input() beforeType: number = 500;

    /**
     * How long before every item of contents will be typed out.
     * @type {number}
     */
    @Input() beforeStart: number = 0;

    /**
     * How long will be delayed after every item of contents is typed out.
     * @type {number}
     */
    @Input() afterEnd: number = 1000;

    /**
     * How long the typewriter will be stopped in mid-sentence (default punctuations are "," and ";").
     * @type {number}
     */
    @Input() delay: number = 0;

    /**
     * Typing speed.
     * @type {number}
     */
    @Input() speed: number = 100 - Math.random() * 80;

    @Input() deletingAcceleration: number = this.speed / 8;

    @Input() cursor: string = "_";

    /**
     * How long the cursor will be disappeared after all the contents are typed out.
     * If it <= 0, the cursor won't be disappeared.
     * @type {number}
     */
    @Input() cursorDelay: number = -1;

    isDone: boolean = false;

    /**
     * Deal with the appearance of the cursor after all contents are typed out.
     * @param isDone
     */
    onDone(isDone: boolean): void {
        if (this.cursorDelay > 0) {
            setTimeout(
                () => {
                    this.isDone = isDone;
                },
                this.cursorDelay
            );
        }
    }
}