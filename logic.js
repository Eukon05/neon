/*
These are logic functions included in the engine by default.
Because of the way I handled executing these, they all take a renderer instance as a "this" parameter, and your custom functions will do the same.
Unfortunately, they don't have access to the "game" object bound to a renderer instance, so it has to be passed as a parameter.
Also, every function invoked by the renderer HAS TO accept a "game" parameter and a "details" parameter, even if it's unused.
Keep all of this in mind while designing your own logic functions.
*/

import { Dialogue } from "./dialogue.js";

export function frameNext(game, details){
    if(game.currentFrame >= game.currentLevel.frames.length - 1){
        console.log("NEON: End of level");
        levelNext.bind(this, game, null)();
        return;
    }
    game.currentFrame++;
    this.render(game.currentLevel.frames[game.currentFrame]);
}

export function frameGoto(game, details){
    let targetFrame = details.frame;
    if(targetFrame < 0 || targetFrame >= game.currentLevel.frames.length){
        console.log("NEON: Invalid frame number");
        alert("Invalid frame number");
        return;
    }
    game.currentFrame = targetFrame;
    this.render(game.currentLevel.frames[targetFrame]);
}

export async function levelNext(game, details){
    let nextLevel = game.currentLevel.nextLevel;

    if(nextLevel === null){
        console.log("NEON: No more levels to load!");
        alert("No more levels to load!");
        return;
    }

    game.currentLevel = await game.readLevel("levels/" + nextLevel + ".json");
    game.currentFrame = 0;
    this.render(game.currentLevel.frames[game.currentFrame]);
}

export function showAlert(game, details){
    alert(details.alertText);
}

export function showDialogue(game, details){
    this.prepareDialogue(Dialogue.fromJSON(details.dialogue));
}

export function clearDialogue(game, details){
    this.clearDialogue();
}