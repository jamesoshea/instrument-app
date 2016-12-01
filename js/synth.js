var	osc = T("sin");
var osc2 = T("sin");

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
 var name1 = "sin";
 var name2 = "sin";

function presetInit(preNum) {
	osc = (presets[preNum].osc1);
	osc2 = (presets[preNum].osc2);
	envsettings = presets[preNum].envsettings;
	env2settings = presets[preNum].env2settings;
	name1 = presets[preNum].name1;
	name2 = presets[preNum].name2;
	synthInit();
}

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

	$("#fd-att").val(envsettings.a);
	$("#att-out").text(envsettings.a);
	$("#fd-dec").val(envsettings.d);
	$("#dec-out").text(envsettings.d);
	$("#fd-sus").val(envsettings.s);
	$("#sus-out").text(envsettings.s);
	$("#fd-rel").val(envsettings.r);
	$("#rel-out").text(envsettings.r);
	$("#fd-vol").val(envsettings.v);
	$("#vol-out").text(envsettings.v);

	$("#fd-att-2").val(env2settings.a);
	$("#att-out-2").text(env2settings.a);
	$("#fd-dec-2").val(env2settings.d);
	$("#dec-out-2").text(env2settings.d);
	$("#fd-sus-2").val(env2settings.s);
	$("#sus-out-2").text(env2settings.s);
	$("#fd-rel-2").val(env2settings.r);
	$("#rel-out-2").text(env2settings.r);
	$("#fd-vol-2").val(env2settings.v);
	$("#vol-out-2").text(env2settings.v);

	var selector1 = "#" + name1 + "-sel";
	var selector2 = "#" + name2 + "-sel-2";

	$(".wave-sel, .wave-sel-2").removeClass("button-primary");
	$(selector1).addClass("button-primary");
	$(selector2).addClass("button-primary");
}