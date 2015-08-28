(function() {
	var loadingBar, loadingText;

	function LoadingView(width, height) {
		this.Container_constructor();

		this.width = width;
		this.height = height;

		this.setup();
	}
	var p = createjs.extend(LoadingView, createjs.Container);


	p.setup = function() {
		loadingBar = new Bar(350, 60, 4, "white", "white");
		loadingText = new createjs.Text("0% Loaded", "18px Arial", "white");

		loadingText.textAlign = "center";
		loadingText.x = this.width/2;
		loadingText.y = this.height/2 + loadingBar.height*.75;

		loadingBar.x = this.width/2 - loadingBar.width/2;
		loadingBar.y = this.height/2 - loadingBar.height/2;

		this.addChild(loadingBar, loadingText);
	}

	p.handleProgress = function(progress) {
		loadingBar.update(progress)
		loadingText.text = Math.round(progress * 100) + "% Loaded";
	}

	window.LoadingView = createjs.promote(LoadingView, "Container");
}());