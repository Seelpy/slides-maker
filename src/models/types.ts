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

type Char = {
  value: string
  fontSize: number
  fontFamily: string
  color: string
  bold: boolean
  italic: boolean
  underline: boolean
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
  chars: Array<Char>
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

export { SlideObjectType, PrimitiveType }

export type {
  Position,
  Size,
  Char,
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
}
