import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'
// import mySaga from './sagas'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
const logger = createLogger({})
// then run the saga
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// render the application
export function store(intialState) {
  const store = createStore(
    rootReducer,
    intialState,
    composeEnhancers( applyMiddleware(sagaMiddleware) )
  )
  // sagaMiddleware.run(mySaga)
  if (module.hot) {
   module.hot.accept(() => {
     const nextRootReducer = require('../reducers/index').default;
     store.replaceReducer(nextRootReducer);
   });
  }
  return store
}
