import { TextObject } from './../models/types.ts'
import Char from './Char.tsx'
import styles from './SlideText.module.css'

type TextProps = {
  data: TextObject
}

const SlideText = (props: TextProps) => {
  const data = props.data

  const style = {
    left: data.position.x,
    top: data.position.y,
  }

  console.log(data)
  return (
    <div className={styles.text} style={style}>
      {data.chars.map((char) => (
        <>
          <Char data={char}></Char>
        </>
      ))}
    </div>
  )
}

export default SlideText
