import styles from './SlidePreview.module.css'
import EditorObject from './SlideObject';
import { ObjectType, Position } from '../models/types';


type SlidePreviewProps = {
  objects: ObjectType[];
};

const maxX = 1280
const maxY = 720
const minX = 0
const minY = 0


function isNormalPosition(position: Position): boolean {
  if (position.x < minX || position.x > maxX) {
    return false 
  }

  if (position.y < minY || position.y > maxY) {  
    return false 
  }

  return true
}

const SlidePreview = (props: SlidePreviewProps) => {
  return (
    <div className={styles.slidePreview}>
        {props.objects.map((obj, i) => (
          <>
            {isNormalPosition(obj.position) ? <EditorObject key={i} data={obj} /> : null}
          </>
        ))}
    </div>
  )
}

export default SlidePreview
