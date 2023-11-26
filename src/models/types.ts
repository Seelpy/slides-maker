enum SlideObjectType {
  Text = 'TEXT',
  Image = 'IMAGE',
  Primitive = 'PRIMITIVE',
}

enum PrimitiveType {
  Circle = 'CIRCLE',
  Square = 'SQUARE',
  Triangle = 'TRIANGLE',
}

type Position = {
  x: number
  y: number
}

type Size = {
  width: number
  height: number
}

type BaseSlideObject = {
  id: string
  position: Position
  size: Size
  rotate: number
  selected: boolean
}

type TextObject = BaseSlideObject & {
  type: SlideObjectType.Text
  value: string
  fontSize: number
  fontFamily: string
  color: string
  bold: boolean
  italic: boolean
  underline: boolean
}

type ImageObject = BaseSlideObject & {
  type: SlideObjectType.Image
  data: string
}

type PrimitiveObject = BaseSlideObject & {
  type: SlideObjectType.Primitive
  color: string
}

type CircleObject = PrimitiveObject & {
  primitiveType: PrimitiveType.Circle
}

type SquareObject = PrimitiveObject & {
  primitiveType: PrimitiveType.Square
}

type TriangleObject = PrimitiveObject & {
  primitiveType: PrimitiveType.Triangle
}

type SlideObject =
  | TextObject
  | ImageObject
  | CircleObject
  | SquareObject
  | TriangleObject
type Slide = Array<SlideObject>

type SlideInfo = {
  id: string
  selected: boolean
  background?: string
  slide: Slide
}

type PrimType = CircleObject | SquareObject | TriangleObject

type Presentaion = {
  name: string
  slides: Array<SlideInfo>
}

type History = {
  presentation: Presentaion
  activeSlideId: string | undefined
}

enum HistoryOperation {
  backward = `HISTORY_BACKWARD`,
  forward = `HISTORY_FORWARD`,
  update = `HISTORY_UPDATE`
}


export { SlideObjectType, PrimitiveType, HistoryOperation }

export type {
  Position,
  Size,
  BaseSlideObject,
  TextObject,
  ImageObject,
  PrimitiveObject,
  CircleObject,
  SquareObject,
  TriangleObject,
  SlideObject,
  Slide,
  Presentaion,
  PrimType,
  SlideInfo,
  History
}
