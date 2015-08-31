// Core Variables
var canvas;
var stage;
var centerX, centerY;

var resources = new Object();

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

		{id:"match-ids-br", src:"json/BR.json"},
		{id:"match-ids-eune", src:"json/EUNE.json"},
		{id:"match-ids-euw", src:"json/EUW.json"},
		{id:"match-ids-kr", src:"json/KR.json"},
		{id:"match-ids-lan", src:"json/LAN.json"},
		{id:"match-ids-las", src:"json/LAS.json"},
		{id:"match-ids-na", src:"json/NA.json"},
		{id:"match-ids-oce", src:"json/OCE.json"},
		{id:"match-ids-ru", src:"json/RU.json"},
		{id:"match-ids-tr", src:"json/TR.json"}]);

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
	
	GameView = new GameView(canvas.width, canvas.height, resources);
}

function update() {
	// run game update loop if the game view is running
	if(stage.getChildIndex(GameView) != -1) {
		GameView.update();
	}
	stage.update();
}