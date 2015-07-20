function isPlainObj(o) {
    return (typeof o === 'object') && (o.constructor === Object);
}

function sortObject(o, sortArrays) {
    if (Array.isArray(o)) {
        o = o.map(function(elem) {
            return sortObject(elem, sortArrays);
        });
        if (sortArrays) {
            // performs deterministic sort
            o.sort(function(elem1, elem2) {
                return JSON.stringify(elem1);
            });
        }
        return sortArrays ? o.sort() : o;
    } else if (!isPlainObj(o)) {
        return o;
    }

    var keys = [];
    for (key in o) {
        if (o.hasOwnProperty(key)) {
            keys.push(key);
        }
    }

    keys.sort();

    var sortedObject = {};

    keys.forEach(function(key) {
        sortedObject[key] = sortObject(o[key], sortArrays);
    });

    return sortedObject;
}

function getDiffParts(actualLines, expectedLines) {
    // Append an 'empty' element to the beginning of string 
    // to make the below indexing logic cleaner.
    actualLines.unshift('');
    expectedLines.unshift('');

    var d = new Array(expectedLines.length);
    for (var i = 0; i < expectedLines.length; i++) {
        d[i] = new Array(actualLines.length);
    }

    d[0][0] = 0;

    for (var i = 1; i < expectedLines.length; i++) {
        d[i][0] = d[i - 1][0] + 1;
    }
    for (var j = 1; j < actualLines.length; j++) {
        d[0][j] = d[0][j - 1] + 1;
    }

    for (var i = 1; i < expectedLines.length; i++) {
        for (var j = 1; j < actualLines.length; j++) {
            var editCost = d[i - 1][j - 1];
            if (expectedLines[i] !== actualLines[j]) {
                editCost += 2;
            }
            var deleteCost = d[i - 1][j] + 1;
            var insertCost = d[i][j - 1] + 1;
            d[i][j] = Math.min(editCost, deleteCost, insertCost);
        }
    }

    var parts = [];

    // backtrace
    var i = expectedLines.length - 1;
    var j = actualLines.length - 1;
    while (i > 0 || j > 0) {
        if (i > 0 && d[i][j] === (d[i - 1][j] + 1)) {
            parts.push({
                op: 'delete',
                line: expectedLines[i]
            });
            i -= 1;
        } else if (j > 0 && d[i][j] === (d[i][j - 1] + 1)) {
            parts.push({
                op: 'insert',
                line: actualLines[j]
            });
            j -= 1;
        } else {
            if (expectedLines[i] === actualLines[j]) {
                // TODO: is it right to split these into two cases like this??
                parts.push({
                    op: 'noop',
                    line: expectedLines[i]
                });
            }
            i -= 1;
            j -= 1;
        }
    }

    return parts.reverse();
}

function getErrorMessage(diffParts) {
    var jsonDiff = '';

    diffParts.forEach(function(part) {
        if (part.op === 'delete') {
            jsonDiff += '-';
        } else if (part.op === 'insert') {
            jsonDiff += '+';
        } else {
            jsonDiff += ' ';
        }
        jsonDiff += part.line + '\n';
    });

    return 'Expected JSON objects to be equal; diff:\n' + jsonDiff;
}

function compareJsonObjects(actual, expected) {
    var actualJsonString = JSON.stringify(sortObject(actual), null, 2);
    var expectedJsonString = JSON.stringify(sortObject(expected), null, 2);

    var result = {};

    if (actualJsonString === expectedJsonString) {
        result.pass = true;
    } else {
        result.pass = false;
        var diffParts = getDiffParts(actualJsonString.split('\n'), expectedJsonString.split('\n'));
        result.message = getErrorMessage(diffParts);
    }

    return result;
}

var exports = {};
exports.compareJsonObjects = compareJsonObjects;

return exports;
