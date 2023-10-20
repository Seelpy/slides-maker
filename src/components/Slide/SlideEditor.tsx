import styles from './SlideEditor.module.css'
import EditorObject from './SlideObject';
import { SlideInfo } from '../../models/types';

type SlideEditorProps = {
  slideInfo: SlideInfo
};

const SlideEditor = (props: SlideEditorProps) => {
  return (
    <div className={styles.editorArea}>
      <div className={styles.slideEditor}>
          {props.slideInfo.slide.map((obj, i) => (
            <EditorObject key={i} data={obj} preview={false}/>
          ))}
      </div>
    </div>
  )
}

export default SlideEditor
