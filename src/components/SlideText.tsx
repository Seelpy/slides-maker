import { TextObject } from './../models/types.ts'
import Char from './Char.tsx'
import styles from './SlideText.module.css'

type TextProps = {
  data: TextObject;
}

const SlideText = (props: TextProps) => {
  const data = props.data;

  return (
    <div className={styles.text}>
      {data.chars.map((char) => (
          <Char data={char} />
      ))}
    </div>
  )
}

export default SlideText
