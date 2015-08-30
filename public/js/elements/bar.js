(function() {
	function Bar(width, height, padding, fillColor, frameColor) {
		this.Container_constructor();

		this.width = width;
		this.height = height;
		this.padding = padding;
		this.fillColor = fillColor;
		this.frameColor = frameColor;

		this.bar = new createjs.Shape()
		this.outline = new createjs.Shape();

		this.setup();
	}

	var p = createjs.extend(Bar, createjs.Container)

	p.setup = function() {
		this.bar.graphics.beginFill(this.fillColor).drawRect(0, 0, 1, this.height).endFill();
		this.outline.graphics.beginStroke(this.frameColor).drawRect(-this.padding, -this.padding, this.width + (2 * this.padding), this.height + (2 * this.padding));

		this.addChild(this.bar, this.outline);
	}

	p.update = function(progress) {
		this.bar.scaleX = progress * this.width;
	}

	window.Bar = createjs.promote(Bar, "Container");
}());