(function() {
	function GameView(width, height, gameId) {
		this.Container_constructor();

		this.width = width;
		this.height = height;
		this.gameId = gameId; // set default game id
		this.resources = null;

		this.setup();
	}
	var p = createjs.extend(GameView, createjs.Container);


	p.setup = function() {
		console.log("gameView");
	}

	p.update = function() {
		console.log("update");
	}

	window.GameView = createjs.promote(GameView, "Container");
}());