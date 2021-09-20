ConvoAPITest - Test Automation Framework to automate get post delete operation on api resource link : https://thinking-tester-contact-list.herokuapp.com

How to run this program :
1. Install all dependencies by running these commands.
cd your_test_project_folder
npm install -g mocha
npm install

2. Let’s run your first API test by running these commands
cd your_test_project_folder
npm start
or
cd your_test_project_folder
JUNIT_REPORT_PATH=test-result/result.xml JUNIT_REPORT_STACK=1 mocha --timeout 25000 --colors --reporter mocha-jenkins-reporter

Frame work used - Mocha and CHAI

Mocha is a JavaScript test framework that runs on Node.js. It can also be run in the browser (fun!!!!). First thing we have to do is make sure that we have Mocha installed. Since the following tests will be the first of many, lets start with installing Mocha globally via the terminal:
$ npm install --global mocha
Now that we’ve installed Mocha, lets go ahead and create a directory in which to write some practice tests:
$ mkdir my_first_mocha_tests
Then go ahead and install Mocha into the new directory, which will add a node_modules folder to it:
$ npm install mocha
Within our directory, we will create three different files: test.js, myFirstTests.js and package.json. The first two will be placed within a folder called test, while the package.json file will be in the root directory. As it stands now, the project tree should look something like this:
- my_first_mocha_tests
  - node_modules
  - test
    - test.js
    - myFirstTests.js
  - package.json

  CHAI : Chai is a BDD / TDD assertion library for node and the browser that can be delightfully paired with any javascript testing framework.

Chai has several interfaces that allow the developer to choose the most comfortable. The chain-capable BDD styles provide an expressive language & readable style, while the TDD assert style provides a more classical fee
