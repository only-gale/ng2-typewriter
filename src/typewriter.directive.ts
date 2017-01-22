/**
 * Created by gale on 17-1-7.
 */
import { Directive, ElementRef, Input, AfterViewInit, Output, EventEmitter } from "@angular/core";
import { TypewriterContent } from "./typewriter.content";
@Directive({
    selector: '[g-typewriter]'
})

export class TypewriterDirective implements AfterViewInit {
    ngAfterViewInit(): void {
        this._target = this.el.nativeElement.querySelector('span.wrap');
        setTimeout(() => this.tick(), this._beforeType);
    }

    constructor( private el: ElementRef ) {}

    private _target: Element;
    private _loopNum: number = 0;
    private _index: number = 0;
    private _delay_ratio: number = ( Math.sqrt(5) - 1 ) / 2;

    private _isDeleting: boolean = false;
    private _text_decorated: string = '';

    /**
     * Does all contents typed out?
     * @type {boolean}
     * @private
     */
    private _isDone = false;
    private _cur = -1;

    private _decorate_templates: string[] = [];
    private _default_special_class_name = 'special-typewriter';
    private _regex = /[,;]$/;       // Delay if the text match this rule. In order to setting delay within a sentence.

    // Configuration items.
    private _contents: TypewriterContent[] = [];
    private _erasable: boolean = true;
    private _beforeType: number = 500;
    private _beforeStart: number = 0;
    private _afterEnd: number = 500;
    private _delay = this._afterEnd * this._delay_ratio;           // Delay before type next sentence out.
    private _speed = 0;

    @Output() isDone = new EventEmitter<boolean>();

    @Input() set contents( contentsArray: TypewriterContent[] ) {
        this._contents = contentsArray || this._contents;
    }

    @Input() set erasable( erasable: boolean ) {
        this._erasable = erasable;
    }

    @Input() set beforeType( beforeType: number ) {
        this._beforeType = beforeType || this._beforeType;
    }

    @Input() set beforeStart( beforeStart: number ) {
        this._beforeStart = beforeStart || this._beforeStart;
    }

    @Input() set afterEnd( afterEnd: number ) {
        this._afterEnd = afterEnd || this._afterEnd;
    }

    @Input() set delay( delay: number ) {
        this._delay = delay || this._delay;
    }

    @Input() set speed( speed: number ) {
        this._speed = speed || this._speed;
    }

    private tick(): void {
        let i = this._loopNum % this._contents.length;
        let tc = this._contents[ i ];
        let fullText = tc.content;

        if ( i !== this._cur ) {
            this._cur = i;
            this._set_decorate_templates(tc);
        }

        if ( this._erasable ) {
            this._deal_with_erasable(fullText);
        } else {
            this._deal_with_unerasable(fullText);
        }
    }

    private _deal_with_erasable( fullText: string ): void {
        let delta = this._speed;

        if ( this._isDeleting ) {
            this._text_decorated = fullText.substring(0, this._text_decorated.length - 1);
            delta /= 2;     // Speed up.
            if ( this._text_decorated === '' ) {
                this._isDeleting = false;
                this._loopNum++;
                delta = this._beforeStart;      // Type next out immediately.
            }
        } else {
            this._text_decorated = fullText.substring(0, this._text_decorated.length + 1);
            if ( this._text_decorated === fullText ) {
                delta = this._afterEnd;
                this._isDeleting = true;
            }
        }

        this._show(delta);
    }

    private _deal_with_unerasable( fullText: string ): void {
        let delta = this._speed;

        let tick_char: string;
        let origin_text: string;
        let className: string;

        origin_text = fullText.substring(0, this._index++);

        // Decoration begin
        tick_char = origin_text.substr(-1);
        className = this._decorate_templates[ Math.max(0, origin_text.length - 1) ];
        this._text_decorated += (className ? this._render(tick_char, className) : tick_char);

        // Condition check.
        if ( this._delay > 0 && origin_text.match(this._regex) && this._index > 1 && this._index <= fullText.length ) {
            delta = this._delay;
        } else if ( !this._erasable && origin_text === fullText ) {
            this._loopNum++;
            this._index = 0;
            delta = this._afterEnd;
            if ( this._loopNum < this._contents.length ) {      // Breaking line.
                this._show(delta, true);
                return;
            } else {
                this._isDone = true;
                this.isDone.emit(this._isDone);
            }
        }

        this._show(delta);
    }

    private _show( delta: number, breakLine?: boolean ): void {
        this._target.innerHTML = this._text_decorated;
        if (breakLine) {
            this._text_decorated += '</br>';
            this._show(delta);
        } else if ( !this._isDone ) {
            setTimeout(() => this.tick(), delta);
        }
    }

    private _render( text: string, className: string ): string {
        return '<span class="' + className + '">' + text + '</span>';
    }

    private _set_decorate_templates( tc: TypewriterContent ): void {
        let fullText = tc.content;
        let specialWords = tc.specialWords;
        let specialClasses = tc.specialClasses;
        let iterable = tc.iterable;

        // Init it.
        this._decorate_templates = [];
        this._decorate_templates.length = fullText.length;

        specialWords.forEach(( v, i ) => {
            let regex: RegExp = this._get_word_regex(v, 'g');
            if ( iterable ) {
                while ( regex.exec(fullText) ) {
                    this._get_it_filled(specialClasses, i, regex.lastIndex, v.length);
                }
            } else {
                regex.exec(fullText);
                this._get_it_filled(specialClasses, i, regex.lastIndex, v.length);
            }
        });
    }

    private _get_word_regex( v: string, flag?: string ): RegExp {
        return flag && flag.length > 0 ? new RegExp('\\b' + v + '\\b', flag) : new RegExp('\\b' + v + '\\b');
    }

    private _get_it_filled( classes: string[], index: number, lastIndex: number, length: number ): void {
        for ( let x = 1; x <= length; x++ ) {
            this._decorate_templates[ lastIndex - x ] = this._get_special_class_from(classes, index);
        }
    }

    private _get_special_class_from( classes: string[], at: number ): string {
        if ( classes && classes.length ) {
            if ( at > classes.length ) {
                return classes[ 0 ];    // Taking the first one is as default choice.
            } else {
                return classes[ at ];
            }
        } else {
            return this._default_special_class_name;
        }
    }
}
