# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

 - Added a seperate method `getInitialCandidateValue()` to set initial value of candidate. The method automatically adds a description to that specific block of code. We know what it is doing.
 - In `getInitialCandidateValue()` we remove the nested if-else and make the method terminate early if event doesn't exist. Making a method return early if a particular condition is met is a good development practise.
 - With just 2 if statements that have a return, readability is improved because the termination of the method is clearly highlighted at the start itself.
 - Added a seperate method to normalize candidate value called `normalizeCandidateValue()`.
 - In this method, we again remove the nested if statements to improve readability. 
 - Adding 2 new methods is a cleaner and more readable approach because we've adopted 'seperation of concerns' paradigm.
 - Each method does 1 thing only and as it is within 10 lines, it's more readable and concise.
 - As a result of removing the nested conditions, the code is easier to trace. As a result of adding the new methods, the code is self descriptive in nature and tells the developer what it is doing.