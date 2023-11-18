import { combineReducers, configureStore } from '@reduxjs/toolkit'
import presentationReducer from './reducers/presentationReducer'
import interfaceReducer from './reducers/interfaceReducer'
import historyReducer from './reducers/historyReducer'

const rootReducer = combineReducers({
  presentationReducer,
  interfaceReducer,
  historyReducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
