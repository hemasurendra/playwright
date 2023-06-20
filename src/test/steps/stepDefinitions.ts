import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import TimeTrack  from "../../pages/timeTrack";
import Login from "../../pages/login";
import { fixture } from "../../hooks/pageFixture";
import TimeTrackApproval from "../../pages/approvals";
import CreateAccount from "../../pages/createAccount";
import ActiAccountValidation from "../../pages/actiAccountValidation";


let login: Login
let timetrack:  TimeTrack
let timeApprovals: TimeTrackApproval
let createAccount: CreateAccount
let accountValidation: ActiAccountValidation

setDefaultTimeout(60 * 1000 * 2)

Given('User logs in to the time portal with {string}, {string} and {string}',  async function  (baseUrl,Username, Password) {
  login =  new Login(fixture.page);
  await login.navigateToLoginPage(baseUrl);
  await login.login(Username, Password);
  await login.loginSuccessful();
  }
);

When('user is created new users with details {string}, {string}, {string}, {string} and {string}', 
async function (firstName, lastName, email, departmentName, hireDate) {
  // Write code here that turns the phrase above into concrete actions
  createAccount = new CreateAccount(fixture.page);
  await createAccount.createAccount(firstName,lastName,email,departmentName,hireDate);
});

When("User clicks on Enter time-track and enters {string}, {string} and {string} for tasks and submits",
  async function (timeForTask1, timeForTask2, timeForTask3) {
    timetrack = new TimeTrack(fixture.page);
    await timetrack.enterTimeTrackDetails(timeForTask1,timeForTask2,timeForTask3);
  }
);

Then("new user is created and email validated", async function () {
  accountValidation = new ActiAccountValidation(fixture.page);
  await accountValidation.userAccountValidation();
  });

When("Manager accesses the time sheet of {string} and approves it", async function (lastName) {
    timeApprovals = new TimeTrackApproval(fixture.page);
    await timeApprovals.approveTimeSheet(lastName);
  }
);

Then("user time sheet is approved", async function (lastName) {
    timeApprovals = new TimeTrackApproval(fixture.page);
    await timeApprovals.noPendingApprovals(lastName);
  });

Then("Timesheet is sent to manager for approval", async function () {
  });
