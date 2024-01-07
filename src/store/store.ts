import { combineReducers, createStore } from "redux"
import presentationReducer from "./reducers/presentationReducer"
import interfaceReducer from "./reducers/interfaceReducer"
import historyReducer from "./reducers/historyReducer"
import themeReducer from "./reducers/themeReducer.ts"

const rootReducer = combineReducers({
  presentationReducer,
  interfaceReducer,
  historyReducer,
  themeReducer,
})

export const setupStore = () => {
  return createStore(rootReducer)
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]
