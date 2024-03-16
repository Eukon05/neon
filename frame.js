import { Clickable } from './clickable.js';
import { Action } from './action.js';
import { Dialogue } from './dialogue.js';

export class Frame{
    bg;
    bgm;
    sfx;
    dialogue
    clickables;
    gridDivisor;

    constructor(bg, bgm, sfx, dialogue, clickables, gridDivisor){
        this.bg = bg;
        this.bgm = bgm;
        this.sfx = sfx;
        this.dialogue = dialogue;
        this.clickables = clickables;
        this.gridDivisor = gridDivisor;
    }

    static fromJSON(json){
        if(json == undefined || json == null)
            return null;

        let clickables;
        if(json.clickables == undefined || json.clickables == undefined || json.clickables.length == 0)
            clickables = null;
        else
            clickables = json.clickables.map(Clickable.fromJSON);
        
        return new Frame(json.bg, json.bgm, json.sfx, Dialogue.fromJSON(json.dialogue), clickables, json.gridDivisor);
    }
}
