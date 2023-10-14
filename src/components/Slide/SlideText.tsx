import { TextObject } from '../../models/types.ts'
import Char from './Char.tsx'
import styles from './SlideText.module.css'

type TextProps = {
  data: TextObject;
  isPreview: boolean;
}

const SlideText = (props: TextProps) => {
  const data = props.data;

  const clipRect = {
    clip: `rect(${-data.position.y}px, ${-data.position.x+1280}px, ${-data.position.y+720}px, ${-data.position.x}px)`
  }

  return (
    <div className={styles.text} style={props.isPreview ? clipRect : {}}>
      {data.chars.map((char, i) => (
          <Char key={i} data={char} />
      ))}
    </div>
  )
}

export default SlideText
