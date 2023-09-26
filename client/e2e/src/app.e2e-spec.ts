import { browser, by, element, logging } from 'protractor';
import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;
  
  beforeEach(() => {
    page = new AppPage();
  });
  
  it('display product list', async () => {
    browser.waitForAngularEnabled(false)
    page.navigateTo()

    const prodList = await element(by.css('.products__list')).isPresent()
    expect(prodList).toBeTruthy()
  });

  it('click cart button', async () => {
    browser.waitForAngularEnabled(false)
    page.navigateTo()

    await element(by.css('.header__actions i')).click()
    expect(await browser.getCurrentUrl()).toEqual('http://localhost:4200/cart')
  });
  
  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});

