var envsettings = {
	a:0,
	d:250,
	s:0.6,
	r:0
}

var	osc = T("sin");

function synthInit() {
	var	env = T("adsr", envsettings, T("sin")).on("ended", function() {
	  this.pause();
	}).bang();
	oscenv = T("OscGen", {osc:osc, env:env, mul:0.15}).play();
	velocity = 127;
	console.log("changed!");
}