Feature: Manager creates a new user account
  
// @test
Scenario Outline: New user creation
  Given User logs in to the time portal with "<baseUrl>", "<Username>" and "<Password>"
  When user is created new users with details "<firstName>", "<lastName>", "<email>", "<departmentName>" and "<hireDate>"
  Then new user is created and email validated

  Examples:
    | Username | Password | firstName     | lastName | email                                             | departmentName | hireDate   | baseUrl                            |
    | admin    | manager  | Tester        | ALastQA  | 8Ziz4In3Q5@loklgedw.mailosaur.net                 | prome          | 01.01.2023 | https://demo.actitime.com/login.do |