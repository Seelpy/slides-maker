import {
    CircleObject,
    ImageObject,
    Presentaion,
    PrimitiveType,
    Slide,
    SlideObjectType,
    TextObject
} from "../types.ts";


const textObject: TextObject = {
    id: "t1",
    type: SlideObjectType.Text,
    position: {
        x: 10,
        y: 10,
    },
    chars: [],
    size: {
        width: 100,
        height: 100,
    },
}

const imageObject: ImageObject = {
    id: "i1",
    type: SlideObjectType.Image,
    position: {
        x: 10,
        y: 10,
    },
    size: {
        width: 100,
        height: 100,
    },
    data: {},
}

const circleObject: CircleObject = {
    id: "c1",
    type: SlideObjectType.Primitive,
    primitiveType: PrimitiveType.Circle,
    position: {
        x: 10,
        y: 10,
    },
    size: {
        width: 100,
        height: 100,
    },
    data: {},
}


const slide1: Slide = [textObject, imageObject, circleObject]

// @ts-ignore
const presentation: Presentaion = [slide1]