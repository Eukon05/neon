import { Action } from "./action.js";
import { Choice } from "./choice.js";

export class Dialogue{
    speaker;
    sprite;
    text;
    action;
    speakerPos;
    choices;

    constructor(speaker, sprite, text, action, speakerPos, choices){
        this.speaker = speaker;
        this.sprite = sprite;
        this.text = text;
        this.action = action;
        this.speakerPos = speakerPos;
        this.choices = choices;
    }

    static fromJSON(json){
        if(json == undefined || json == null)
            return null;

        let choices;
        if(json.choices == undefined || json.choices == undefined || json.choices.length == 0)
            choices = null;
        else
            choices = json.choices.map(Choice.fromJSON);

        return new Dialogue(json.speaker, json.sprite, json.text, Action.fromJSON(json.action), json.speakerPos, choices);
    }
}