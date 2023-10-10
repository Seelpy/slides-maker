import { PrimType, PrimitiveType, Size } from './../models/types.ts'

type PrimitiveProps = {
  data: PrimType
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
          cx={data.size.width}
          cy={data.size.height}
          r={(data.size.height + data.size.width) / 4}
          fill={data.color}
        />
      )
    case PrimitiveType.Triangle:
      return <polygon points={getTrianglePoints(data.size)} fill={data.color} />
  }
}

const Primitive = (props: PrimitiveProps) => {
  const style = {
    left: props.data.position.x,
    top: props.data.position.y,
    color: props.data.color,
  }

  return <svg style={style}>{getSVGPrimitive(props.data)}</svg>
}

export default Primitive
