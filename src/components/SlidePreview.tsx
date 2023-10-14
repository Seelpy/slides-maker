import styles from './SlidePreview.module.css'
import EditorObject from './SlideObject';
import { ObjectType } from '../models/types';

type SlidePreviewProps = {
  objects: ObjectType[];
};

const SlidePreview = (props: SlidePreviewProps) => {
  return (
    <div className={styles.slidePreview}>
        {props.objects.map((obj, i) => (
          <EditorObject key={i} data={obj} />
        ))}
    </div>
  )
}

export default SlidePreview
