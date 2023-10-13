import styles from './SlidePreview.module.css'
import EditorObject from './SlideObject';
import { ObjectType } from '../models/types';


type SlidePreviewProps = {
  objects: ObjectType[];
  onClick: () => void;
};

const SlidePreview = (props: SlidePreviewProps) => {
  return (
    <div className={styles.slidePreview} onClick={props.onClick}>
        {props.objects.map(function (obj) {
          return <>
            <EditorObject data={obj}></EditorObject>
          </>
        })}
    </div>
  )
}

export default SlidePreview
