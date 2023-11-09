import styles from './MenuBar.module.css'
import { SectionColors, SectionFigures, SectionImages, SectionInfo, SectionText } from './MenuSections';

type MenuBarProps = {
  name: string,
  onPresentationNameChange(event: React.ChangeEvent<HTMLInputElement>): void,
  onImportJson(file: File): void,
  onExportJson(name: string): void,
};

const MenuBar = (props: MenuBarProps) => {
  return (
    <div className={styles.menuBar}>
      <SectionInfo
        name={props.name}
        onPresentationNameChange={props.onPresentationNameChange}
        onImportJson={props.onImportJson}
        onExportJson={props.onExportJson}
      />

      <SectionFigures />
      <SectionText />
      <SectionImages />
      <SectionColors />
    </div>
  )
}

export default MenuBar
