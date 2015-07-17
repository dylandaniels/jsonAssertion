var customMatchers = {
    jsonToEqual: function () {
        return {
            compare: function (actual, expected) {
        		return compareJsonObjects(actual, expected, false);
        	}
        }
    }
}

beforeEach(function () {
    jasmine.addMatchers(customMatchers);
});
