import styles from './MenuBar.module.css'
import {
  SectionColors,
  SectionFigures,
  SectionImages,
  SectionInfo,
  SectionText,
  SectionSlides,
  SectionHistory,
  SectionTheme
} from './MenuSections'

const MenuBar = () => {
  return (
    <div className={styles.menuBar}>
      <SectionInfo />
      <SectionFigures />
      <SectionText />
      <SectionImages  />
      <SectionColors />
      <SectionSlides />
      <SectionHistory />
      <SectionTheme />
    </div>
  )
}

export default MenuBar
