import firebase from 'firebase/app';
import Firebase from '../../src/utils/Firebase/Firebase';
import { attachCustomCommands } from 'cypress-firebase';

const projectId = Cypress.env('FIREBASE_PROJECT_ID')
const env = Cypress.env('env') || 'stage'
const apiKey = Cypress.env('FIREBASE_API_KEY')
const userUid = Cypress.env('TEST_UID');

const fbConfig = {
  apiKey,
  authDomain: `${projectId}.firebaseapp.com`,
  databaseURL: `https://${projectId}.firebaseio.com`,
  projectId: `${projectId}`,
  storageBucket: `${projectId}.appspot.com`
}

// Attach authed instance to window (so it can be picked up within the React App)
window.fbInstance = firebase.initializeApp(fbConfig);

Cypress.Commands.add('getUser', () => {
  var user = firebase.auth().currentUser
  return user
});

Cypress.Commands.add('getList', (listValues) => {
  let retrievedList;
  listValues.forEach(list => {
    if (list.userId === userUid) retrievedList = list
  })
  return retrievedList;
})

Cypress.Commands.add('getItem', (itemValues) => {
  let retrievedItem;
  itemValues.forEach(item => {
    if (item.userId === userUid) retrievedItem = item
  })
  return retrievedItem;
})

// add cy.login, cy.logout, cy.callRtdb, and cy.callFirestore custom commands
attachCustomCommands({ Cypress, cy, firebase })
