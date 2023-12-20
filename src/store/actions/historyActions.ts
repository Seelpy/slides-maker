import { createAction } from '../createAction'
import { HistoryOperation, History } from '../../models/types'

enum HistoryActions {
  pushHistoryState = `PUSH_HISTORY_STATE`,
  clearHistoryAfterIndex = `CLEAR_HISTORY_AFTER_INDEX`,
  moveCurrentIndex = `MOVE_CURRENT_INDEX`,
  setLastOperationType = `SET_LAST_OPERATION_TYPE`,
  setShouldSaveState = `SET_SHOULD_SAVE_STATE`,
}

export const pushHistoryState = createAction<History>(
  HistoryActions.pushHistoryState,
)
export const clearHistoryAfterIndex = createAction<void>(
  HistoryActions.clearHistoryAfterIndex,
)
export const moveCurrentIndex = createAction<number>(
  HistoryActions.moveCurrentIndex,
)
export const setLastOperationType = createAction<HistoryOperation | undefined>(
  HistoryActions.setLastOperationType,
)
export const setShouldSaveState = createAction<boolean>(
  HistoryActions.setShouldSaveState,
)
