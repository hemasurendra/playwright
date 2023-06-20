import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { fixture } from "../hooks/pageFixture";

export default class TimeTrack {

  private base: PlaywrightWrapper;
  constructor(private page: Page) {
      this.base = new PlaywrightWrapper(page);
  }

  async enterTimeTrackDetails(timeForTask1: string,timeForTask2: string,timeForTask3: string) {
    await fixture.page.getByRole("cell", { name: "Time-Track", exact: true }).locator("a").click();
    await fixture.page.getByRole("cell", {name: "Enter Time-Track View Time-Track Lock Time-Track Approve Time-Track",}).getByText("Enter Time-Track").click();
    await fixture.page.waitForTimeout(80000)
    await fixture.page.locator("#taskSelectControl div").filter({ hasText: "Add Tasks from the List" }).click();
    await fixture.page.locator(".dropdownButton").first().click();
    await fixture.page.getByRole("row", { name: "Our company", exact: true }).getByRole("button").click();
    await fixture.page.getByText("Management", { exact: true }).click();
    await fixture.page.getByRole("row", { name: "Calls", exact: true }).getByRole("checkbox").check();
    await fixture.page.getByRole("row", { name: "Meetings", exact: true }).getByRole("checkbox").check();
    await fixture.page.getByRole("row", { name: "Strategic roadmap", exact: true }).getByRole("checkbox").check();
    await fixture.page.locator("div").filter({ hasText: "Add Selected" }).nth(3).click();
    await fixture.page.locator("#spent_135_0").fill(timeForTask1);
    await fixture.page.locator("#spent_136_0").fill(timeForTask2); // Hours
    await fixture.page.locator("#spent_139_0").fill(timeForTask3);
    await fixture.page.locator('#spent_139_0').press('Tab');
    // Fill the input by targeting the label.
    await expect(fixture.page.locator("#overtimeTotal")).toHaveText('0:00');
    // ready for approval toggle
    await fixture.page.locator(
        ".submitTTPanel > .weekApprovalStatusControlOuterContainer > .controlInnerContainer > .changeWeekApprovalStatusControl > table > tbody > tr > td:nth-child(3) > .switcherBackground"
      ).click();
    await fixture.page.getByRole("button", { name: "Save Changes" }).click();
  }
}

