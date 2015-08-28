// Core Variables
var canvas;
var stage;
var centerX, centerY;

// Views
var LoadingView, TitleView, GameView;

function init() {
	canvas = document.getElementById("canvas"); // Dimensions 900 x 500

	centerX = canvas.width/2;
	centerY = canvas.height/2;

	stage = new createjs.Stage(canvas);

	stage.mouseEventsEnabled = true;

	// Initialize all the views
	LoadingView = new LoadingView(canvas.width, canvas.height);
	TitleView = new TitleView(canvas.width, canvas.height, function(event) {
		stage.removeChild(TitleView);
		stage.addChild(GameView);
		// select a random game and assign the game id variable
	});

	stage.addChild(LoadingView);

	// Loading
	queue = new createjs.LoadQueue(false);
	queue.on("progress", handleProgress, this);
	queue.on("complete", handleComplete, this);

	queue.loadManifest([{id:"kraken", src:"img/kraken.png"},
		{id:"ironback", src:"img/ironback.png"},
		{id:"ocklepod", src:"img/ocklepod.png"},
		{id:"plundercrab", src:"img/plundercrab.png"},
		{id:"razorfin", src:"img/razorfin.png"},

		{id:"game-bg", src:"img/game-bg.png"},
		{id:"nexus", src:"img/nexus.png"}]);

	createjs.Ticker.on("tick", update);
}

function handleProgress(event) {
	LoadingView.handleProgress(event.loaded);
}

function handleComplete(event) {
	createjs.Tween.get(LoadingView)
	.set({alpha:1, visible: true})
	.to({alpha:0, visible:false}, 1000)
	.call(function() {
		stage.removeChild(LoadingView)
		stage.addChild(TitleView);
	});
	
	GameView = new GameView(canvas.width, canvas.height, 0, queue);
}

function update() {
	// run game update loop if the game view is running
	if(stage.getChildIndex(GameView) != -1) {
		GameView.update();
	}
	stage.update();
}

function addGameView() {
	// var kraken = new createjs.Bitmap(coin);
	// var razorfin = new createjs.Bitmap(minion1);
	// var ironback = new createjs.Bitmap(minion2);
	// var ocklepod = new createjs.Bitmap(minion3);
	// var plundercrab = new createjs.Bitmap(minion4);

	// razorfin.x = 64;
	// ironback.x = 64 * 2;
	// ocklepod.x = 64 * 3;
	// plundercrab.x = 64 * 4;

	// GameView.addChild(kraken, razorfin, ironback, ocklepod, plundercrab);
	stage.addChild(GameView);

	stage.update();
}