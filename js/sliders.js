function updateOutput(val, target, param) {
$(target).text(val);
	envsettings[param] = Number(val);
	console.log(envsettings);
	synthInit();
}