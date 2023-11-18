import { createReducer } from '@reduxjs/toolkit'
import { HistoryOperation, History } from '../../models/types.ts'
import {
  pushHistoryState,
  clearHistoryAfterIndex,
  moveCurrentIndex,
  setLastOperationType,
} from '../actions/historyActions.ts'

type initialHistoryStateType = {
  history: History[];
  lastHistoryOperation: HistoryOperation | undefined;
  currentIndex: number;
}

const initialHistoryState = {
  history: [],
  lastHistoryOperation: undefined,
  currentIndex: 0,
} as initialHistoryStateType

const historyReducer = createReducer(initialHistoryState, (builder) => {
  builder
    .addCase(pushHistoryState, (state, action) => {
      state.history.push(action.payload)
      state.currentIndex += 1
    })
    .addCase(clearHistoryAfterIndex, (state, _) => {
      state.history.length = state.currentIndex + 1
    })
    .addCase(moveCurrentIndex, (state, action) => {
      state.currentIndex += action.payload
    })
    .addCase(setLastOperationType, (state, action) => {
      state.lastHistoryOperation = action.payload
    })
})

export default historyReducer
