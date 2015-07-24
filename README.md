# Get it

```
bower install jsonAssertion
```

```
npm install json-assertion
```

# jsonAssertion
JSON equality assertion made better with diffs. When asserting the equality two JSON objects in a Javascript testing framework such as Jasmine, we end up with error messages like this when the test fails: 

```
Expected Object({ employeeId: 1224, firstName: 'Dylan' }) to equal Object({ employeeId: 1224, firstName: 'Dylan', lastName: 'Daniels' }).
```

The above example is fairly readable. We can see that our code has dropped the "lastName" key in the Object. But a small difference between two JSON Objects becomes hard to spot when the Objects are very large. How quickly can you spot the error in the following example?

```
Expected Object({ employeeId: 1224, firstName: 'Dylan', lastName: 'Daniels', employeeNickname: 'Dylan', employeeHobby: 'yodeling', employeeHistory: Object({ yearsWorked: 2, warnings: 0, monthsWorked: 7 }), favoriteColors: [ 'red', 'blue', 'pink', 'green', 'navy', 'gray' ] }) to equal Object({ lastName: 'Daniels', employeeId: 1224, firstName: 'Dylan', employeeNickname: 'Dylan', employeeHobby: 'yodeling', favoriteColors: [ 'red', 'blue', 'pink', 'purple', 'navy', 'gray' ], employeeHistory: Object({ yearsWorked: 2, warnings: 0, monthsWorked: 7 }) }).
```

It's not easy to find what's different in the two JSON Objects above. We know our test is failing, but we don't want to manually look through unordered JSON Objects to find the difference! Here's the same error printed using this jsonAssertion library as a Jasmine custom matcher:

```
Expected JSON objects to be equal; diff:
{
   "employeeHistory": {
     "monthsWorked": 7,
     "warnings": 0,
     "yearsWorked": 2
   },
   "employeeHobby": "yodeling",
   "employeeId": 1224,
   "employeeNickname": "Dylan",
   "favoriteColors": [
     "red",
     "blue",
     "pink",
+    "green",
-    "purple",
     "navy",
     "gray"
   ],
   "firstName": "Dylan",
   "lastName": "Daniels"
 }
```

Much simpler! We can clearly see that the difference between the two Objects--we expected the fourth element of the `favoriteColors` to be `purple`, but our code produced `green.`

# Out-of-the-box support for Jasmine



# Integrating with Mocha
