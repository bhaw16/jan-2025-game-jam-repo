var textArray, textPos = 0, textBox;
var text2;
var tvChannels, currChannel, channelPos;
var channelOn = false, gameStart = false, drumGame = false;
var currBackgroundColor = "#b00b69";
var drums, marker, drumMarker;
var kickSound;

function preload() {
    marker = loadImage("assets/images/beamed-16th-notes.png");
    soundFormats("wav");
    kickSound = loadSound("assets/sound/acoustic-drum-kick.wav");
}

function setup() {
    marker.resize(50, 50);
    createCanvas(700, 700);
    allSprites.rotationLock = true;
    textArray = [
        "Hmmm....I wonder what's on TV today.",
        "Oh...this show. It's not like I have anything better to watch.",
        "Getting sleepy..."
    ];
    text2 = [
        "Wait...what? Am I in the Hollywood Boulevard School of the Arts?",
        "Seth: \"Hey there cutie! I'm Seth! Do you need any help?\"",
        "Uh...I'm good...",
        "Seth:\"Sorry, I'm just really lonely and no one really pays attention to me\nunless it's to laugh at me. I just-\"",
        ""
    ];
    textBox = new Sprite(width - (width / 2), height - (height / 4), width / 2, height / 4);
    textBox.color = "white";
    textBox.text = textArray[textPos];
    tvChannels = [
        "DisKnee Channel", "DisKnee Junior", "Rockola", "Pop TV"
    ];
    do {
        currChannel = random(tvChannels);
    } while (currChannel == "Rockola");
    channelPos = tvChannels.indexOf(currChannel);
    console.log(tvChannels);
    drumMarker = new Sprite(marker, -983, -172, marker.width, marker.height);
    createDrums();
}

function draw() {
    background(currBackgroundColor);
    if (!channelOn)
        text("Use the arrow keys to change the channel to Rockola!", width / 3 - 15, 15);
    if (currBackgroundColor == "#b00b69")
        text(`Channel: ${currChannel}`, width / 2, height / 2);
    channelOn = (currChannel == "Rockola") ? true : false;
    if (gameStart) {
        currBackgroundColor = "gold";
        textBox.text = text2[textPos];
    }
    if (drumGame) {
        currBackgroundColor = "blue";
        textBox.pos = {x: -700, y: -700};
        showDrums();
    }
    for (var i = 0; i < drums.length; i++) {
        if (drums[i].sprite.mouse.released()) {
            drums[i].play();
            console.log("play");
        }
        else {
            drums[i].stop();
            console.log("no play");
        }
    }
}

function keyPressed() {
    if (!channelOn) {
        switch(keyCode) {
            case UP_ARROW:
                currChannel = tvChannels[++channelPos];
                if (channelPos >= tvChannels.length) {
                    channelPos = 0;
                    currChannel = tvChannels[channelPos];
                }
                break;
            case DOWN_ARROW:
                currChannel = tvChannels[--channelPos];
                if (channelPos < 0) {
                    channelPos = tvChannels.length - 1;
                    currChannel = tvChannels[channelPos];
                }
                break;
            default:
                console.log(keyCode);
        }
    }
}

function mousePressed() {
    if (channelOn && !gameStart) {
        cycleText(textArray);
        if (textPos >= textArray.length) {
            gameStart = true;
            textPos = 0;
        }
    }
    else if (gameStart && !drumGame) {
        cycleText(text2);
        if (textPos >= text2.length) {
            drumGame = true;
        }
    }
}

function cycleText(array) {
    if (!Array.isArray(array))
        throw new TypeError();
    try {
        if(textPos + 1 > array.length) {
            throw new RangeError();
        }
        textBox.text = array[++textPos];
    }
    catch(RangeError) {
        console.log("No more text to cycle through.");
    }
    finally {
        if (textPos >= array.length) {
            textBox.text = array[array.length - 1];
        }
    }
}

function createDrums() {
    drums = [
        new Drum(   //ride cymbal
            new Sprite(-800, -800, 150),
            "gold"
        ),
        new Drum(   //hi-hat cymbal
            new Sprite(-900, -900, 130),
            "gold"
        ),
        new Drum(   //crash cymbal
            new Sprite(-134, -134, 130),
            "gold"
        ),
        new Drum(   //floor tom
            new Sprite(-1000, -1000, 140),
            "white"
        ),
        new Drum(   //kick drum
            new Sprite(-1100, -1100, 195, 115),
            //kickSound,
            "gray"
        ),
        new Drum(   //snare drum
            new Sprite(-1200, -100, 110),
            "white"
        ),
        new Drum(   //tom drum 1
            new Sprite(-900, -100, 120),
            "white"
        ),
        new Drum(   //tom drum 2
            new Sprite(-900, -200, 120),
            "white"
        )
    ];
}

function showDrums() {
    drums[4].sprite.pos = {x: width / 2, y: height / 2};
    drums[3].sprite.pos = {x: drums[4].sprite.w + 15, y: drums[4].sprite.y + drums[4].sprite.radius - 20};
    drums[3].sprite.layer = drums[4].sprite.layer + 1;
}