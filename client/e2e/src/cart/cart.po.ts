import { browser } from 'protractor';

export class AppPage {
  async navigateTo(path: string = ''): Promise<unknown> {
    return browser.get(browser.baseUrl + path);
  }
  
}
