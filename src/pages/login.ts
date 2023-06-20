import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";

export default class Login {

    private base: PlaywrightWrapper;
    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }

    private Elements = {
      userName: "getByPlaceholder('Username', { exact: true })",
      passwordInput: "getByPlaceholder('Password', { exact: true })",
      loginBtn: "getByRole('link', { name: 'Login' })",
      logoutBtn: '#logoutLink',
      logo: "locator('#logoContainer div').nth(1)",
      logoText: "actiTIME",
  }

  async navigateToLoginPage(baseUrl: string) {
    await this.base.goto(baseUrl);
    //await expect(this.page).toHaveTitle(this.Elements.logoText);
  }

  async login(username: string, password: string) {
    await this.page.getByPlaceholder('Username', { exact: true }).fill(username)
    await this.page.getByPlaceholder('Password', { exact: true }).fill(password);
    await this.page.locator('#loginButton').click();
  }
  async loginSuccessful() {
    await expect(this.page.locator(this.Elements.logoutBtn)).toBeVisible();
  }
}