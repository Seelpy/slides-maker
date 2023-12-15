import { combineReducers, createStore } from 'redux'
import presentationReducer from './reducers/presentationReducer'
import interfaceReducer from './reducers/interfaceReducer'
import historyReducer from './reducers/historyReducer'

const rootReducer = combineReducers({
  presentationReducer,
  interfaceReducer,
  historyReducer
})

export const setupStore = () => {
  return createStore(rootReducer)
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
