// TO DO: abstract this out to all sliders (add another argument)

function updateOutput(val, target) {
$(target).text(val);
	envsettings.a = Number(val);
	console.log(envsettings);
	synthInit();
}