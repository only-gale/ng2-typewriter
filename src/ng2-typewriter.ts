import { NgModule } from '@angular/core';
import { TypewriterDirective } from "./typewriter.directive";
import { CursorComponent } from "./cursor/cursor.component";
import { TypewriterComponent } from "./typewriter.component";

export * from "./typewriter.content";
export * from "./typewriter.service";

@NgModule({
    declarations: [
        TypewriterDirective,
        TypewriterComponent,
        CursorComponent
    ],
    exports: [
        TypewriterDirective,
        TypewriterComponent,
        CursorComponent
    ]
})

export class TypewriterModule {

}