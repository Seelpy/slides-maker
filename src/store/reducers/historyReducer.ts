import { createReducer } from '../createReducer.ts'
import { HistoryOperation, History } from '../../models/types.ts'
import {
  pushHistoryState,
  clearHistoryAfterIndex,
  moveCurrentIndex,
  setLastOperationType,
  setShouldSaveState,
} from '../actions/historyActions.ts'

type initialHistoryStateType = {
  history: History[]
  lastHistoryOperation: HistoryOperation | undefined
  currentIndex: number
  shouldSaveState: boolean
}

const initialHistoryState = {
  history: [],
  lastHistoryOperation: undefined,
  currentIndex: 0,
  shouldSaveState: true,
} as initialHistoryStateType

const historyReducer = createReducer(initialHistoryState, {
  [pushHistoryState.type]: (
    state,
    action: typeof pushHistoryState.actionInstance,
  ) => {
    return {
      ...state,
      history: [...state.history, action.payload],
      currentIndex: state.currentIndex + 1,
    }
  },
  [clearHistoryAfterIndex.type]: (state) => {
    const newHistory = [...state.history]
    newHistory.length = state.currentIndex + 1
    return { ...state, history: newHistory }
  },
  [moveCurrentIndex.type]: (
    state,
    action: typeof moveCurrentIndex.actionInstance,
  ) => {
    return { ...state, currentIndex: state.currentIndex + action.payload }
  },
  [setLastOperationType.type]: (
    state,
    action: typeof setLastOperationType.actionInstance,
  ) => {
    return { ...state, lastHistoryOperation: action.payload }
  },
  [setShouldSaveState.type]: (
    state,
    action: typeof setShouldSaveState.actionInstance,
  ) => {
    return { ...state, shouldSaveState: action.payload }
  },
})

export default historyReducer
