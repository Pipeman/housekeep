# Housekeep

This [Angular CLI](https://github.com/angular/angular-cli) version 7.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `npm run unit` or `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
Run `npm run unit:watch` or `ng test --watch` to create a test server watching for any change to the code. This will automatically open a browser window, click the debug button and you'll run the tests.

## Running end-to-end tests

Run `npm run e2e` or `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Running linter

Run `npm run lint` or `ng lint` to execute the lintiing checks with the rules specified in `tslint.json`. Run `npm run lint -- --fix` to automatically fix the failing checks.

## Running pre-build checks

Run `npm run test` to lint and execute both unit and e2e tests in one run.

## Notes and TODO

I satisfied only part of the requirements. This is due to the fact that this was the first working app I built with Angular (I am currently working with AngularJS). The availabillity page is not really working, if you click on the _Select_ button it does not do anything; therefore all the booking process side of the app is missing.
Things to do:
* add tests for the availability component (I focused a lot in writing the tests for the duration component and tried to build something to display the availability data)
* better present the availability data. I selected `@angular/material` as the go-to component library for the seamless integration with Angular, and so I tried to use as much as possible of it. When I had to build the availability page, I thought of using the `mat-grid-list` component, but I found it hard to modify the internal layout of the tiles, especially with dynamic content. As at that point I did spend already a lot of time on the task I decided to go for something easier although, not as pleasant as I thought it. The idea was to show a weekly calendar like layout with different colors for the suitable and not suitable time slot.
* complete the booking process.
* implement a proper store manager. I implemented a very raw state manager made by a singleton service with only getters and setters (this duplication is wanted as it gives better control on what you are adding to the state). As the app is very small it might have been overkill to add another dependecy only for 2 pages and just a couple of data to store. Although it is not elegant, I could have even add the duration into the url and retrieve it from there.
* implement a mocking server to return the mocked data instead of hardocoding it in the source code.
* if there is no duration selected the user should be always redirected to the duration page.
* think a bit more about the accessibility of the pages implementing `aria` attributes. This was also part of the reason why I selected material, as it helps a lot under that point of view.
* write e2e tests
* make the pages more pleasant
