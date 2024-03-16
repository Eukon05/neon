import { Action } from "./action.js";

export class Dialogue{
    speaker;
    sprite;
    text;
    action;

    constructor(speaker, sprite, text, action){
        this.speaker = speaker;
        this.sprite = sprite;
        this.text = text;
        this.action = action
    }

    static fromJSON(json){
        if(json == undefined || json == null)
            return null;
        return new Dialogue(json.speaker, json.sprite, json.text, Action.fromJSON(json.action));
    }
}