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
	var	osc = presets[preNum].osc1;
	var osc2 = presets[preNum].osc2;			
	var	env = T("adsr", presets[preNum].envsettings, T("sin")).on("ended", function() {
	  this.pause();
	}).bang();
	var	env2 = T("adsr", presets[preNum].env2settings, T("sin")).on("ended", function() {
	  this.pause();
	}).bang();
	velocity1 = presets[preNum].envsettings.v;
	oscenv = T("OscGen", {osc:osc, env:env, mul:0.15}).play();
	velocity2 = presets[preNum].env2settings.v;
	osc2env = T("OscGen", {osc:osc2, env:env2, mul:0.15}).play();

	$("#fd-att").val(presets[preNum].envsettings.a);
	$("#att-out").text(presets[preNum].envsettings.a);
	$("#fd-dec").val(presets[preNum].envsettings.d);
	$("#dec-out").text(presets[preNum].envsettings.d);
	$("#fd-sus").val(presets[preNum].envsettings.s);
	$("#sus-out").text(presets[preNum].envsettings.s);
	$("#fd-rel").val(presets[preNum].envsettings.r);
	$("#rel-out").text(presets[preNum].envsettings.r);
	$("#vol-out").text(presets[preNum].envsettings.v);
	$("#fd-vol").text(presets[preNum].envsettings.v);

	$("#fd-att-2").val(presets[preNum].env2settings.a);
	$("#att-out-2").text(presets[preNum].env2settings.a);
	$("#fd-dec-2").val(presets[preNum].env2settings.d);
	$("#dec-out-2").text(presets[preNum].env2settings.d);
	$("#fd-sus-2").val(presets[preNum].env2settings.s);
	$("#sus-out-2").text(presets[preNum].env2settings.s);
	$("#fd-rel-2").val(presets[preNum].env2settings.r);
	$("#rel-out-2").text(presets[preNum].env2settings.r);
	$("#vol-out-2").text(presets[preNum].env2settings.v);
	$("#fd-vol-2").text(presets[preNum].env2settings.v);

	var selector1 = "#" + presets[preNum].name1 + "-sel";
	var selector2 = "#" + presets[preNum].name2 + "-sel-2";
	console.log(selector1);

	$(".wave-sel, .wave-sel-2").removeClass("button-primary");
	$(selector1).addClass("button-primary");
	$(selector2).addClass("button-primary");
}