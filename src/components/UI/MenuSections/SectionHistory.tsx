import MenuSection from "../MenuSection.tsx"
import Button from "../Button.tsx"
import { HistoryOperation } from "../../../models/types.ts"
import { useAppSelector } from "../../../hooks/redux.ts"
import {
  useHistoryActions,
  useInterfaceActions,
  usePresentationActions,
} from "../../../hooks/redux.ts"

const SectionHistory = () => {
  const currentHistoryIndex = useAppSelector(
    (state) => state.historyReducer.currentIndex,
  )
  const history = useAppSelector((state) => state.historyReducer.history)

  const { updatePresentation } = usePresentationActions()
  const { moveCurrentIndex, setLastOperationType } = useHistoryActions()
  const { setActiveSlideId } = useInterfaceActions()

  const moveHistory = (by: number) => {
    if (
      (by === -1 && currentHistoryIndex > 2) ||
      (by === 1 && currentHistoryIndex + 1 < history.length)
    ) {
      moveCurrentIndex(by)
      updatePresentation(history[currentHistoryIndex + by].presentation)
      setActiveSlideId(history[currentHistoryIndex + by].activeSlideId)
      setLastOperationType(
        by === 1 ? HistoryOperation.forward : HistoryOperation.backward,
      )
    }
  }

  return (
    <MenuSection name="History">
      <div>
        <Button onClick={() => moveHistory(-1)}>
          <i
            className="fa-solid fa-rotate-left"
            style={{ color: `#4c88f0`, fontSize: `1.5rem` }}
          />
          <br />
          Undo
        </Button>

        <Button onClick={() => moveHistory(1)}>
          <i
            className="fa-solid fa-rotate-right"
            style={{ color: `#4c88f0`, fontSize: `1.5rem` }}
          />
          <br />
          Redo
        </Button>
      </div>
      <div></div>
    </MenuSection>
  )
}

export default SectionHistory
