enum SlideObjectType {
    Text = "TEXT",
    Image = "IMAGE",
    Primitive = "PRIMITIVE",
}

enum PrimitiveType {
    Circle = "CIRCLE",
    Square = "SQUARE",
    Triangle = "TRIANGLE",
}

type Position = {
    x: number,
    y: number,
}

type Size = {
    width: number,
    height: number,
}

type Char = {
    value: string,
    fontSize: number,
    fontFamily: string,
    color: string,
    bold: boolean,
    italic: boolean,
    underline: boolean,
}

type SlideObject = {
    id: string,
    position: Position,
    size: Size,
    rotate: number;
}

type TextObject = SlideObject & {
    type: SlideObjectType.Text,
    chars: Array<Char>,
}

type ImageObject = SlideObject & {
    type: SlideObjectType.Image,
    data: string,
}

type PrimitiveObject = SlideObject & {
    type: SlideObjectType.Primitive,
    color: string,
}

type CircleObject = PrimitiveObject & {
    primitiveType: PrimitiveType.Circle,
}

type SquareObject = PrimitiveObject & {
    primitiveType: PrimitiveType.Square,
}

type TriangleObject = PrimitiveObject & {
    primitiveType: PrimitiveType.Triangle,
}

type Slide = Array<TextObject | ImageObject | CircleObject | SquareObject | TriangleObject>

type ObjectType = TextObject | ImageObject | CircleObject | SquareObject | TriangleObject
type PrimType = CircleObject | SquareObject | TriangleObject

type Presentaion = Array<Slide>

type PresentationInfo = {
    name: string
    presenation: Presentaion
}


export {
    SlideObjectType,
    PrimitiveType,
}

export type {
    Position,
    Size,
    Char,
    SlideObject,
    TextObject,
    ImageObject,
    PrimitiveObject,
    CircleObject,
    SquareObject,
    TriangleObject,
    Slide,
    Presentaion,
    PresentationInfo,
    ObjectType,
    PrimType,
}