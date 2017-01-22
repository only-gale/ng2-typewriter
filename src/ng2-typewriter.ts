import { NgModule } from '@angular/core';
import { TypewriterDirective } from "./typewriter.directive";
import { TypewriterService } from "./typewriter.service";
import { TypewriterContent } from "./typewriter.content";
import { CursorComponent } from "./cursor/cursor.component";
import { TypewriterComponent } from "./typewriter.component";

@NgModule({
    declarations: [
        TypewriterContent,
        TypewriterDirective,
        TypewriterService,
        TypewriterComponent,
        CursorComponent
    ],
    exports: [
        TypewriterContent,
        TypewriterDirective,
        TypewriterService,
        TypewriterComponent,
        CursorComponent
    ]
})

export class TypewriterModule {

}