import { PrimType, PrimitiveType, Size } from '../../models/types.ts'
import styles from './SlidePrimitive.module.css'

type PrimitiveProps = {
  data: PrimType;
  isPreview: boolean;
}

function getTrianglePoints(size: Size): string {
  return (
    '0' +
    ',' +
    size.height.toString() +
    ' ' +
    Math.trunc(size.width / 2).toString() +
    ',' +
    '0' +
    ' ' +
    size.width.toString() +
    ',' +
    size.height.toString()
  )
}

function getSVGPrimitive(data: PrimType) {
  switch (data.primitiveType) {
    case PrimitiveType.Square:
      return (
        <rect
          width={data.size.width}
          height={data.size.height}
          fill={data.color}
        />
      )
    case PrimitiveType.Circle:
      return (
        <circle
          cx={data.size.width / 2}
          cy={data.size.height / 2}
          r={(data.size.height + data.size.width) / 4}
          fill={data.color}
        />
      )
    case PrimitiveType.Triangle:
      return <polygon points={getTrianglePoints(data.size)} fill={data.color} />
  }
}

const SlidePrimitive = (props: PrimitiveProps) => {
  const data = props.data;

  const style = {
    left: data.position.x,
    top: data.position.y,
    color: data.color,
    width: data.size.width,
    height: data.size.height,
  }

  const clipRect = {
    clip: `rect(${-data.position.y}px, ${-data.position.x+1280}px, ${-data.position.y+720}px, ${-data.position.x}px)`
  }

  return (
    <div className={styles.primitive} style={props.isPreview ? clipRect : {}}>
      <svg style={style}>{getSVGPrimitive(props.data)}</svg>
    </div>
  )
}

export default SlidePrimitive
