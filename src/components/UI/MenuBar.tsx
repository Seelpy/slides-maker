import styles from "./MenuBar.module.css"
import {
  SectionColors,
  SectionFigures,
  SectionImages,
  SectionInfo,
  SectionText,
  SectionSlides,
  SectionHistory,
  SectionTheme,
  SectionLayers,
} from "./MenuSections"

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
      <SectionTheme />
      <SectionLayers />
    </div>
  )
}

export default MenuBar
