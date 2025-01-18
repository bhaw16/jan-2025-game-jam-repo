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
    text2 = ["Wait...what?"];
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
        textBox.text = text2[0];
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
    /*if (textPos >= textArray.length)
        gameStart = true;*/
    if (channelOn) {
        cycleText(textArray, textPos);
    }
    /*else if (gameStart) {
        textPos = 0;
        cycleText(text2, textPos);
    }*/
}

function cycleText(array, index) {
    if (!Array.isArray(array) || typeof(index) != "number") {
        throw new TypeError();
    }
    else {
        try {
            if(index + 1 > array.length) {
                throw new RangeError();
            }
            textBox.text = array[++index];
        }
        catch(RangeError) {
            console.log("No more text to cycle through.");
        }
        finally {
            if (index >= array.length) {
                textBox.text = array[array.length - 1];
            }
            console.log(index);
        }
    }
}