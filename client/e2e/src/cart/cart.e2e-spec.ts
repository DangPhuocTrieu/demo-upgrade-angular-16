import { Browser, browser, by, element, logging } from 'protractor';
import { AppPage } from './cart.po';

fdescribe('workspace-project App', () => {
  let page: AppPage;
  
  beforeEach(() => {
    page = new AppPage();
  });
  
  it('click button mutli delete', async () => {
    browser.waitForAngularEnabled(false)
    page.navigateTo('cart')

    let deletesBtn = element(by.css('.cart__deletes'))
    let isDisabled = await deletesBtn.isEnabled()
    expect(isDisabled).toBeFalsy()

    // await element(by.tagName('.cart__checkall')).click()
    // isDisabled = await deletesBtn.isEnabled()
    // expect(isDisabled).toBeTruthy()
  })

  fit('click button payment', async () => {
    browser.waitForAngularEnabled(false)
    page.navigateTo('cart')

    let paymentBtn = element(by.css('.cart__payment'))
    await paymentBtn.click()

    let dialog = await element(by.css('.cart__dialog')).isDisplayed()
    expect(dialog).toBeTruthy()
  })

  it('test input search value', async () => {
    browser.waitForAngularEnabled(false)
    page.navigateTo('cart')

    let input = element(by.css('.cart__search'))
    let searchVal = await input.getAttribute('value')
    expect(searchVal).toEqual('')

    input.sendKeys('Trieu')
    searchVal = await input.getAttribute('value')
    expect(searchVal).toEqual('Trieu')
  })

  it('increase quantily item', async () => {
    browser.waitForAngularEnabled(false)
    page.navigateTo('cart')

    let increaseBtn = element.all(by.css('.cart__increase'))
    await increaseBtn.click()
    let quantily = await element(by.css('.cart__quantily')).getText()
    expect(parseInt(quantily)).toBe(4)
  })

  it('decrease quantily item', async () => {
    browser.waitForAngularEnabled(false)
    page.navigateTo('cart')

    let decreaseBtn = element.all(by.css('.cart__decrease'))
    await decreaseBtn.click()
    let quantily = await element(by.css('.cart__quantily')).getText()
    expect(parseInt(quantily)).toBe(2)
  })


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});

