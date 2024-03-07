import { Clickable } from './clickable.js';
import { Action } from './action.js';

export class Frame{
    bg;
    bgm;
    text;
    mainAction;
    clickables;

    constructor(bg, bgm, text, mainAction, clickables){
        this.bg = bg;
        this.bgm = bgm;
        this.text = text;
        this.mainAction = mainAction;
        this.clickables = clickables;
    }

    static fromJSON(json){
        return new Frame(json.bg, json.bgm, json.text, Action[json.mainAction], json.clickables.map(Clickable.fromJSON));
    }
}
