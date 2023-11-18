import { createAction } from '@reduxjs/toolkit'
import { HistoryOperation, History } from '../../models/types'

enum historyActions {
  pushHistoryState = `PUSH_HISTORY_STATE`,
  clearHistoryAfterIndex = `CLEAR_HISTORY_AFTER_INDEX`,
  moveCurrentIndex = `MOVE_CURRENT_INDEX`,
  setLastOperationType = `SET_LAST_OPERATION_TYPE`,
}

export const pushHistoryState = createAction<History>(
  historyActions.pushHistoryState,
)
export const clearHistoryAfterIndex = createAction<void>(
  historyActions.clearHistoryAfterIndex,
)
export const moveCurrentIndex = createAction<number>(
  historyActions.moveCurrentIndex,
)
export const setLastOperationType = createAction<HistoryOperation | undefined>(
  historyActions.setLastOperationType,
)