function updateOutput(val, target, param) {
$(target).text(val);
	envsettings[param] = Number(val);
	console.log(envsettings);
	synthInit();
}

$(document).ready(function(){

	var selectors = ["#sin-sel", "#tri-sel", "#saw-sel", "#pulse-sel"];
	var waveforms = ["sin", "tri", "saw", "pulse"];
	var waveFunctions = [];

	function waveSelector(i){
		$(selectors[i]).on("click", function() {
		console.log("butts");
		osc = T(waveforms[i]);
		synthInit();
		});
	}

	for (var i = 0; i < selectors.length; i++) {
		waveFunctions[i] = waveSelector(i);
	}
});