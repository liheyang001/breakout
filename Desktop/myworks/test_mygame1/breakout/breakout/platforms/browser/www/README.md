# README #

## Instructions ##

Read the entire readme before doing anything else!

### Breakout ###
We are going old school and want to test your skills at creating a Breakout game.  There are a number of breakout style games available on the internet for you to test out.

### Functional Requirements ###
1. The ball should rebound off the sides, top of the game board and off the paddle. 
2. If the ball falls off the bottom of the board the game is over or a life is lost.
3. The game should be re-playable without refreshing the page.
4. Needs to be playable on a mobile browser, and scale to fit the screen size.

### What we're looking for ###
* The process you used to complete this test
* Good use of version control - try to make commits as you go
* Prudent use of Object Orientated design
* Code reusability
* Extensibility and maintainability of the software
* Your creativity in making the game fun

### Deliverables ###
* Code should be committed to a git repository hosted on [bitbucket.org](https://bitbucket.org)

### Extra Credit ###
* Can be played in both orientations; landscape and portrait
* Any extra features you want to include in the game

## Technology ##
In this repository we have provided a basic project setup for you to use. It includes the following key pieces:

* **Nodejs** with **npm** for running the build commands and managing dependencies
* **Typescript** as the development language
* **Phaser** as the game engine

### Notes ###
* This test uses Phaser version `2.6.2`. If you are looking at tutorials or examples, please make sure they are for the right version; most material from version 2.x.x will work fine, but version 3 is significantly different
* Some IDEs ship with their own version of Typescript, make sure you are using version `3.2.2`

## How do I get set up? ##

* [Fork](../../fork) this repository to your bitbucket account, then clone it to your local machine
* Install [nodejs](https://nodejs.org/en/download/)

Open a shell/command prompt in the repository root and run the following:

* Install dependencies
```
npm install
```
* Build project
```
npm run build
```
* Start hosting local webserver
```
npm start
```

Visit [localhost:8080/output/](http://localhost:8080/output/) in your browser to view the output.

Leave the webserver running while you develop so you can test your changes. Rerun the build command to build, then hard-refresh the browser window.

## Next Steps ##
After you have finished your submission, make sure the reviewers have read access to your repository. Our developers will review your submission and then invite you in for a discussion.

### Time Cap ###
This test may take you some time, especially if you're unfamiliar with TypeScript and Phaser. Please, do not spend more than 6 hours on this task, even if you don't finish - we can discuss what you do manage to complete.