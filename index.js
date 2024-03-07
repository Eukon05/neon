import { Action } from "./action.js";
import { Game } from "./game.js";
import { Renderer } from "./renderer.js";

let game = null;
let renderer = null;

async function main(){
    renderer = new Renderer();

    let fMap = {
        [Action.FRAME_NEXT]: frameNext,
        [Action.LEVEL_NEXT]: levelNext
    };

    document.getElementById("game").style.visibility = "visible";
    document.getElementById("start").remove();

    console.log("NEON: Welcome to NEON V0.0.1a");

    game = await Game.init("levels/level.json", fMap);
    renderer.render(game.currentLevel.frames[game.currentFrame]);
    console.log("NEON: Engine started!");
}

function frameNext(){
    if(game.currentFrame >= game.currentLevel.frames.length - 1){
        console.log("NEON: End of level");
        levelNext();
        return;
    }
    game.currentFrame++;
    renderer.render(game.currentLevel.frames[game.currentFrame]);
}

async function levelNext(){
    let nextLevel = game.currentLevel.nextLevel;

    if(nextLevel === null){
        console.log("NEON: No more levels to load!");
        alert("No more levels to load!");
        return;
    }

    game.currentLevel = await game.readLevel("levels/" + nextLevel + ".json");
    game.currentFrame = 0;
    renderer.render(game.currentLevel.frames[game.currentFrame]);
}

function nextButton(){
    let exe = game.currentLevel.frames[game.currentFrame].mainAction;
    game.functionMap[exe]();
}

document.getElementById('start').addEventListener('click', main);
document.getElementById('next').addEventListener('click', nextButton);