(function() {
	function Projectile(deltaX, deltaY, image) {
		this.Container_constructor();

		this.deltaX = deltaX;
		this.deltaY = deltaY;
		this.image = image;

		this.setup();
	}
	
	var p = createjs.extend(Projectile, createjs.Container);

	p.setup = function() {
		var projectile = new createjs.Bitmap(this.image);

		this.addChild(projectile); 
		this.setBounds(0, 0, 32, 32);
	}

	window.Projectile = createjs.promote(Projectile, "Container");
}());