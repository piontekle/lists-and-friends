import { createStore, compose } from 'redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import { reactReduxFirebase } from 'react-redux-firebase'
import rootReducer from './reducer'

export default function configureStore(initialState, history) {
  // Initialize firebase app if instance does not already exist
  if (!window.fbInstance) {
    // Initialize Firebase instance
    firebase.initializeApp(fbConfig)
  }

  const createStoreWithMiddleware = compose(
    // Pass firebase instance
    reactReduxFirebase(window.fbInstance || firebase, {
      userProfile: 'users',
      enableLogging: false
    }),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  )(createStore)

  // Create store instance
  const store = createStoreWithMiddleware(rootReducer)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducer', () => {
      const nextRootReducer = require('./reducer')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
