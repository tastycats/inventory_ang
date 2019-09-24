import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    console.log(browser.baseUrl + 'add');
    return browser.get(browser.baseUrl + 'add') as Promise<any>;
  }

  getTitleText() {
    return element(by.css('.form-container')).getText() as Promise<string>;
  }

  getSubmitButton() {
    return element(by.tagName('button'));
  }

  getInput() {
    return element(by.css('input[formcontrolname="nameControl"]'));
  }

  getElement() {
    return element;
  }
}
