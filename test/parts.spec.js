describe('JSON differ parts', function () {

	it('should identify missing lines', function () {
		var linesActual = ['one', 'two', 'three'];
		var linesExpected = ['three'];
		var diffParts = getDiffParts(linesActual, linesExpected);
		expect(diffParts).toEqual([
			{op: 'insert', line: 'one'},
			{op: 'insert', line: 'two'},
			{op: 'noop', line: 'three'}
		]);
	});

	it('should identify added lines', function () {
		var linesActual = ['three'];
		var linesExpected = ['one', 'two', 'three'];
		var diffParts = getDiffParts(linesActual, linesExpected);
		expect(diffParts).toEqual([
			{op: 'delete', line: 'one'},
			{op: 'delete', line: 'two'},
			{op: 'noop', line: 'three'}
		]);
	});

	it('should identify changed lines', function () {
		var linesActual = ['a', 'b'];
		var linesExpected = ['a', 'c'];
		var diffParts = getDiffParts(linesActual, linesExpected);
		expect(diffParts).toEqual([
			{op: 'noop', line: 'a'},
			{op: 'insert', line: 'b'},
			{op: 'delete', line: 'c'}
		]);
	});

});
