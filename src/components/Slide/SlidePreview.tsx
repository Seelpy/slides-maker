import styles from './SlidePreview.module.css'
import EditorObject from './SlideObject';
import { ObjectType } from '../../models/types';

type SlidePreviewProps = {
  selected: boolean,
  slide: ObjectType[];
};

const SlidePreview = (props: SlidePreviewProps) => {
  return (
    <div className={styles.slidePreview}>
        {props.slide.map((obj, i) => (
          <EditorObject key={i} data={obj} preview={true}/>
        ))}
    </div>
  )
}

export default SlidePreview
