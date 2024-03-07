import { Frame } from './frame.js';

export class Level{
    name;
    frames;
    nextLevel

    constructor(name, frames, nextLevel){
        this.name = name;
        this.frames = frames;
        this.nextLevel = nextLevel;
    }

    static fromJSON(json){
        return new Level(json.name, json.frames.map(Frame.fromJSON), json.nextLevel);
    }
}