import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { fixture } from "../hooks/pageFixture";

export default class TimeTrackApproval {
    private base: PlaywrightWrapper;
    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }

  async approveTimeSheet(lastName: string) {
    await fixture.page.waitForTimeout(2000);
    await fixture.page.getByRole("cell", { name: "Time-Track", exact: true }).locator("a").click();
    await fixture.page.getByRole("link", { name: "Approve Time-Track" }).click();
    await fixture.page.waitForLoadState('domcontentloaded'); // Wait for the 'DOMContentLoaded' event.
    await fixture.page.locator(".statusApprovalSelectorButtonTitle").click();
    await fixture.page.getByLabel('Not Ready for Approval').setChecked(false);
    await fixture.page.getByLabel('Rejected').setChecked(false);
    await fixture.page.getByRole('button', { name: 'Apply' }).click();
    await fixture.page.getByPlaceholder("Start typing name").type(lastName);

    /* Because of the Flaky window.confirm() modal/dialog is not correctly accesible upon clicking approve button, 
    had to put these explicit timeout which is not a good practice but playwright execution speed is not controllable yet. 
    For these two reasons i've used explicit waits*/

    await fixture.page.waitForTimeout(3000); 
    await fixture.page.locator("#selectAllButton").click();
    await fixture.page.waitForTimeout(3000);
    await fixture.page.locator("#selectAllButton").click();
    await fixture.page.waitForTimeout(3000);
    var realConfirm=window.confirm;
    window.confirm=function(){
    window.confirm=realConfirm;
    return true;
  };
    await fixture.page.getByText("Approve", { exact: true }).click({ force: true });
    await fixture.page.waitForTimeout(20000);
    console.log('waited for 2 seconds')
  }

  async noPendingApprovals(lastName: string) {

    await this.page.locator(".clearFilterButton").click();
    await this.page.getByPlaceholder("Start typing name").type(lastName);
    await fixture.page.waitForLoadState('load'); // Wait for the 'Load' event.
    fixture.page.getByText('There are no entries found');

    //Deleting the added user to maintain a clean state
    await fixture.page.getByRole('link', { name: 'Users' }).click();
    await fixture.page.locator('//*[@id="userListTableContainer"]/div/table/tbody/tr[1]/td[1]').click();
    var realConfirm=window.confirm;
    window.confirm=function(){
    window.confirm=realConfirm;
    return true;};
    await fixture.page.locator('div').filter({ hasText: 'DELETE' }).nth(2).click();
}}