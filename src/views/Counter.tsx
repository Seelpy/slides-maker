import styles from './Counter.module.css'
import {
  CircleObject,
  PrimitiveType,
  SlideObjectType,
  SquareObject,
  TriangleObject,
} from '../models/types.ts'
import Object from '../components/SlideObject.tsx'

function Counter() {
  const triangleObject: TriangleObject = {
    id: 'c1',
    type: SlideObjectType.Primitive,
    primitiveType: PrimitiveType.Triangle,
    color: '#EE4B2B',
    position: {
      x: 300,
      y: 0,
    },
    size: {
      width: 100,
      height: 250,
    },
    rotate: 0,
  }

  const squareObject: SquareObject = {
    id: 'sq1',
    type: SlideObjectType.Primitive,
    primitiveType: PrimitiveType.Square,
    color: '#222',
    position: {
      x: 0,
      y: 0,
    },
    size: {
      width: 150,
      height: 150,
    },
    rotate: 90,
  }

  const circleObject: CircleObject = {
    id: 'c1',
    type: SlideObjectType.Primitive,
    primitiveType: PrimitiveType.Circle,
    color: '#BBB',
    position: {
      x: 300,
      y: 300,
    },
    size: {
      width: 100,
      height: 100,
    },
    rotate: 0,
  }

  return (
    <div className={styles.counter}>
      <Object data={triangleObject}></Object>
      <Object data={squareObject}></Object>
      <Object data={circleObject}></Object>
    </div>
  )
}

export default Counter
