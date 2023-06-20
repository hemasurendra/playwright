Feature: Manager approves the timesheet of the new user

@test
Scenario Outline: Manager approves the new users time sheet submission
  Given User logs in to the time portal with "<baseUrl>", "<Username>" and "<Password>"
  When Manager accesses the time sheet of "<lastName>" and approves it
  Then user time sheet is approved

  Examples:
    | Username | Password | lastName | baseUrl                            |
    | admin    | manager  | ALastQA  | https://demo.actitime.com/login.do |