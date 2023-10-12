import styles from './SlidePreview.module.css'
import EditorObject from './SlideObject';
import { ObjectType } from '../models/types';


type SlidePreviewrProps = {
  objects: ObjectType[]
};

const SlidePreview = (props: SlidePreviewrProps) => {
  return (
    <div className={styles.slidePreview}>
        {props.objects.map(function (obj) {
          return <>
            <EditorObject data={obj}></EditorObject>
          </>
        })}
    </div>
  )
}

export default SlidePreview
