// Core Variables
var canvas;
var stage;
var centerX, centerY;

var resources = new Object();

var backgroundSound;

// Views
var LoadingView, TitleView, GameView;

function init() {
	canvas = document.getElementById("canvas"); // Dimensions 900 x 500

	centerX = canvas.width/2;
	centerY = canvas.height/2;

	stage = new createjs.Stage(canvas);

	stage.mouseEventsEnabled = true;

	// Initialize views
	LoadingView = new LoadingView(canvas.width, canvas.height);
	TitleView = new TitleView(canvas.width, canvas.height, function(event) {
		createjs.Tween.get(TitleView)
		.set({alpha:1, visible: true})
		.to({alpha:0, visible:false}, 500)
		.call(function() {
			stage.removeChild(TitleView)
		});

		GameView.alpha = 0;
		stage.addChild(GameView);
		createjs.Tween.get(GameView)
		.set({alpha:0, visible: true})
		.to({alpha:1, visible:true}, 1000);
	});

	stage.addChild(LoadingView);

	// Loading
	queue = new createjs.LoadQueue(false);

	createjs.Sound.alternateExtensions = ["mp3"];
	queue.installPlugin(createjs.Sound);

	queue.on("fileload", handleFileLoad, this);
	queue.on("progress", handleProgress, this);
	queue.on("complete", handleComplete, this);

	queue.loadManifest([{id:"kraken", src:"images/kraken.png"},
		{id:"ironback", src:"images/ironback.png"},
		{id:"ocklepod", src:"images/ocklepod.png"},
		{id:"plundercrab", src:"images/plundercrab.png"},
		{id:"razorfin", src:"images/razorfin.png"},

		{id:"game-bg", src:"images/game-bg.png"},
		{id:"ball", src:"images/ball-blue.png"},
		{id:"nexus", src:"images/nexus.png"},

		{id:"br", src:"json/BR.json"},
		{id:"eune", src:"json/EUNE.json"},
		{id:"euw", src:"json/EUW.json"},
		{id:"kr", src:"json/KR.json"},
		{id:"lan", src:"json/LAN.json"},
		{id:"las", src:"json/LAS.json"},
		{id:"na", src:"json/NA.json"},
		{id:"oce", src:"json/OCE.json"},
		{id:"ru", src:"json/RU.json"},
		{id:"tr", src:"json/TR.json"},

		{id:"bit-rush", src:"sound/bit_rush.mp3"}]);

	createjs.Ticker.on("tick", update);
}

function handleFileLoad(event) {
	resources[event.item.id] = event.result;
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

	createjs.Sound.play("bit-rush", {loop:-1});
	GameView = new GameView(canvas.width, canvas.height, resources);
}

function update() {
	// run game update loop if the game view is running
	if(stage.getChildIndex(GameView) != -1) {
		GameView.update();
	}
	stage.update();
}