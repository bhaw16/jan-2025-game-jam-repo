var textArray, textPos = 0, textBox;
var tvChannels, currChannel, channelPos;
var channelOn = false, gameStart = false;
var currBackgroundColor = "#b00b69";

function setup() {
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
    else if (gameStart) {
        cycleText(text2);
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