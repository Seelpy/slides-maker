import styles from './Presentation.module.css'
import MenuBar from '../components/UI/MenuBar'
import LeftBar from '../components/UI/LeftBar'
import SlideEditor from '../components/Slide/SlideEditor'
import FileHandler from '../services/FileHandler';
import PresentationConverter from '../services/PresentationConverter';
import { useAppSelector, useInterfaceActions, usePresentationActions } from '../hooks/redux';

function Presentation() {
  const activeSlideIndex = useAppSelector(state => state.interfaceReducer.activeIndexSlide)
  const presentation = useAppSelector(state => state.presentationReducer);
  const {setActiveIndexSlide} = useInterfaceActions();
  const {importPresentation, changeName} = usePresentationActions();

  const onImportFromJson = (file: File) => {
    FileHandler.ImportJson(file).then((stringJson) => {
      const importedPresentation = PresentationConverter.ConvertFromJson(stringJson);
      if ("name" in importedPresentation && "slides" in importedPresentation)
      {
        importPresentation(importedPresentation);
      }
      else
      {
        alert("Error on import: `name` or `slides` keys are undefined");
      }
    });
  };

  return (
    <div className={styles.presentation}>
      <MenuBar 
        name={presentation.name}
        onPresentationNameChange={(event) => changeName(event.target.value)}
        onImportJson={onImportFromJson}
        onExportJson={(filename: string) => FileHandler.ExportJson(filename, PresentationConverter.ConvertToJson(presentation))}
      />

      {presentation.slides.length > 0 && (
        <div className={styles.mainBlock}>
          <LeftBar slides={presentation.slides} activeSlideIndex={activeSlideIndex} setActiveIndexSlide={setActiveIndexSlide}/>
          <SlideEditor slideInfo={presentation.slides[activeSlideIndex]}></SlideEditor>
        </div>
      )}
    </div>
  )
}
 
export default Presentation
