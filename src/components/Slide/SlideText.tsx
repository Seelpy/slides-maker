import { useRef, useEffect } from 'react'
import { Size, TextObject, SlideInfo, HistoryOperation } from '../../models/types.ts'
import styles from './SlideText.module.css'
import { useAppSelector, useHistoryActions, usePresentationActions } from '../../hooks/redux.ts'

type TextAlign = any
type TextProps = {
  data: TextObject;
  slide: SlideInfo;
}

const SlideText = (props: TextProps) => {
  const data = props.data
  const textStyle = {
    textAlign: data.align as TextAlign,
    fontSize: data.fontSize + 'px',
    fontFamily: data.fontFamily,
    color: data.color,
    fontStyle: data.italic ? 'italic' : '',
    fontWeight: data.bold ? 'bold' : '',
    textDecoration: data.underline ? 'underline' : '',
  }

  const textRef = useRef<HTMLDivElement | null>(null);
  const {updateSlide} = usePresentationActions();
  const {setLastOperationType} = useHistoryActions();
  const lastHistoryOperation = useAppSelector((state) => state.historyReducer.lastHistoryOperation)

  // Подгоняем размер объекта под размер текста
  useEffect(() => {
    if (textRef.current && lastHistoryOperation === undefined) {
      const textSize: Size = {
        width: textRef.current.clientWidth, 
        height: textRef.current.clientHeight
      };

      if (textSize.width !== data.size.width || textSize.height !== data.size.height) {
        setLastOperationType(HistoryOperation.update)
        updateSlide({slide: props.slide, oldSlideObject: data, newSlideObject: {...data, size: textSize}})
      }
    }
  }, [data])

  return (
    <div className={styles.text} ref={textRef}>
        <span className={styles.spanText} style={textStyle}>{data.value}</span>
    </div>
  )
}

export default SlideText
