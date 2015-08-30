(function() {
	function Minion(health, damage, type, image) {
		this.Container_constructor();

		this.maxHealth = health;
		this.health = health;
		this.damage = damage;

		this.type = type;
		this.image = image;
		this.healthBar = new Bar(40, 7, 1, "red", "black");

		this.setup();
	}
	
	var p = createjs.extend(Minion, createjs.Container);

	p.setup = function() {
		this.healthBar.update(this.health/this.maxHealth);

		minion = new createjs.Bitmap(this.image);
		minion.y = this.healthBar.height;
		minion.sourceRect = new createjs.Rectangle(0, 265, this.width, this.height);

		this.addChild(this.healthBar, minion); 
	}

	p.damage = function(damage) {
		if(this.health > 0 && this.health - damage > 0) {
			this.health = this.health - damage > 0 ? this.health - damage : 0;
		}

		this.healthBar.update(this.health/this.maxHealth);
	}

	window.Minion = createjs.promote(Minion, "Container");
}());