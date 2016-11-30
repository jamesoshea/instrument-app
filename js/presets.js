var presets = [
	{
		"envsettings": {
										a:1000,
										d:250,
										s:0.6,
										r:10,
										v:127
		},
		"env2settings":{
										a:20,
										d:250,
										s:0.6,
										r:10,
										v:0
		},
		"osc1": T("saw"),
		"osc2": T("saw")
	},
	{
		"envsettings": {
										a:99,
										d:999,
										s:9.9,
										r:99,
										v:127
		},
		"env2settings":{
										a:99,
										d:999,
										s:99,
										r:99,
										v:127
		}
	}];

	console.log(presets[1].env2settings);