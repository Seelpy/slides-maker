import styles from './MenuBar.module.css'
import {
  SectionColors,
  SectionFigures,
  SectionImages,
  SectionInfo,
  SectionText,
  SectionSlides,
} from './MenuSections'

type MenuBarProps = {
  activeSlideId: string | undefined
}

const MenuBar = (props: MenuBarProps) => {
  return (
    <div className={styles.menuBar}>
      <SectionInfo />
      <SectionFigures activeSlideId={props.activeSlideId} />
      <SectionText activeSlideId={props.activeSlideId} />
      <SectionImages activeSlideId={props.activeSlideId} />
      <SectionColors activeSlideId={props.activeSlideId} />
      <SectionSlides />
    </div>
  )
}

export default MenuBar
