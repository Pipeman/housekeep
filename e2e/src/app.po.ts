import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getDurationComponent() {
    return element(by.css('app-duration'));
  }
}
