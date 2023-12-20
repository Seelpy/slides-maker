import styles from './MenuBar.module.css'
import {
  SectionColors,
  SectionFigures,
  SectionImages,
  SectionInfo,
  SectionText,
  SectionSlides,
  SectionHistory,
} from './MenuSections'

const MenuBar = () => {
  return (
    <div className={styles.menuBar}>
      <SectionInfo />
      <SectionFigures />
      <SectionText />
      <SectionImages />
      <SectionColors />
      <SectionSlides />
      <SectionHistory />
    </div>
  )
}

export default MenuBar
