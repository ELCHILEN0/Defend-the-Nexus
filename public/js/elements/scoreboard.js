(function() {

	function Scoreboard(score, image) {
		this.Container_constructor();

		this.score = score;
		this.image = image;

		this.text = new createjs.Text("0", "44px Arial", "black");

		this.setup();
	}
	
	var p = createjs.extend(Scoreboard, createjs.Container);

	p.setup = function() {
		var kraken = new createjs.Bitmap(this.image);

		this.text.textBaseline = "middle";
		this.text.textAlign = "left";

		this.text.x = 64;
		this.text.y = 32;

		this.addChild(kraken, this.text); 
	}

	p.update = function(score) {
		this.score = score;
		this.text.text = score;
	}

	window.Scoreboard = createjs.promote(Scoreboard, "Container");
}());