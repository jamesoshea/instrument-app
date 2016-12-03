var currentSettings = {	"prename": "INIT",
		"osc1": T("sin"),
		"name1": "sin",
		"envsettings": {
										a:20,
										d:250,
										s:0.6,
										r:10,
										v:66
		},
		"osc2": T("sin"),
		"name2": "sin",
		"env2settings":{
										a:20,
										d:250,
										s:0.6,
										r:10,
										v:66	
		},
		"lfo-shape": "sin",
		"lfo-speed": ""
	}

console.log(currentSettings);

function presetSelect(preNum){
	currentSettings = presets[preNum];
	synthInit();
}

function synth2Init() {

	var synth = T("SynthDef").play();

	synth.def = function(opts) {
	  var osc1, osc2, env;
	  osc1 = currentSettings.osc1;
	  osc2 = currentsettings.osc2;
	  env  = T("linen", {s:450, r:250, lv:0.5}, osc1, osc2);
	  return env.on("ended", opts.doneAction).bang();
	};

}

function synthInit() {		

	var	env = T("adsr", currentSettings.envsettings, T("sin")).on("ended", function() {
	  this.pause();
	}).bang();
	var	env2 = T("adsr", currentSettings.env2settings, T("sin")).on("ended", function() {
	  this.pause();
	}).bang();
	velocity1 = currentSettings.envsettings.v;
	oscenv = T("OscGen", {osc:currentSettings.osc1, env:env, mul:0.15}).play();
	velocity2 = currentSettings.env2settings.v;
	osc2env = T("OscGen", {osc:currentSettings.osc2, env:env2, mul:0.15}).play();

	$("#fd-att").val(currentSettings.envsettings.a);
	$("#att-out").text(currentSettings.envsettings.a);
	$("#fd-dec").val(currentSettings.envsettings.d);
	$("#dec-out").text(currentSettings.envsettings.d);
	$("#fd-sus").val(currentSettings.envsettings.s);
	$("#sus-out").text(currentSettings.envsettings.s);
	$("#fd-rel").val(currentSettings.envsettings.r);
	$("#rel-out").text(currentSettings.envsettings.r);
	$("#fd-vol").val(currentSettings.envsettings.v);
	$("#vol-out").text(currentSettings.envsettings.v);

	$("#fd-att-2").val(currentSettings.env2settings.a);
	$("#att-out-2").text(currentSettings.env2settings.a);
	$("#fd-dec-2").val(currentSettings.env2settings.d);
	$("#dec-out-2").text(currentSettings.env2settings.d);
	$("#fd-sus-2").val(currentSettings.env2settings.s);
	$("#sus-out-2").text(currentSettings.env2settings.s);
	$("#fd-rel-2").val(currentSettings.env2settings.r);
	$("#rel-out-2").text(currentSettings.env2settings.r);
	$("#fd-vol-2").val(currentSettings.env2settings.v);
	$("#vol-out-2").text(currentSettings.env2settings.v);

	var selector1 = "#" + currentSettings.name1 + "-sel";
	var selector2 = "#" + currentSettings.name2 + "-sel-2";

	$(".wave-sel, .wave-sel-2").removeClass("button-primary");
	$(selector1).addClass("button-primary");
	$(selector2).addClass("button-primary");
}