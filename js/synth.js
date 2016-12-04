var currentSettings = {	
		"prename": "INIT",
		"osc1": "saw",
		"envsettings": {
										a:10,
										d:250,
										s:0.6,
										r:10,
										v:66
		},
		"osc2": "saw",
		"env2settings":{
										a:20,
										d:250,
										s:0.6,
										r:10,
										v:127	
		},
		"octave": 0,
		"filtersettings": {
			"freq": 8000,
			"time": 1000,
			"q": 5
		}
	}

function presetSelect(preNum){
	currentSettings = presets[preNum];
	synth2Init();
}

function synth2Init() {

	synth = T("SynthDef").play();

	synth.def = function(opts) {
	  var osc, env;
	  osc = T(currentSettings.osc1, {freq:opts.freq, mul:0.25});
	  env  = T("adsr", currentSettings.envsettings, osc);
	  var cutoff = T("env", {table:[currentSettings.filtersettings.freq, [opts.freq, currentSettings.filtersettings.time]]}).bang();
	  var VCF    = T("lpf", {cutoff:cutoff, Q:currentSettings.filtersettings.q}, osc);
	  var EG  = T("adsr", currentSettings.envsettings);
	  var VCA = EG.append(VCF).bang();

	  return VCA;
	};

	var osc2 = T(currentSettings.osc2);
	var	env2 = T("adsr", currentSettings.env2settings, T("sin")).on("ended", function() {
  this.pause();
	}).bang();
	velocity2 = currentSettings.env2settings.v;
	osc2env = T("OscGen", {osc:osc2, env:env2, mul:0.15}).play();

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

	$("#fil-freq").val(currentSettings.filtersettings.freq);
	$("#fil-freq-out").text(currentSettings.filtersettings.freq);
	$("#fil-time").val(currentSettings.filtersettings.time);
	$("#fil-time-out").text(currentSettings.filtersettings.time);
	$("#fil-q").val(currentSettings.filtersettings.q);
	$("#fil-q-out").text(currentSettings.filtersettings.q);

	var selector1 = "#" + currentSettings.osc1 + "-sel";
	var selector2 = "#" + currentSettings.osc2 + "-sel-2";

	$(".wave-sel, .wave-sel-2").removeClass("button-primary");
	$(selector1).addClass("button-primary");
	$(selector2).addClass("button-primary");

}