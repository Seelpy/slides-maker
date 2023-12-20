import styles from './PdfSlide.module.css'
import { SlideInfo } from '../../models/types.ts'
import PdfObject from './PdfObject.tsx'

const PDFSlide = (slide: SlideInfo) => {
  return (
    <div className={styles.slideArea}>
      <div className={styles.slide} style={{ background: slide.background }}>
        <div className={styles.selectionArea} />
        {slide.slide.map((obj, i) => (
          <PdfObject key={i} slide={slide} data={obj} preview={false} />
        ))}
      </div>
    </div>
  )
}

export default PDFSlide
