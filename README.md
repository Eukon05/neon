# NEON - A JSON based visual-novel engine
This project is meant to teach me about the basics of HTML, CSS and most importantly JavaScript.  
Please don't take it too seriously 😅

## What is NEON?
NEON is a visual-novel game engine written in JS, that utilises JSON as a way to store level data. It allows for easy implementation of custom logic handlers by accepting a map of custom functions and their names upon startup.  
It acts like a library and its core is disconnected from the renderer, allowing it to be easily modified to suit every project's needs.

## Why JavaScript?
I wanted to make this project as fast as possible as a proof-of-concept, and HTML+JS provided me with a graphics renderer, json parser and a sound player out of the box.  
Trying to implement an idea this simple in C++ would take a lot of time, I don't really like Python's syntax, and Java would be an overkill when it comes to memory usage.  
Plus, I've never really used JS outside of simple Chrome extensions, and I wanted to learn how to use it for a long time now :)

## Directory structure required to run the engine
- [root of the project]
    - bg
        - your backgrounds here
    - bgm
        - background music here
    - sfx
        - sound effects here
    - sprites
        - character sprites here
    - levels
        - level JSON files

These files can be in any media format supported by JS.

## Level file structure
Each level file is composed of a name, a list of "frames" it consists of, and a filename of a level that's supposed to be automatically started when the player goes through all of the frames.

```json
{
    "name" : "Example Level",
    "nextLevel" : "level2",
    "frames" : [
        // A list of "frame" objects
    ]
}
```

Frames contain various elements, defining their look, soundtrack, interactable elements and dialogue that's displayed when the frame is loaded.

Some properties of a frame can be set to null or skipped completely, telling the engine to either use properties of a previously loaded frame, or don't pay attention to the property alltogether.

**Frame:**
```json
{
    "bg" : "backgroundOne.png", // When null or undefined, background from the previous frame is used.
    "bgm" : "soundtrackOne.ogg", // When null of undefined, pauses the bgm. When set to "CONTINUE", resumes the previous track.
    "sfx" : "damageDealtSoundEffect.ogg", // When null or undefined, no SFX is played.
    "dialogue" : {
        //some dialogue object.
        // When null of undefined, no dialogue will be displayed when the frame is loaded.
    },
    "gridDivisor" : 100, // This property defines how big the grid of clickable elements will be, by dividing the background image's width and height by this value. When null or undefined, no grid will be created.
    "clickables" : [
        // Clickable objects here.
        // When null or undefined, nothing will be interactable in this frame.
        // Requires "gridDivisor" to be set, otherwise it will be ignored.
    ]
}
```

Now we will get into more detail about "dialogue" objects:

**Dialogue:**
```json
{
    "speaker" : "Narrator", // When null or undefined, no speaker name will be shown
    "sprite" : "narrator.png", // When null or undefined, no sprite will be shown
    "speakerPos" : 1, // 0 - center, 1 - left, 2 - right. When null or undefined, center.
    "text" : "Hello there!", // When null or undefined, no text will be shown
    "choices" : [
        // List of choice objects. When null or undefined, none will be shown
    ],
    "action" : {
        // An action object tied to the dialogue and not a specific choice.
        // When null or undefined, the button to execute the action will not be shown
    }
}
```

**Choice:**
```json
{
    "text" : "What's up?", // Text to be shown on a choice button. When null of undefined, the choice will not be shown
    "bgColor" : "#03a1fc", // Color of the choice button. When null of undefined, a default one will be used
    "fontColor" : "white", // Color of the choice text. When null of undefined, a default one will be used
    "action" : {
        // An action object
    }
}
```

**Action:**
```json
{
    "type" : "FRAME_GOTO", // Name of the function to invoke
    "details" : {
        // Details passed to the function
        "frame" : 12 
    }
}
```

**Clickable**
```json
{
    "action" : {
        // An action object
    },
    "coords" : [[1, 2], [0, 2], [2,2]] // [X, Y] Coordinates of the clickable object in a grid.
    // Multiple coordinates are allowed, to easily place the same logic on multiple "tiles" of the grid
}
```

With all of that out of the way, let's take a look at a complete level.json file:

## Example level.json
```json
{
    "name" : "Test Level",
    "nextLevel" : "level2",

    "frames" : [
        {
            "bg" : "background.png",
            "bmg" : "music.mp3",
            "sfx" : "soundeffect.ogg",
            "gridDivisor" : null,
            "dialogue" : {
                "speaker" : "Narrator",
                "speakerPos" : 2,
                "sprite" : "narrator.webp",
                "text" : "Hiya. Welcome to NEON",
                "action" : {
                    "type" : "FRAME_NEXT",
                    "details" : {}
                }
            },
            "clickables" : []
        },

        {
            "bg" : "next.png",
            "bmg" : null,
            "sfx" : null,
            "gridDivisor" : 50,
            "dialogue" : null,
            "clickables" : [
                {
                    "coords": [[1, 2], [0, 2], [2,2]],
                    "action" : {
                        "type" : "ALERT",
                        "details" : {
                            "alertText" : "A shiny mirror."
                        }
                    }
                },
                {
                    "coords": [[6, 3]],
                    "action" : {
                        "type" : "LEVEL_NEXT",
                        "details" : {}
                    }
                },
                {
                    "coords": [[15, 3], [14, 3]],
                    "action" : {
                        "type" : "ALERT",
                        "details" : {
                            "alertText" : "A dark passage. You can't see where it ends."
                        }
                    }
                }
            ]
        }
    ]
}
```

## Bundled logic functions
The engine comes with a set of built-in logic functions, that allow for making simple projects.  
Here I present their names in the `level.json` compatible format:

- FRAME_NEXT (moves the player to the next frame)
- FRAME_GOTO (moved the player to a frame specified in the details)
- LEVEL_NEXT (changes the level to the next one)
- SHOW_DIALOGUE (shows a dialogue specified in the details)
- CLEAR_DIALOGUE (closes the currently visible dialogue)
- ALERT (displays a browser alert with a text specified in the details)

Each of this functions resides in the `Logic.js` file and is required to be passed to the `Game` object in a function map, just like every custom function has to.