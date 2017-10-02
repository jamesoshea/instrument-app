var presets = [
	{	
		'prename': 'INIT',
		'osc1': 'saw',
		'envsettings': {
			a:10,
			d:250,
			s:0.6,
			r:10,
			v:66
		},
		'osc2': 'saw',
		'octave': 0,
		'env2settings':{
			a:20,
			d:250,
			s:0.6,
			r:10,
			v:127	
		},
		'filtersettings': {
			'freq': 8000,
			'time': 1000,
			'q': 5
		}
	},
	{	
		'prename': 'bouncy saw',
		'osc1': 'saw',
		'envsettings': {
			a:70,
			d:250,
			s:0.6,
			r:345,
			v:66
		},
		'osc2': 'tri',
		'octave': -1,
		'env2settings':{
			a:20,
			d:250,
			s:0.6,
			r:10,
			v:127	
		},
		'filtersettings': {
			'hilo': 'lpf',
			'freq': 2425,
			'time': 571,
			'q': 3
		}
	},
	{	
		'prename': 'jug band',
		'osc1': 'sin',
		'envsettings': {
			a:300,
			d:250,
			s:0.6,
			r:500,
			v:66
		},
		'osc2': 'sin',
		'octave': -2,
		'env2settings':{
			a:20,
			d:250,
			s:0.6,
			r:10,
			v:65	
		},
		'filtersettings': {
			'hilo': 'lpf',
			'freq': 20000,
			'time': 1000,
			'q': 0
		}
	}
];