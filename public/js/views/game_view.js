(function() {
	var apiKey = "4cd2cbb6-2ebd-4149-9f95-68f622bbe2ac";

	var region, matchId;

	var background, nexus;
	var nexusHealthBar;
	var health = 100;

	var razorfin, ironback, plundercrab, ocklepod, kracken, ball;

	var minionStats = {};
	var minionData = [];

	var spawnStack = [];

	var minions = [];
	var minionSpeed = 7;

	var projectiles = [];

	var timeTillNextWave = 0;
	var timeTillNextSpawn = 0;

	var waveDelay = 360;
	var spawnDelay = 30;

	var waveDelayDelta = 75;
	var spawnDelayDelta = 10;

	var turretDamage = 50;

	var timeTillNextShot = 0;
	var shotDelay = 5;

	var score = 0;
	var scoreboard;

	var gameOver = false;

	function GameView(width, height, resources) {
		this.Container_constructor();

		this.width = width;
		this.height = height;
		this.resources = resources;

		this.setup();
	}
	var p = createjs.extend(GameView, createjs.Container);

	p.setup = function() {
		kraken = this.resources["kraken"];

		razorfin = this.resources["razorfin"];
		ironback = this.resources["ironback"];
		plundercrab = this.resources["plundercrab"];
		ocklepod = this.resources["ocklepod"];

		ball = this.resources["ball"];

		minionStats = {
		RAZORFIN: {
			health: 150,
			damage: 2,
			image: razorfin,
			score: 150
		},
		IRONBACK: {
			health: 150,
			damage: 2,
			image: ironback,
			score: 150
		},
		PLUNDERCRAB: {
			health: 75,
			damage: 5,
			image: plundercrab,
			score: 75
		},
		OCKLEPOD: {
			health: 75,
			damage: 5,
			image: razorfin,
			score: 75
		}};

		background = new createjs.Bitmap(this.resources["game-bg"]);
		background.sourceRect = new createjs.Rectangle(0, 265, this.width, this.height);

		nexus = new createjs.Bitmap(this.resources["nexus"]);
		nexus.x = this.width - 140;
		nexus.y = this.height - 370;

		nexusHealthBar = new Bar(80, 15, 2, "red", "black");
		nexusHealthBar.update(health/100);

		nexusHealthBar.x = this.width - 110;
		nexusHealthBar.y = this.height - 370 - nexusHealthBar.height;

		scoreboard = new Scoreboard(score, kraken);

		this.addChild(background, nexus, nexusHealthBar, scoreboard);

		var regions = ["BR", "EUNE", "EUW", "KR", "LAN", "LAS", "NA", "OCE", "RU", "TR"];

		region = regions[Math.floor(Math.random()*regions.length)];
		matchId = this.resources[region.toLowerCase()][Math.floor(Math.random()*region.toLowerCase().length)];
		
		$.get("https://na.api.pvp.net/api/lol/" + region.toLowerCase() + "/v2.2/match/" + matchId + "?includeTimeline=true" + "&api_key=" + apiKey, function( data ) {
			// iterate through the frames
			for(i = 0; i < data['timeline']['frames'].length; i++) {
				// if there are events continue
				var frames = data['timeline']['frames'];

				if(frames[i]['events'] != undefined) {
					// iterate through each event and check if it is a purchase
					for(j = 0; j < frames[i]['events'].length; j++) {
						var event = frames[i]['events'][j];

						if(event['eventType'] == "ITEM_PURCHASED") {
							switch(event['itemId']) {
								// Razorfin
								case 3611:
								minionData[minionData.length] = "RAZORFIN";
								break;

								// Ironback
								case 3612:
								minionData[minionData.length] = "IRONBACK";
								break;

								// Plundercrab
								case 3613:
								minionData[minionData.length] = "PLUNDERCRAB";
								break;

								// Ocklepod
								case 3614:
								minionData[minionData.length] = "OCKLEPOD";
								break;

							}
						}
					}
				}
			}

			while(minionData.length < 10) {
				minionData[minionData.length] = "NORMAL";
			}
		});

		this.on("click", handleClick);
	}

	var projectileStartX = 810;
	var projectileStartY = 140;

	function handleClick(event) {
		if(timeTillNextShot > 0) {
			return;
		} 

		x = event.stageX;
		y = event.stageY;

		deltaX = (x - projectileStartX);
		deltaY = (y - projectileStartY);
		hyp = Math.sqrt(deltaX*deltaX + deltaY*deltaY)

		deltaX = deltaX/hyp
		deltaY = deltaY/hyp

		var projectile = new Projectile(deltaX, deltaY, ball)
		projectile.x = projectileStartX;
		projectile.y = projectileStartY;
		projectiles.push(projectile);
		this.addChild(projectile);

		timeTillNextShot = shotDelay;
	}

	p.update = function() {
		if(timeTillNextShot > 0) {
			timeTillNextShot--;
		}

		if(gameOver) {
			return;
		}

		if(timeTillNextWave <= 0) {
			waveDelay = waveDelay - waveDelayDelta;
			waveDelayDelta = waveDelayDelta/2;

			spawnDelay = spawnDelay - spawnDelayDelta;
			spawnDelayDelta = spawnDelayDelta/2;

			timeTillNextWave = waveDelay;

			spawnStack = spawnStack.concat(shuffle(minionData));
		} else {
			timeTillNextWave--;
		}

		if(timeTillNextSpawn <= 0) {
			if(spawnStack.length != 0) {
				timeTillNextSpawn = spawnDelay;

				var id = minions.length;
				var type = spawnStack.shift();

				var minion = new Minion(minionStats[type].health, minionStats[type].damage, type, minionStats[type].image);
				minion.y = 400;
				minions[minions.length] = minion;
				this.addChild(minion);
			}
		} else {
			timeTillNextSpawn--;
		}

		var minionsToRemove = [];
		var projectilesToRemove = [];

		for(i = 0; i < projectiles.length; i++) {
			var projectile = projectiles[i];
			projectile.x = projectile.x + projectile.deltaX*10;
			projectile.y = projectile.y + projectile.deltaY*10;

			if(projectile.x < 0 || projectile.x > this.width || projectile.y < 0 || projectile.y > this.height) {
				projectilesToRemove.push(i);
			} else {
				for(j = 0; j < minions.length; j++) {
					var minion = minions[j];

					if(checkIntersection(projectile, minion)) {
						projectilesToRemove.push(j);
						minion.reduceHealth(50);
					}
				}
			}
		}

		for (i in projectilesToRemove.reverse()) {
			this.removeChild(projectiles[i]);
			projectiles.splice(i, 1);
		}

		for(i = 0; i < minions.length; i++) {
			var minion = minions[i];
			minion.x += minionSpeed;

			if(minion.health <= 0) {
				minionsToRemove.push(i);
				score += minionStats[minion.type].score;
				scoreboard.update(score);
			} else if(minion.x >= nexus.x) {
				minionsToRemove.push(i);
				health -= minion.damage;
			} 
		}

		for (i in minionsToRemove.reverse()) {
			this.removeChild(minions[i]);
			minions.splice(i, 1);
		}

		if(health >= 0) {
			nexusHealthBar.update(health/100);
		} else {
			var gameOverHightlight = new createjs.Shape();
			gameOverHightlight.graphics.beginFill("black").drawRect(0, 0, this.width, this.height);
			gameOverHightlight.alpha = .7;

			var gameOverText = new createjs.Text("Game Over", "64px Arial", "white");
			gameOverText.textAlign = "center";
			gameOverText.textBaseline = "middle";
			gameOverText.x = this.width/2;
			gameOverText.y = this.height/2;

			this.addChild(gameOverHightlight, gameOverText)
			gameOver = true;
		}
	}

	function checkIntersection(rect1, rect2) {
    	if ( rect1.x >= rect2.x + rect2.getBounds().width || rect1.x + rect1.getBounds().width <= rect2.x || rect1.y >= rect2.y + rect2.getBounds().height || rect1.y + rect1.getBounds().height <= rect2.y ) {
    		return false;
    	}
    	return true;
	}


	function shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex ;

		  // While there remain elements to shuffle...
		  while (0 !== currentIndex) {

		    // Pick a remaining element...
		    randomIndex = Math.floor(Math.random() * currentIndex);
		    currentIndex -= 1;

		    // And swap it with the current element.
		    temporaryValue = array[currentIndex];
		    array[currentIndex] = array[randomIndex];
		    array[randomIndex] = temporaryValue;
		}

		return array;
	}

	window.GameView = createjs.promote(GameView, "Container");
}());