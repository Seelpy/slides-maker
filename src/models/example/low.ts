import {
    Presentaion,
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


const slide1: Slide = [textObject]

// @ts-ignore
const presentation: Presentaion = [slide1]
