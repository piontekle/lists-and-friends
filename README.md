# Lists & Friends

When you have multiple people shopping, the most efficient way to get everything on your list is to divide and conquer. Instead of your group having to text or call to update every time an item is collected, use Lists & Friends!

Create a single account for your group, login, and begin your list making. Everyone logged into the account can add, edit, and mark items as purchased, and everyone in the group will be updated in real time.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you get started, you'll need [npm](https://docs.npmjs.com/) installed.

### Installing

To get the project running in your console, from the project directory:

* Install node modules:

#### `npm install`


* Run the app: 

#### `npm start`

* Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.


## Running the tests

Tests were written with [Cypress](https://www.cypress.io/) with the [cypress-firebase library](https://www.npmjs.com/package/cypress-firebase).

* To run tests:<br>
**Currently you need to run tests individually. Running all tests together results in errors from asynchronously creating and deleting test lists and items.**

#### `npm run test:open`

This could be remedied by combining tests or possibly with just more knowledge of Cypress testing structure. This was my first time using Cypress. With more time to read Cypress documentation and implement lessons learned, tests would have been more robust.

## Deployment

Deployed with [Firebase](https://firebase.google.com/docs).

* To build for production: 

#### `npm run build`

* To deploy:

#### `firebase deploy`

* Visit the live site:

#### `[Lists & Friends](https://lists-and-friends.firebaseapp.com/)`

## Upcoming Features

- [] More robust tests that test beyond basic functionality & can be run together
- [] Password recovery and option to change username
- [] User groups, allowing a user to use a single login to see all their groups
- [] Private lists
- [] Prettier sign up/sign in pop ups

## Built With

* [ReactJS](https://reactjs.org/) - Frontend library
* [Firebase](https://firebase.google.com/docs) - Database and deployment
* [Cypress](https://www.cypress.io/) - Testing library
* [Bootstrap](https://getbootstrap.com/docs/4.3/getting-started/introduction/) - CSS library

React and Firebase were used because of my familiarity with both in previous projects. React's efficient UI updating and its flexibility with the backend made it an easy choice. Firebase was chosen because it handles authentication, database, and hosting in one place, making development and managing the app in a short time period very smooth. Bootstrap was used to give the app a clean look while minimizing time spent styling. Cypress, with the cypress-firebase library, allowed testing of authenticated features with minimal configuration.

## Author

* **Lauren Piontek** - *Initial work* - [piontekle](https://github.com/piontekle)

## Acknowledgments

* Thank you to the Robin Wieruch article [A Firebase in React Tutorial for Beginners](https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial/) for getting me started with the authentication context.
* Thank you to the Prescott Prue tutorial, [Testing React + Firebase Apps With Cypress](https://medium.com/@prescottprue/testing-react-firebase-apps-with-cypress-7d7a64d155de) for helping me set up testing.