import styles from './SlideEditor.module.css'
import EditorObject from './SlideObject';
import { ObjectType } from '../models/types';


type SlideEditorProps = {
  objects: ObjectType[]
};

const SlideEditor = (props: SlideEditorProps) => {
  return (
    <div className={styles.slideEditor}>
        {props.objects.map(function (obj) {
          return <>
            <EditorObject data={obj}></EditorObject>
          </>
        })}
    </div>
  )
}

export default SlideEditor
