define("Breakout", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Breakout extends Phaser.Game {
        constructor() {
            super();
        }
    }
    exports.Breakout = Breakout;
});
//version 1.3.1
//author: Heyang Li
//version 1.4.1 will refine code and make it more reuseble
//initialize variables
var paddle;
var brick_green;
var brick_red;
var brick_yellow;
var ball;
var onPaddle = true;
var scoreText;
var livesText;
var countText;
var startText;
var lives = 3;
var score = 0;
var restartText;
var winText;
//main state
var mainState = {
    //preload the assets
    preload: function () {
        this.load.image('background', 'assets/image/background.png');
        this.load.image('paddle', 'assets/image/paddle.png');
        this.load.image('bricks_green', 'assets/image/bricks_green.png');
        this.load.image('bricks_red', 'assets/image/bricks_red.png');
        this.load.image('bricks_yellow', 'assets/image/bricks_yellow.png');
        this.load.spritesheet('ball', 'assets/image/ball.png', 17, 17, 6);
        this.load.audio('background_music', ['assets/audio/background.ogg', 'assets/audio/background.mp3', 'assets/audio/background.wav']);
        this.load.audio('hit_brick', ['assets/audio/hit_brick.ogg', 'assets/audio/hit_brick.wav']);
        this.load.audio('lose_live', ['assets/audio/lose_live.ogg', 'assets/audio/lose_live.wav']);
    },
    //create the game
    create: function () {
        //set up scale options
        this.scaleOptions();
        //set up background and background music
        this.background_setup();
        //apply for Arcade physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //enable all physics
        game.world.enableBody = true;
        //call inputControl function
        this.inputControl();
        //add paddle
        this.addPaddle();
        //add bricks
        this.addBricks();
        //add ball and ball's animation
        this.addBall();
        //adding text when start, or restart the game
        scoreText = game.add.text(32, 550, 'score: 0', { font: "20px Arial", fill: "#ffffff", align: "left" });
        livesText = game.add.text(680, 550, 'lives: 3', { font: "20px Arial", fill: "#ffffff", align: "left" });
        countText = game.add.text(330, 550, 'bricks: 25', { font: "20px Arial", fill: "#ffffff", align: "left" });
        startText = game.add.text(game.world.centerX, 400, 'click to start', { font: "40px Arial", fill: "#ffffff", align: "center" });
        startText.anchor.setTo(0.5, 0.5);
        restartText = game.add.text(game.world.centerX, 500, '', { font: "40px Arial", fill: "#ffffff", align: "center" });
        restartText.anchor.setTo(0.5, 0.5);
    },
    //update game
    update: function () {
        //set movement speed
        if (this.left.isDown) {
            this.paddle.body.velocity.x = -200;
        }
        else if (this.right.isDown) {
            this.paddle.body.velocity.x = 200;
        }
        else {
            this.paddle.body.velocity.x = 0;
        }
        //spacekey is down
        if (this.spaceKey.isDown) {
            this.releaseBall();
        }
        //Add collisions between paddle and ball
        if (onPaddle) {
            this.ball.body.x = this.paddle.x + 40;
        }
        else {
            game.physics.arcade.collide(this.paddle, this.ball);
        }
        //when ball hit bricks
        game.physics.arcade.collide(this.ball, this.bricks_green, this.hit_green, null, this);
        game.physics.arcade.collide(this.ball, this.bricks_red, this.hit_red, null, this);
        game.physics.arcade.collide(this.ball, this.bricks_yellow, this.hit_yellow, null, this);
        //live will reduce by one if the ball is below the paddle
        if (this.ball.y - 20 > this.paddle.y) {
            this.ballBelowPaddle();
        }
        //win condition
        if (this.bricks_green.countLiving() +
            this.bricks_red.countLiving() +
            this.bricks_yellow.countLiving() == 0) {
            winText = game.add.text(game.world.centerX - 50, game.world.centerY, ' YOU WIN ', { font: "40px Arial", fill: "#ffffff", align: "center" });
            this.ball.destroy();
            this.paddle.destroy();
        }
        //bricks count
        countText.text = 'bricks: ' +
            (this.bricks_green.countLiving() +
                this.bricks_red.countLiving() +
                this.bricks_yellow.countLiving());
    },
    scaleOptions: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //have the game centered horizontally
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    },
    background_setup: function () {
        //Set the background image
        this.background = this.game.add.sprite(0, 0, 'background');
        //set background music and loop = true
        this.bmg = this.game.add.audio('background_music');
        this.bmg.loop = true;
    },
    inputControl: function () {
        //input control
        this.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },
    addPaddle: function () {
        //Add paddle and position in the middle of the screen
        this.paddle = game.add.sprite(game.world.centerX, 500, 'paddle');
        //when ball and paddle collision paddle won't move
        this.paddle.body.immovable = true;
    },
    addBall: function () {
        //Add ball and position on top of the paddle
        this.ball = game.add.sprite(game.world.centerX, 480, 'ball');
        this.ball.animations.add('spin', [0, 1, 2, 3, 4, 5], 1, true);
        this.ball.animations.play('spin');
        //ball will bounce when collision
        this.ball.body.bounce.setTo(1);
        this.ball.body.collideWorldBounds = true;
    },
    addBricks: function () {
        //set bricks group
        this.bricks_green = game.add.group();
        this.bricks_red = game.add.group();
        this.bricks_yellow = game.add.group();
        //add 20 green bricks in the game
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 4; j++) {
                brick_green = game.add.sprite(100 + i * 130, 110 + j * 50, 'bricks_green');
                //bricks dont move when ball hits on them
                brick_green.body.immovable = true;
                // Add the brick to the group
                this.bricks_green.add(brick_green);
            }
        }
        //add 3 red bricks in the game
        for (var i = 1; i < 4; i++) {
            brick_red = game.add.sprite(100 + i * 130, 60, 'bricks_red');
            brick_red.body.immovable = true;
            // Add the brick to the group
            this.bricks_red.add(brick_red);
        }
        //add 5 yellow bricks in the game
        for (var i = 2; i < 3; i++) {
            brick_yellow = game.add.sprite(100 + i * 130, 10, 'bricks_yellow');
            brick_yellow.body.immovable = true;
            // Add the brick to the group
            this.bricks_yellow.add(brick_yellow);
        }
    },
    //when ball hit bricks
    hit_green: function (ball, bricks_green) {
        //destroy brick
        bricks_green.destroy();
        //update scoreText
        score += 10;
        scoreText.text = 'score: ' + score;
        //sound effect
        this.hit_sound = this.game.add.audio('hit_brick');
        this.hit_sound.play();
    },
    hit_red: function (ball, bricks_red) {
        //destroy brick
        bricks_red.destroy();
        //update scoreText
        score += 100;
        scoreText.text = 'score: ' + score;
        //sound effect
        this.hit_sound = this.game.add.audio('hit_brick');
        this.hit_sound.play();
        //random increase/decrease ball's speed
        this.ball.body.velocity.x = Math.random() * 2.5 * this.ball.body.velocity.x;
        this.ball.body.velocity.y = Math.random() * 2.5 * this.ball.body.velocity.y;
    },
    hit_yellow: function (ball, bricks_yellow) {
        //destroy brick
        bricks_yellow.destroy();
        //update scoreText
        score += 1000;
        scoreText.text = 'score: ' + score;
        //sound effect
        this.hit_sound = this.game.add.audio('hit_brick');
        this.hit_sound.play();
        //enlarge paddle
        this.paddle.scale.setTo(2, 1);
    },
    //if ball on the paddle
    releaseBall: function () {
        if (onPaddle) {
            onPaddle = false;
            //setup ball'speed
            this.ball.body.velocity.x = 180;
            this.ball.body.velocity.y = -250;
            //make texts are isvisible
            startText.visible = false;
            restartText.visible = false;
            //play bmg music
            if (!this.bmg.play()) {
                this.bmg.play();
            }
        }
    },
    //if ball below the paddle
    ballBelowPaddle: function () {
        //lives reduce 1 and update livesText
        lives--;
        livesText.text = 'lives: ' + lives;
        //sound effect on lose live
        this.lose_live = this.game.add.audio('lose_live');
        this.lose_live.play();
        this.paddle.scale.setTo(1, 1);
        if (lives === 0) {
            //game over
            this.bricks_green.destroy();
            this.bricks_red.destroy();
            this.bricks_yellow.destroy();
            scoreText.visible = false;
            scoreText = game.add.text(32, 550, 'score: 0', { font: "20px Arial", fill: "#ffffff", align: "left" });
            this.addBricks();
            this.gameOver();
        }
        else {
            //restart
            onPaddle = true;
            this.ball.reset(this.paddle.x, this.paddle.y - 20);
        }
    },
    gameOver: function () {
        this.ball.body.velocity.setTo(0, 0);
        //Game over text will show
        startText.text = 'Game Over!';
        this.bmg.stop();
        //Ask if want to restart
        startText.visible = true;
        restartText.text = 'Click to Start again';
        restartText.visible = true;
        //reset lives and score
        lives = 4;
        score = 0;
    }
};
// Initialize the game and start our state
var game = new Phaser.Game(800, 600, Phaser.AUTO);
game.state.add('main', mainState);
game.state.start('main');
//# sourceMappingURL=index.js.map