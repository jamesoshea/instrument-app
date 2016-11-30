var envsettings = {
	a:20,
	d:250,
	s:0.6,
	r:10,
	v:127
}
var env2settings = {
	a:20,
	d:250,
	s:0.6,
	r:10,
	v:127
}

var	osc = T("sin");
var osc2 = T("sin");	

function synthInit() {		
	var	env = T("adsr", envsettings, T("sin")).on("ended", function() {
	  this.pause();
	}).bang();
	var	env2 = T("adsr", env2settings, T("sin")).on("ended", function() {
	  this.pause();
	}).bang();
	velocity1 = envsettings.v;
	oscenv = T("OscGen", {osc:osc, env:env, mul:0.15}).play();
	velocity2 = env2settings.v;
	osc2env = T("OscGen", {osc:osc2, env:env2, mul:0.15}).play();
}

function presetInit(preNum) {
	var preset = preNum;
	var	osc = presets[0].osc1;
	var osc2 = presets[0].osc2;			
	var	env = T("adsr", presets[0].envsettings, T("sin")).on("ended", function() {
	  this.pause();
	}).bang();
	var	env2 = T("adsr", presets[0].env2settings, T("sin")).on("ended", function() {
	  this.pause();
	}).bang();
	velocity1 = envsettings.v;
	oscenv = T("OscGen", {osc:osc, env:env, mul:0.15}).play();
	velocity2 = env2settings.v;
	osc2env = T("OscGen", {osc:osc2, env:env2, mul:0.15}).play();
}