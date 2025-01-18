var textArray, textPos = 0;
var textBox;

function setup() {
    createCanvas(700, 700);
    textArray = [
        "Hmmm....I wonder what's on TV today.",
        "Oh...this show. It's not like I have anything better to watch.",
        "Getting sleepy..."
    ];
    textBox = new Sprite(width - (width / 2), height - (height / 4), width / 2, height / 4);
    textBox.color = "white";
    textBox.text = textArray[textPos];
}

function draw() {
    background("#b00b69");
}

function mousePressed() {
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
        if (textPos >= textArray.length)
            textBox.text = textArray[textArray.length - 1];
    }
}