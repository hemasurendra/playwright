Feature: User fills the timesheet and submits

// @test
Scenario Outline: Filling timesheet and submission
  Given User logs in to the time portal with "<baseUrl>", "<Username>" and "<Password>"
  When User clicks on Enter time-track and enters "<timeForTask1>", "<timeForTask2>" and "<timeForTask3>" for tasks and submits
  Then Timesheet is sent to manager for approval

  Examples:
    | Username   | Password  | timeForTask1 | timeForTask2 | timeForTask3 | baseUrl                            |
    | 8Ziz4In3Q5 | abcd1234  | 2.5          | 2.5          | 3            | https://demo.actitime.com/login.do |