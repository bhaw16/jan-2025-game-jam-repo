var textArray, textPos = 0, textBox;
var tvChannels, currChannel, channelPos;
var channelOn = false;

function setup() {
    createCanvas(700, 700);
    allSprites.rotationLock = true;
    textArray = [
        "Hmmm....I wonder what's on TV today.",
        "Oh...this show. It's not like I have anything better to watch.",
        "Getting sleepy..."
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
    background("#b00b69");
    text("Use the arrow keys to change the channel to Rockola!", width / 3 - 15, 15);
    text(`Channel: ${currChannel}`, width / 2, height / 2);
    channelOn = (currChannel == "Rockola") ? true : false;
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
    if (channelOn) {
        try {
            if(textPos + 1 > textArray.length) {
                throw new RangeError();
            }
            textBox.text = textArray[++textPos];
        }
        catch(RangeError) {
            console.log("No more text to cycle through.");
        }
        finally {
            if (textPos >= textArray.length) {
                textBox.text = textArray[textArray.length - 1];
            }
        }
    }
}