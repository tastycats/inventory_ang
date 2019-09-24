import { AppPage } from './app.po';
import { browser, logging } from 'protractor';
import { by, element } from 'protractor';

describe('Add  page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  // it('should exist', () => {
  //   page.navigateTo();
  //   expect(page.getTitleText()).toBeTruthy();
  // });

  // it('should be disabled', () => {
  //   page.navigateTo();
  //   expect(page.getSubmitButton().getAttribute('disabled')).toBe('true');
  // });

  // it('should be available', () => {
  //   page.navigateTo();
  //   // console.log(page.getInput().getAttribute('formcontrolname'));
  //   expect(page.getInput().getAttribute('formcontrolname')).toBe('nameControl');
  // });

  // it('should contain abc', () => {
  //   page.navigateTo();
  //   const el = page.getElement();
  //   el(by.css('input[formcontrolname="nameControl"]')).sendKeys('abc');

  //   expect(page.getInput().getAttribute('value')).toBe('abc');
  // });

  // beforeEach(async () => {
  //   const el = page.getElement();
  //   el(by.css('input[formcontrolname="nameControl"]')).sendKeys('abc');
  // });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
