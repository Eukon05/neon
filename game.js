import { Level } from "./level.js";

export class Game{
    currentFrame;
    currentLevel;
    functionMap;

    static async init(levelURL, functionMap){
        console.log("NEON: Initializing game");
        let game = new Game();
        game.functionMap = functionMap;
        game.currentLevel = await game.readLevel(levelURL);

        game.currentFrame = 0;
        return game;
    }

    async readLevel(levelURL){
        console.log("NEON: Loading level: " + levelURL);
        const resp = await fetch(levelURL).then(response => response.json());
        return Level.fromJSON(resp);
    }
}