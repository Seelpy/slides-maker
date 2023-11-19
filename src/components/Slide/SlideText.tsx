import { useRef, useEffect } from 'react'
import { Size, TextObject } from '../../models/types.ts'
import Char from './Char.tsx'
import styles from './SlideText.module.css'
import { usePresentationActions } from '../../hooks/redux.ts'
import { SlideInfo } from '../../models/types.ts'

type TextProps = {
  data: TextObject;
  slide: SlideInfo;
}

const SlideText = (props: TextProps) => {
  const data = props.data
  const textRef = useRef<HTMLDivElement | null>(null);
  const lastTextSize = useRef<Size>({width: 0, height: 0})
  const {updateSlide} = usePresentationActions();

  useEffect(() => {
    // Подгоняем размер объекта под размер текста
    if (textRef.current) {
      const textSize: Size = {
        width: textRef.current.clientWidth, 
        height: textRef.current.clientHeight
      };

      if (lastTextSize.current.width !== textSize.width || lastTextSize.current.height !== textSize.height) {
        if (textSize.width !== data.size.width || textSize.height !== data.size.height) {
          updateSlide({slide: props.slide, oldSlideObject: data, newSlideObject: {...data, size: textSize}});
        }
      }

      lastTextSize.current = textSize
    }
  }, [data])

  return (
    <div className={styles.text} ref={textRef}>
      {data.chars.map((char, i) => (
        <Char key={i} data={char} />
      ))}
    </div>
  )
}

export default SlideText
