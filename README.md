# NEON - A JSON based visual-novel engine
This project is meant to teach me about the basics of HTML, CSS and most importantly JavaScript.  
Please don't take it too seriously ;)

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