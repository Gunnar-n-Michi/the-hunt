import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'
// import mySaga from './sagas'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
const logger = createLogger({})
// then run the saga

// render the application
export function store(intialState) {
  const store = createStore(
    rootReducer,
    intialState,
    applyMiddleware(sagaMiddleware, logger)
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
