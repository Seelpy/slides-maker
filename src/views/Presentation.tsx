import styles from './Presentation.module.css'
import MenuBar from '../components/UI/MenuBar'
import LeftBar from '../components/UI/LeftBar'
import SlideEditor from '../components/Slide/SlideEditor'
import { presentationInfo as basePresentationInfo } from '../models/example/high';
import { useState } from 'react';
import FileHandler from '../services/FileHandler';
import PresentationConverter from '../services/PresentationConverter';
import { PresentationInfo } from '../models/types';

function Presentation() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [presentationInfo, setPresentationInfo] = useState<PresentationInfo>(basePresentationInfo);

  const onImportFromJson = (file: File) => {
    FileHandler.ImportJson(file).then((stringJson) => {
      const importedPresentation = PresentationConverter.ConvertFromJson(stringJson);
      if ("name" in importedPresentation && "presentation" in importedPresentation)
      {
        setPresentationInfo(importedPresentation);
      }
      else
      {
        alert("Error on import: `name` or `presentation` keys are undefined");
      }
    });
  };

  const onPresentationNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPresentationInfo = JSON.parse(JSON.stringify(presentationInfo));;
    newPresentationInfo.name = event.target.value;
    setPresentationInfo(newPresentationInfo);
  };

  return (
    <div className={styles.presentation}>
      <MenuBar 
        name={presentationInfo.name}
        onPresentationNameChange={onPresentationNameChange}
        onImportJson={onImportFromJson}
        onExportJson={(filename: string) => FileHandler.ExportJson(filename, PresentationConverter.ConvertToJson(presentationInfo))}
      />

      {presentationInfo.presentation.length > 0 && (
        <div className={styles.mainBlock}>
          <LeftBar slides={presentationInfo.presentation} activeSlideIndex={activeSlideIndex} setActiveSlideIndex={setActiveSlideIndex}/>
          <SlideEditor slideInfo={presentationInfo.presentation[activeSlideIndex]}></SlideEditor>
        </div>
      )}
    </div>
  )
}
 
export default Presentation
