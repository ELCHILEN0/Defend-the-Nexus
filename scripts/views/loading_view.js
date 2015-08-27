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
		loadingBar = new LoadingBar(350, 60, 4, "white", "white");
		loadingText = new createjs.Text("Loading ", "50px Arial", "#33FF00");

		loadingBar.x = this.width/2 - loadingBar.width/2;
		loadingBar.y = this.height/2 - loadingBar.height/2;

		this.addChild(loadingBar);
	}

	p.handleProgress = function(progress) {
		loadingBar.update(progress)
	}

	window.LoadingView = createjs.promote(LoadingView, "Container");
}());