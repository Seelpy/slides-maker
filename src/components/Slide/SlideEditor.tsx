import styles from './SlideEditor.module.css'
import EditorObject from './SlideObject';
import { ObjectType } from '../../models/types';


type SlideEditorProps = {
  objects: ObjectType[]
};

const SlideEditor = (props: SlideEditorProps) => {
  return (
    <div className={styles.editorArea}>
      <div className={styles.slideEditor}>
          {props.objects.map((obj, i) => (
            <EditorObject key={i} data={obj}/>
          ))}
      </div>
    </div>
  )
}

export default SlideEditor
