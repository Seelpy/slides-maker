import styles from './SlideEditor.module.css'
import { SlideInfo } from "../../models/types.ts";
import PdfObject from "./PdfObject.tsx";

const PDFSlide = (slide: SlideInfo) => {
  return (
    <div
      className={styles.editorArea}
    >
      <div
        className={styles.slideEditor}
        style={{background: slide.background}}
      >
        <div className={styles.selectionArea}/>
        {slide.slide.map((obj, i) => (
          <PdfObject
            key={i}
            slide={slide}
            data={obj}
            preview={false}
          />
        ))}
      </div>
    </div>
  )
}

export default PDFSlide
