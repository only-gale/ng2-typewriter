/**
 * Created by gale on 17-1-11.
 */
export class TypewriterContent {
    constructor( private _content: string, private _specialWords?: string[], private _specialClasses?: string[], private _iterable?: boolean ) {
        /**
         * The content of this TypewriterContent.
         *
         * If the typewriter is configured as unerasable, then every item in this array will be typed out as an individual line.
         * @type {string}
         * @private
         */
        this._content = _content;

        /**
         * Every word in this array will be surrounded by a span tag char by char, and the corresponding special class will be used.
         * e.g.:
         *      content = "One world, one dream.";
         *      specialWords = ["world", "dream"];
         *      specialClasses = ["green-world", "red-dream"];
         *      outputs:
         *          One <span class="green-world">w</span>
         *          <span class="green-world">o</span>
         *          <span class="green-world">r</span>
         *          <span class="green-world">l</span>
         *          <span class="green-world">d</span>, one<span class="red-dream">d</span>
         *          <span class="red-dream">r</span>
         *          <span class="red-dream">e</span>
         *          <span class="red-dream">a</span>
         *          <span class="red-dream">m</span>.
         *      and if the special-class-2 is omitted, the first class of specialClasses will be used as default.
         *      and if all the special classes are omitted, which means specialClasses = [];
         *          then the default class named "special-typewriter" will be used as default.
         *          Of course, users can freely override this class with their own class if the don't like it.
         * @type {string[]|Array}
         * @private
         */
        this._specialWords = _specialWords || [];
        this._specialClasses = _specialClasses || [];

        /**
         * If one of the special words shows up more than once within the content,
         *   true to make all of them specialized, false to just decorate the first one.
         * @type {boolean}
         * @private
         */
        this._iterable = _iterable;
    }

    public get content(): string {
        return this._content;
    }
    public get specialWords(): string[] {
        return this._specialWords;
    }
    public get specialClasses(): string[] {
        return this._specialClasses;
    }
    public get iterable(): boolean {
        return this._iterable;
    }

    public set content( content: string ) {
        this._content = content;
    }

    public set specialWords(specialWords: string[]) {
        this._specialWords = specialWords;
    }

    public set specialClasses(specialClasses: string[]) {
        this._specialClasses = specialClasses;
    }

    public set iterable(iterable: boolean) {
        this._iterable = iterable;
    }

    public setSpecialWord(specialWord: string): void{
        if (this.specialWords.indexOf(specialWord) === -1){
            this.specialWords.push(specialWord);
        }
    }

    public setSpecialClass(specialClass: string): void{
        if (this.specialClasses.indexOf(specialClass) === -1){
            this.specialClasses.push(specialClass);
        }
    }
}