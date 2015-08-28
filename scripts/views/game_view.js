(function() {
	var background;

	function GameView(width, height, gameId, resources) {
		this.Container_constructor();

		this.width = width;
		this.height = height;
		this.gameId = gameId; // set default game id
		this.resources = resources;

		this.setup();
	}
	var p = createjs.extend(GameView, createjs.Container);


	p.setup = function() {
		console.log("gameView");
		if(background == null) {
			background = new createjs.Bitmap(this.resources.getResult("game-bg"));
			background.sourceRect = new createjs.Rectangle(0, 265, this.width, this.height);

			console.log(background);
			this.addChild(background);
		}
	}

	p.update = function() {
		if(background == null) {
			background = new createjs.Bitmap(this.resources.getResult("game-bg"));
			this.addChild(background.sourceRect);
		}
		console.log("update");
	}

	window.GameView = createjs.promote(GameView, "Container");
}());