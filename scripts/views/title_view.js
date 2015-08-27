(function() {
	function TitleView(width, height, onClickFindGame) {
		this.Container_constructor();

		this.width = width;
		this.height = height;
		this.onClickFindGame = onClickFindGame;

		this.setup();
	}
	var p = createjs.extend(TitleView, createjs.Container);


	p.setup = function() {
		title = new createjs.Text("Defend the Nexus", "50px Arial", "#33FF00");
		desc = new createjs.Text("by ELCHILEN096", "20px Arial", "#ffffff");
		findGameButton = new Button(130, 45, new createjs.Text("Find Game", "20px Arial", "#000"), "#ffffff");

		title.textAlign = "center";
		desc.textAlign = "center";

		title.x = this.width/2;
		desc.x = this.width/2;
		findGameButton.x =  this.width/2 - findGameButton.width/2;

		title.y = centerY - 200;
		desc.y = centerY - 150;
		findGameButton.y = centerY;

		findGameButton.on("click", this.onClickFindGame);

		this.addChild(title, desc, findGameButton);

		this.alpha = 0;
		createjs.Tween.get(this)
		.set({alpha: 0, visible: false})
		.to({alpha: 1, visible: true}, 1000);
	}

	window.TitleView = createjs.promote(TitleView, "Container");
}());