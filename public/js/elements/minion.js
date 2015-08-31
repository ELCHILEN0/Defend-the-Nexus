(function() {
	function Minion(health, damage, type, image) {
		this.Container_constructor();

		this.maxHealth = health;
		this.health = health;
		this.damage = damage;

		this.type = type;
		this.image = image;
		this.healthBar = new Bar(46, 7, 1, "red", "black");

		this.setup();
	}
	
	var p = createjs.extend(Minion, createjs.Container);

	p.setup = function() {
		this.healthBar.update(this.health/this.maxHealth);
		this.healthBar.x = 9;

		var minion = new createjs.Bitmap(this.image);
		minion.y = this.healthBar.height + 5;

		this.addChild(this.healthBar, minion); 
		this.setBounds(0, this.healthBar.height + 5, 64, 64);
	}

	p.reduceHealth = function(damage) {
		this.health = this.health - damage > 0 ? this.health - damage : 0;

		this.healthBar.update(this.health/this.maxHealth);
	}

	window.Minion = createjs.promote(Minion, "Container");
}());