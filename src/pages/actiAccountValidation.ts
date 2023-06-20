import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import * as data from "../helper/util/test-data/registerUser.json"
import { fixture } from "../hooks/pageFixture";


export default class ActiAccountValidation {

    private base: PlaywrightWrapper;

    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }

    private Elements = {
      mailBox: "https://mailosaur.com/app/servers/loklgedw/messages/inbox",
  }

  async userAccountValidation() {
    await fixture.page.goto(this.Elements.mailBox);
    await fixture.page.waitForLoadState('domcontentloaded'); // Wait for the 'DOMContentLoaded' event.
    await fixture.page.getByLabel('Email address').fill(data.mailBoxUserName);
    await fixture.page.getByTestId('btn').click();
    await fixture.page.getByLabel('Password').fill(data.mailBoxPassword);
    await fixture.page.getByTestId('btn').click();
    await fixture.page.waitForLoadState('domcontentloaded'); // Wait for the 'DOMContentLoaded' event.
    await fixture.page.getByTestId('refresh-messages').click();
    await fixture.page.locator('div').filter({ hasText: 'Tester ALastQA' }).first().click();
    await fixture.page.waitForTimeout(2000);
    await fixture.page.getByRole('link', { name: 'Activate Account' }).click();
    await fixture.page.waitForLoadState('domcontentloaded'); // Wait for the 'DOMContentLoaded' event.
    await fixture.page.getByPlaceholder('Create a Password').click();
    await fixture.page.getByPlaceholder('Create a Password').fill(data.actiTimePassword);
    await fixture.page.getByPlaceholder('Confirm your password').click();
    await fixture.page.getByPlaceholder('Confirm your password').fill(data.actiTimePassword);
    await fixture.page.getByRole('link', { name: 'Login' }).click();
    const projectLightBoxBtn = fixture.page.locator('#closeProjectLightBoxBtn');
    await projectLightBoxBtn.waitFor();
    await fixture.page.waitForTimeout(3000);
    await fixture.page.locator('#closeProjectLightBoxBtn').click();
  }
}
