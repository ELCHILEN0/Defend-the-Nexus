(function() {

	function Button(width, height, text, color) {
		this.Container_constructor();

		this.width = width;
		this.height = height;

		this.text = text;
		this.color = color;

		this.setup();
	}
	
	var p = createjs.extend(Button, createjs.Container);

	p.setup = function() {
		var text = new createjs.Text(this.label, this.font, this.textColor);
		this.text.textBaseline = "middle";
		this.text.textAlign = "center";

		this.text.x = this.width / 2;
		this.text.y = this.height / 2;

		var background = new createjs.Shape();
		background.graphics.beginFill(this.color).drawRoundRect(0, 0, this.width, this.height, 10);

		this.addChild(background, this.text); 
	}

	window.Button = createjs.promote(Button, "Container");
}());