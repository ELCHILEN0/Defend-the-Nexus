(function() {
	var apiKey = "4cd2cbb6-2ebd-4149-9f95-68f622bbe2ac";

	var region, matchId;

	var background, nexus;
	var nexusHealthBar;
	var health = 100;

	var minions = [];

	var ironback, kraken, ocklepod, plundercrab, razorfin;

	function GameView(width, height, resources) {
		this.Container_constructor();

		this.width = width;
		this.height = height;
		this.resources = resources;

		this.setup();
	}
	var p = createjs.extend(GameView, createjs.Container);

	p.setup = function() {
		ironback = this.resources["ironback"];
		kraken = this.resources["kracken"];
		ocklepod = this.resources["ocklepod"];
		plundercrab = this.resources["plundercrab"];

		background = new createjs.Bitmap(this.resources["game-bg"]);
		background.sourceRect = new createjs.Rectangle(0, 265, this.width, this.height);

		nexus = new createjs.Bitmap(this.resources["nexus"]);
		nexus.x = this.width - 140;
		nexus.y = this.height - 370;

		nexusHealthBar = new Bar(80, 15, 2, "red", "black");
		nexusHealthBar.update(health/100);

		nexusHealthBar.x = this.width - 110;
		nexusHealthBar.y = this.height - 370 - nexusHealthBar.height;

		this.addChild(background, nexus, nexusHealthBar);

		region = "na";
		matchId = 1907069332;

		$.get("https://na.api.pvp.net/api/lol/" + region + "/v2.2/match/" + matchId + "?includeTimeline=true" + "&api_key=" + apiKey, function( data ) {
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
									minions[minions.length] = "razorfin";
									break;

								// Ironback
								case 3612:
									minions[minions.length] = "ironback";
									break;
							
								// Plundercrab
								case 3613:
									minions[minions.length] = "plundercrab";
									break;
									
								// Ocklepod
								case 3614:
									minions[minions.length] = "ocklepod";
									break;
									
							}
						}
					}
				}
			}

			while(minions.length < 10) {
				minions[minions.length] = "normal";
			}
		});
	}

	p.update = function() {
		if(health > 0) {
			health--;

			nexusHealthBar.update(health/100);
		}

		for(minion in minions) {
			console.log(minion);
		}
	}

	window.GameView = createjs.promote(GameView, "Container");
}());