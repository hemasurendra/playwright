# Automating ActiTime website with Playwright + Cucumber (BDD)

Cucumber is a popular behavior-driven development (BDD) tool that allows developers and stakeholders to collaborate on defining and testing application requirements in a human-readable format. 
TypeScript is a powerful superset of JavaScript that adds optional static typing, making it easier to catch errors before runtime. By combining these two tools, we can create more reliable and maintainable tests.

## Features

1. Awesome report with screenshots, videos & logs
2. Execute tests on multiple environment by configuring environments, browsers etc
3. Parallel execution (Turned off to avoid test failures because, each succeding feature is dependant on previous feature)
4. Rerun only failed features
5. Retry failed tests on CI
6. Page object model

## Project structure

- src -> Contains all the features & Typescript code
- test-results -> Contains all the reports related file

## Reports

1. [Mutilple Cucumber Report](https://github.com/WasiqB/multiple-cucumber-html-reporter)
2. Default Cucumber report
3. Screenshots of failure
4. Test videos of failure

## Get Started

### Setup:

1. Clone or download the project
2. Extract and open in the VS-Code
3. `npm i` to install the dependencies
4. `npx playwright install` to install the browsers
5. `npm test` to execute the tests

### Folder structure
0. `src\pages` -> All the page (UI screen)
1. `src\test\features` -> write your features here
2. `src\test\steps` -> Your step definitions goes here
3. `src\hooks\hooks.ts` -> Browser setup and teardown logic
4. `src\hooks\pageFixture.ts` -> Simple way to share the page objects to steps
5. `src\helper\env` -> Multiple environments are handled
6. `src\helper\types` -> To get environment code suggesstions
7. `src\helper\report` -> To generate the report
8. `cucumber.json` -> One file to do all the magic
9. `package.json` -> Contains all the dependencies

## Tutorials
1. Learn Playwright - [Playwright - TS](https://www.youtube.com/watch?v=PUVFmhYJNJA)

## Issues Encountered
1. Test user created, cannot be deleted at times, leaving the environment spill over with multiple test profiles
2. Window confirm() appears in two situations, one to approve users timesheet by manager upon clicking "Approve" button, This confirm() window button blurs and is flaky, though java script code written to return "true" for the confirm() window response, during the script execution the modal is vanishes before 
3. Playwright is too fast to work on the demo application provided, tried to used the global timeouts from the configuration file but application response is too slow. There is no feature to control the execution speed of application under test using Playwright
4. There is a pop-up appeares after newly created user logs in to application once the account is activated. This pop-up is appeared once or twice, this uncertain behavior was not able to predict which decides the test execution/test status