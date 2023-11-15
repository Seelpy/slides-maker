import styles from './Presentation.module.css'
import MenuBar from '../components/UI/MenuBar'
import LeftBar from '../components/UI/LeftBar'
import SlideEditor from '../components/Slide/SlideEditor'
import FileHandler from '../services/FileHandler';
import PresentationConverter from '../services/PresentationConverter';
import { useAppSelector, useInterfaceActions, usePresentationActions } from '../hooks/redux';
import { useEffect } from 'react';

function Presentation() {
  const activeSlide = useAppSelector(state => state.interfaceReducer.activeSlide)
  const presentation = useAppSelector(state => state.presentationReducer);
  const {setDragObjects, setDragSlides} = useInterfaceActions();
  const {updatePresentation, changeName} = usePresentationActions();

  const onImportFromJson = (file: File) => {
    FileHandler.ImportJson(file).then((stringJson) => {
      const importedPresentation = PresentationConverter.ConvertFromJson(stringJson);
      if ("name" in importedPresentation && "slides" in importedPresentation)
      {
        updatePresentation(importedPresentation);
      }
      else
      {
        alert("Error on import: `name` or `slides` keys are undefined");
      }
    });
  };

  useEffect(() => {
    window.onmouseup = () => {
      setDragObjects(false);
      setDragSlides(false);
    }
  }, []);

  return (
    <div className={styles.presentation}>
      <MenuBar 
        name={presentation.name}
        onPresentationNameChange={(event) => changeName(event.target.value)}
        onImportJson={onImportFromJson}
        onExportJson={(filename: string) => FileHandler.ExportJson(filename, PresentationConverter.ConvertToJson(presentation))}
      />

      {presentation.slides.length > 0 &&
        <div className={styles.mainBlock}>
          <LeftBar/>
          {activeSlide !== undefined &&
            <SlideEditor slideInfo={activeSlide}></SlideEditor>
          }
        </div>
      }
    </div>
  )
}
 
export default Presentation
