import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { fixture } from "../hooks/pageFixture";

export default class CreateAccount {

  private base: PlaywrightWrapper;
  constructor(private page: Page) {
      this.base = new PlaywrightWrapper(page);
  }
    async createAccount(
        firstname: string,
        lastname: string,
        email: string,
        departmentName: string,
        hireDate: string
      ) {
        await fixture.page.getByRole("link", { name: "Users" }).click();
        await fixture.page.getByText("New User").click();
        await fixture.page.getByRole("textbox", { name: "First Name" }).click();
        await fixture.page.getByRole("textbox", { name: "First Name" }).type(firstname);
        fixture.page.getByRole("textbox", { name: "Last Name" }).click
        await fixture.page.getByRole("textbox", { name: "Last Name" }).type(lastname);
        await fixture.page.getByRole("textbox", { name: "Email" }).click();
        await fixture.page.getByRole("textbox", { name: "Email" }).type(email);
        await fixture.page.locator("#createUserPanel_accessToOtherProductSelectorPlaceholder div").click();
        await fixture.page.locator(".simpleListMenuButton").click();
        await fixture.page.locator("#createUserPanel_accountInformationSection").getByText("new department").click();
        await fixture.page.getByRole("textbox", { name: "New Department Name" }).type(departmentName);
        await fixture.page.locator("#ext-comp-1716").click();
        await fixture.page.getByRole('button', { name: 'April 2023' }).click();
        await fixture.page.getByRole('link', { name: '2023' }).click();
        await fixture.page.getByRole('link', { name: 'Jan' }).click();
        await fixture.page.locator(".x-date-mp-ok").click(); 
        await fixture.page.getByRole('row', { name: '26 27 28 29 30 31 1', exact: true }).getByRole('link', { name: '1', exact: true }).click();
        await fixture.page.getByRole('row', { name: 'Time-Track requires approval: Time-track will be approved automatically' }).locator('div').click();
        await fixture.page.locator('#createUserPanel label span').nth(1).click(); 
        await fixture.page.getByText('Save & Send Invitation').click();
        await fixture.page.locator('#createUserPanel').getByText('Close').click(); //close the confirmation window
        await fixture.page.waitForLoadState('domcontentloaded'); // Wait for the 'DOMContentLoaded' event.
        await fixture.page.waitForTimeout(2000);
        const user = fixture.page.locator('//*[@id="userListTableContainer"]/div/table/tbody/tr[1]/td[1]/div/table/tbody/tr/td/div[1]/span[2]'); 
        await expect(user).toContainText(lastname+', '+firstname);
      }
}

