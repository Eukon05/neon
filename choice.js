import { Action } from './action.js'

export class Choice{
    text;
    bgColor;
    fontColor;
    action;
    
    constructor(text, bgColor, fontColor, action){
        this.bgColor = bgColor;
        this.fontColor = fontColor;
        this.text = text;
        this.action = action;
    }

    static fromJSON(json){
        if(json == undefined || json == null)
            return null;

        return new Choice(json.text, json.bgColor, json.fontColor, Action.fromJSON(json.action));
    }
}