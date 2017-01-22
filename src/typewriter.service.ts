/**
 * Created by gale on 17-1-22.
 */
import { Injectable } from "@angular/core";
import { TypewriterContent } from "./typewriter.content";

@Injectable()
export class TypewriterService {
    constructor() {}

    /**
     * Format an array of strings to an array of TypewriterContents.
     * @param contents
     * @returns {TypewriterContent[]}
     */
    public format( contents: string[] ): TypewriterContent[] {
        return contents.map(( v: string ) => {
            return new TypewriterContent(v);
        });
    }
}