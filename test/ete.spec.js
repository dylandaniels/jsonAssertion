describe('ETE:', function () {

	xit('should diff two JSON objects', function () {
		var expectedJson = {
			'c': {
				'd': 3,
				'a': 2
			},
			'b': 2
		};
		var actualJson = {
			'c': {
				'f': 4,
				'a': 2
			},
			'b': 3
		};
		var result = compareJsonObjects(actualJson, expectedJson, false);
		expect(result.pass).toEqual(false);
		expect(result.message).toEqual([
			'Expected JSON objects to be equal; diff:',
			' {',
			'+  "b": 3,',
			'-  "b": 2,',
			'   "c": {',
			'     "a": 2,',
			'+    "f": 4',
			'-    "d": 3',
			'   }',
			' }\n'
		].join('\n'));
	});

});
