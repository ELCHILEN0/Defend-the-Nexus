(function() {
	var bar, outline;

	function Bar(width, height, padding, fillColor, frameColor) {
		this.Container_constructor();

		this.width = width;
		this.height = height;
		this.padding = padding;
		this.fillColor = fillColor;
		this.frameColor = frameColor;

		this.setup();
	}

	var p = createjs.extend(Bar, createjs.Container)

	p.setup = function() {
		bar = new createjs.Shape();
		outline = new createjs.Shape();

		bar.graphics.beginFill(this.fillColor).drawRect(0, 0, 1, this.height);
		outline.graphics.beginStroke(this.frameColor).drawRect(-this.padding, -this.padding, this.width + (2 * this.padding), this.height + (2 * this.padding));

		this.addChild(bar, outline);
	}

	p.update = function(progress) {
		bar.scaleX = progress * this.width;
	}

	window.Bar = createjs.promote(Bar, "Container");
}());