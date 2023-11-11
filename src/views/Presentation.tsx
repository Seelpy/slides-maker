import styles from './Presentation.module.css'
import MenuBar from '../components/UI/MenuBar'
import LeftBar from '../components/UI/LeftBar'
import SlideEditor from '../components/Slide/SlideEditor'
import { presentation as basePresentation } from '../models/example/high';
import { useState } from 'react';
import FileHandler from '../services/FileHandler';
import PresentationConverter from '../services/PresentationConverter';
import { Presentaion } from '../models/types';

function Presentation() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [presentation, setPresentation] = useState<Presentaion>(basePresentation);

  const onImportFromJson = (file: File) => {
    FileHandler.ImportJson(file).then((stringJson) => {
      const importedPresentation = PresentationConverter.ConvertFromJson(stringJson);
      if ("name" in importedPresentation && "slides" in importedPresentation)
      {
        setPresentation(importedPresentation);
      }
      else
      {
        alert("Error on import: `name` or `slides` keys are undefined");
      }
    });
  };

  const onPresentationNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPresentation = JSON.parse(JSON.stringify(presentation));
    newPresentation.name = event.target.value;
    setPresentation(newPresentation);
  };

  return (
    <div className={styles.presentation}>
      <MenuBar 
        name={presentation.name}
        onPresentationNameChange={onPresentationNameChange}
        onImportJson={onImportFromJson}
        onExportJson={(filename: string) => FileHandler.ExportJson(filename, PresentationConverter.ConvertToJson(presentation))}
      />

      {presentation.slides.length > 0 && (
        <div className={styles.mainBlock}>
          <LeftBar slides={presentation.slides} activeSlideIndex={activeSlideIndex} setActiveSlideIndex={setActiveSlideIndex}/>
          <SlideEditor slideInfo={presentation.slides[activeSlideIndex]}></SlideEditor>
        </div>
      )}
    </div>
  )
}
 
export default Presentation
