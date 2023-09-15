enum SlideObjectType {
    Text = "TEXT",
    Image = "IMAGE",
    Primitive = "PRIMITIVE",
}

enum PrimitiveType {
    Circle = "CIRCLE",
    Square = "SQUARE",
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
}

type TextObject = SlideObject & {
    type: SlideObjectType.Text,
    chars: Array<Char>,
}

type ImageObject = SlideObject & {
    type: SlideObjectType.Image,
    data: object,
}

type PrimitiveObject = SlideObject & {
    type: SlideObjectType.Primitive,
}

type CircleObject = PrimitiveObject & {
    primitiveType: PrimitiveType.Circle,
    data: object,
}

type SquareObject = PrimitiveObject & {
    primitiveType: PrimitiveType.Square,
    data: object,
}

type Slide = Array<TextObject | ImageObject | CircleObject | SquareObject>

type Presentaion = Array<Slide>

export {
    SlideObjectType,
    PrimitiveType,
}

export type {
    Char,
    SlideObject,
    TextObject,
    ImageObject,
    PrimitiveObject,
    CircleObject,
    SquareObject,
    Slide,
    Presentaion,
}