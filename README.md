# ng2-typewriter

An implementation of angular typewriter for Angular 2.

>It's been a while from last commitment, thanks for downloading.
But I notice there still several bugs those bring bad experience to you, really sorry for that, **I'll keep working on it**.
Please let me know if you encountered any bugs on the [bug list page](https://github.com/only-gale/ng2-typewriter/issues).

* [Demo](#demo)
* [Installation](#installation)
* [Usage](#usage)
* [Configuration](#configration)
* [API](#api)
* [Styles](#styles)

---
## Demo
Here is a demo in [Plunker](https://plnkr.co/edit/Cr0UlxtZVGam3fGi46HL?p=info) that you can play online.

---
## Installation

First you need to install the npm module:

```sh
npm install ng2-typewriter --save
```


---
## Usage

#### 1. Import the `TypewriterModule`:

Finally, you can use ng2-typewriter in your Angular 2 project. Now you can import the `TypewriterModule`:

```ts
import { TypewriterModule } from "ng2-typewriter";
```

And then you can put the `TypewriterComponent`, which is provided by `TypewriterModule`, to anywhere you wanna create a typewriter:

```html
<typewriter></typewriter>
```

See [Configuration](#configuration) to figure out how to config the typewriter.

#### 2. Use the `TypewriterService`:

Since the typewriter only can read objects of type [TypewriterContent](#typewritercontent), so the [TypewriterService](#typewriterservice) provides a way to translate from `String` to `TypewriterContent`, or from an array of `String` to an array of `TypewriterContent`.

But first, you need make `TypewriterService` available to your components:

```ts
import { TypewriterService, TypewriterContent } from "ng2-typewriter";
```

And then add the `TypewriterService` into your components' `providers`:


---
## Configuration

#### TypewriterComponent

```html
<typewriter [contents]="[]" [erasable]="false" [beforeType]="500" [beforeStart]="0" [afterEnd]="1000" [delay]="0"
[speed]="40" [deletingAcceleration]="5" [deletingTopSpeed]="5" [cursor]="'_'" [cursorDelay]="-1" (afterDone)="yourMethod( $event )">
</typewriter>
```

```ts
content: TypewriterContent[]
```
The typewriter's contents, defaults to `[]`.

```ts
erasable: boolean
```
Whether the typewriter is erasable ot not.

Default to `false`.

If it's true, delete previous item of contents before typing next one out.

```ts
beforeType: number
```
How long will be delayed before the typewriter starts.

Defaults to `500` ms.

```ts
beforeStart: number
```
How long will be delayed before every item of contents being typed out.

Defaults to `0` ms.

```ts
afterEnd: number
```
How long will be delayed after every item of contents is typed out.

Defaults to `1000` ms.

```ts
delay: number
```
How long the typewriter will be stopped in mid-sentence (default punctuations are "," and ";").

Defaults to `0` ms.

```ts
speed: number
```
Typing speed.

Defaults to `100 - Math.random() * 80` ms.

```ts
deletingAcceleration: number
```
The deleting acceleration.

Defaults to `this.speed / 8`.

```ts
deletingTopSpeed: number
```
The deleting top speed. Only works when `this.speed` greater than 0.

Defaults to `this.speed / 4`.

```ts
cursor: string
```
What should be acted as the cursor.

Defaults to `_`.

```ts
cursorDelay: number
```
How long the cursor will be disappeared after all the contents are typed out.

If it <= 0, the cursor won't be disappeared.

Defaults to `-1`.

```ts
afterDone: EventEmitter<boolean>
```

Only used to return the typewriter's end flag when `this.cursorDelay > 0`.


---
## API

#### TypewriterContent

```ts
content: string
```

The content of this TypewriterContent.

If the typewriter is configured as unerasable, then every item in this array will be typed out as an individual line.

```ts
specialWords: string[]
```
```ts
specialClasses: string[]
```

Every word in this array will be surrounded by a span tag char by char, and the corresponding special class will be used.

e.g.:

    content = "One world, one dream.";
    specialWords = ["world", "dream"];
    specialClasses = ["green-world", "red-dream"];
    
    outputs:
    
        One <span class="green-world">w</span>
        <span class="green-world">o</span>
        <span class="green-world">r</span>
        <span class="green-world">l</span>
        <span class="green-world">d</span>, one<span class="red-dream">d</span>
        <span class="red-dream">r</span>
        <span class="red-dream">e</span>
        <span class="red-dream">a</span>
        <span class="red-dream">m</span>.
        
    and if the special-class-2 is omitted, the first class of specialClasses will be used as default;
    
    and if all the special classes are omitted, which means specialClasses = [],
    
    then the default class named "special-typewriter" will be used as default.
    
    Of course, users can freely override this class with their own class if the don't like it.


```ts
iterable: boolean
```

If one of the special words shows up more than once within the content, `true` to make all of them specialized, `false` to just decorate the first one.

```ts
setSpecialWord(specialWord: string): void
```

Push the specialWord into `this.specialWords` only if it's not included.

```ts
setSpecialClass(specialClass: string): void
```

Push the specialClass into `this.specialClasses` only if it's not included.

#### TypewriterService

```ts
public format( contents: string[] ): TypewriterContent[]
```

Translate from an array of strings to an array of TypewriterContents.


---
## Styles

>All classes below can be overridden by you. For example, using `/deep/`.


####.wrap

Marked on a span element to wrap the actual content of the typewriter.

####.cursor

Marked on a span element to wrap the cursor.

####.special-typewriter

Marked on a span element to wrap the special word char by char.
