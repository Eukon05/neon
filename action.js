export const ActionType = Object.freeze({
    FRAME_NEXT : "frame_next",
    FRAME_PREV : "frame_prev",
    FRAME_GOTO : "frame_goto",
    LEVEL_NEXT : "level_next",
    FRAME_GOTO : "frame_goto",
    LEVEL_GOTO : "level_goto",
    ALERT : "alert"
});

export class Action{
    type;
    details;
    constructor(type, details){
        this.type = type;
        this.details = details;
    }

    static fromJSON(json){
        return new Action(ActionType[json.type], json.details);
    }
}