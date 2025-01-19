class Drum {
    constructor(sprite, /*sound,*/ color) {
        if ((!(sprite instanceof Sprite))/*(!(sound instanceof p5.SoundFile))*/)
            throw new TypeError();
        this.sprite = sprite;
        //this.sound = sound;
        this.sprite.color = color;
        this.color = color;
    }

    play() {
        //this.sound.play();
        this.sprite.color = "black";
    }

    stop() {
        //this.sound.stop();
        this.sprite.color = this.color;
    }
}