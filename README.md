# Angular-Uint-test
#### I provided unit test and rise test result all is over 90%

![Screenshot_18](https://user-images.githubusercontent.com/86986628/129895216-96ec02cb-f6e0-43e1-afff-ded514c42647.png)

## How to run tests?
By the command npm test. Your project will be compiled and run Karma for running all tests in your project. It will also open your browser (default address localhost:9876) and show the test results.

### Types of automated tests.
There are 3 main types of automated tests. There are no strict borders between them and it can be arguably hard to decide which test falls in which category.
####Unit testing - test of one “unit” of code. 
It can be a class, or method, with mocked dependencies. We will use this type of test here.

## Test tools — Karma and Jasmine
For automated tests on the front-end with Angular often uses built-in tools Karma and jasmine. Karma is a test runner, the tool which runs our tests in the browser. Jasmine — test tool for creating mocks and assert test results. You can use different tools for testing, such as Jest, Mocha, Chai, etc., but Jasmine already here out of the box and sufficient for most cases.

## spec file for unit tests
It’s important — all tests should be stored in files with name format <name-of-the-tested-file>.spec.ts. File type “spec” (stands for “specification”), tells Karma that this is the file with tests.

`npm install`

and then

`ng test`
