import styles from './MenuBar.module.css'
import { SectionColors, SectionFigures, SectionImages, SectionInfo, SectionText } from './MenuSections';

const MenuBar = () => {
  return (
    <div className={styles.menuBar}>
      <SectionInfo/>
      <SectionFigures />
      <SectionText />
      <SectionImages />
      <SectionColors />
    </div>
  )
}

export default MenuBar
