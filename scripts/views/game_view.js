(function() {
	var background, nexus;
	var nexusHealthBar;
	var health = 100;

	var minions = [];

	var ironback, kraken, ocklepod, plundercrab, razorfin;

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
		ironback = this.resources.getResult("ironback");
		kraken = this.resources.getResult("kracken");
		ocklepod = this.resources.getResult("ocklepod");
		plundercrab = this.resources.getResult("plundercrab");

		background = new createjs.Bitmap(this.resources.getResult("game-bg"));
		background.sourceRect = new createjs.Rectangle(0, 265, this.width, this.height);

		nexus = new createjs.Bitmap(this.resources.getResult("nexus"));
		nexus.x = this.width - 140;
		nexus.y = this.height - 370;

		nexusHealthBar = new Bar(80, 15, 2, "red", "black");
		nexusHealthBar.update(health/100);

		nexusHealthBar.x = this.width - 110;
		nexusHealthBar.y = this.height - 370 - nexusHealthBar.height;

		this.addChild(background, nexus, nexusHealthBar);
	}

	p.update = function() {
		console.log("update");

		if(health > 0) {
			health--;

			nexusHealthBar.update(health/100);
		}
	}

	window.GameView = createjs.promote(GameView, "Container");
}());