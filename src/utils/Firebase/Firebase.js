import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
}

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  createUserWithEmail = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);


  signIn = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);


  signOut = () =>
    this.auth.signOut();


  passwordReset = email =>
    this.auth.sendPasswordResetEmail(email);


  passwordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref('users');

  list = uid => this.db.ref(`lists/${uid}`);
  lists = () => this.db.ref('lists');

  items = uid => this.db.ref(`items/${uid}`);
  items = () => this.db.ref(`items`);
}

export default Firebase;
