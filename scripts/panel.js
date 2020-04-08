var graphics;

let gameOptions = {
  initialTime: 60
}

class panel extends Phaser.Scene {
    constructor() {
        super('panelScene');
    }
    preload() {
      this.load.image("heatcontainer", "assets/heat_container.png");
      this.load.image("heatbar", "assets/heat_bar_final.png");
      this.load.image("home", "assets/home.png");
      this.load.image("soundon", "assets/soundon.png");
      this.load.image("question", "assets/question.png");
    }
    create() {

      graphics = this.add.graphics();

      graphics.lineStyle(2, 0x000000, 2);
  
      //  32px radius on the corners
      graphics.strokeRoundedRect(1, 1, 798, 70, 0);

      this.add
      .text(250, 25, "Time Left:", {
        font: "18px monospace",
        fill: "#000000",
      })

      this.add
      .text(450, 25, "Location:", {
        font: "18px monospace",
        fill: "#000000",
      })

      this.add.sprite(670, 35, "home");
      this.add.sprite(723, 35, "soundon");
      this.add.sprite(770, 35, "question");
    
      //var text = this.add.text(50,50, 'scene2!');
      let timeLeft = gameOptions.initialTime;

      // the energy container. A simple sprite
      let heatContainer = this.add.sprite(130, 35, "heatcontainer").setScrollFactor(0);

      // the energy bar. Another simple sprite
      let heatBar = this.add.sprite(heatContainer.x + 11, heatContainer.y, "heatbar").setScrollFactor(0);

      // a copy of the energy bar to be used as a mask. Another simple sprite but...
      let heatMask = this.add.sprite(heatBar.x, heatBar.y, "heatbar").setScrollFactor(0);

      // ...it's not visible...
      heatMask.visible = false;

      // and we assign it as energyBar's mask.
      heatBar.mask = new Phaser.Display.Masks.BitmapMask(this, heatMask);

      // a boring timer.
      let gameTimer = this.time.addEvent({
          delay: 1000,
          callback: function(){
              //console.log("lmao");
              timeLeft --;

              // dividing enery bar width by the number of seconds gives us the amount
              // of pixels we need to move the energy bar each second
              let stepWidth = heatMask.displayWidth / gameOptions.initialTime;

              // moving the mask
              
              heatMask.x -= stepWidth;
              //console.log(energyMask.x);
              if(timeLeft == 0){
                //stop somehow lol
              }
          },
          callbackScope: this,
          loop: true
      });
      
    }
    update() {

    }
    

}