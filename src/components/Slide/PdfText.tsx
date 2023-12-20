import { TextObject, SlideInfo } from '../../models/types.ts'
import styles from './SlideText.module.css'

type TextAlign = any
type TextProps = {
  data: TextObject
  slide: SlideInfo
}

const PdfText = (props: TextProps) => {
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

  return (
    <div className={styles.text}>
      <span className={styles.spanText} style={textStyle}>
        {data.value}
      </span>
    </div>
  )
}

export default PdfText
