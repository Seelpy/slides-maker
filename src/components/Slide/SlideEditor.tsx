import styles from './SlideEditor.module.css'
import EditorObject from './SlideObject';
import { SlideInfo } from '../../models/types';
import { useInterfaceActions } from '../../hooks/redux';

type SlideEditorProps = {
  slideInfo: SlideInfo
};

const SlideEditor = (props: SlideEditorProps) => {
  const {setDragObjects} = useInterfaceActions();

  return (
    <div className={styles.editorArea} onMouseLeave={() => setDragObjects(false)}>
      <div className={styles.slideEditor}>
          {props.slideInfo.slide.map((obj, i) => (
            <EditorObject key={i} slide={props.slideInfo} data={obj} preview={false}/>
          ))}
      </div>
    </div>
  )
}

export default SlideEditor
