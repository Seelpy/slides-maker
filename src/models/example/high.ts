import {
  Presentaion,
  Slide,
  SlideObjectType,
  PrimitiveType,
  TextObject,
  ImageObject,
  CircleObject,
  SquareObject,
  TriangleObject,
  Position,
  Size,
} from '../types.ts'

const position: Position = {
  x: -10,
  y: 100,
}

const size: Size = {
  width: 25,
  height: 25,
}

const textObject: TextObject = {
  id: 't1',
  type: SlideObjectType.Text,
  position: position,
  value: 'Hello!',
  align: 'left',
  fontSize: 25,
  fontFamily: 'Corbila',
  color: 'red',
  bold: true,
  italic: false,
  underline: true,
  size: size,
  rotate: 0,
  selected: false,
}

const imageObject: ImageObject = {
  id: 'i1',
  type: SlideObjectType.Image,
  data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=',
  position: {
    x: 20,
    y: 20,
  },
  size: {
    width: 25,
    height: 25,
  },
  rotate: 0,
  selected: false,
}

const imageObject2: ImageObject = {
  id: 'i2',
  type: SlideObjectType.Image,
  data: 'data:image/jpeg;base64,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',
  position: {
    x: 0,
    y: 0,
  },
  size: {
    width: 1280,
    height: 720,
  },
  rotate: 0,
  selected: false,
}

const circleObject: CircleObject = {
  id: 'c1',
  type: SlideObjectType.Primitive,
  primitiveType: PrimitiveType.Circle,
  color: '#FFF',
  position: {
    x: -30,
    y: -10,
  },
  size: {
    width: 100,
    height: 100,
  },
  rounding: 0,
  rotate: 0,
  selected: false,
}

const squareObject: SquareObject = {
  id: 'sq1',
  type: SlideObjectType.Primitive,
  primitiveType: PrimitiveType.Square,
  color: '#FFF',
  position: {
    x: 25,
    y: 25,
  },
  size: {
    width: 15,
    height: 15,
  },
  rounding: 0,
  rotate: 0,
  selected: false,
}

const triangleObject: TriangleObject = {
  id: 'tr1',
  type: SlideObjectType.Primitive,
  primitiveType: PrimitiveType.Triangle,
  color: '#FFF',
  position: {
    x: 150,
    y: 15,
  },
  size: {
    width: 55,
    height: 25,
  },
  rounding: 0,
  rotate: 0,
  selected: false,
}

const triangle2Object: TriangleObject = {
  id: 'tr2',
  type: SlideObjectType.Primitive,
  primitiveType: PrimitiveType.Triangle,
  color: '#158',
  position: {
    x: 10,
    y: 10,
  },
  size: {
    width: 55,
    height: 33,
  },
  rounding: 0,
  rotate: 0,
  selected: false,
}

const triangle3Object: TriangleObject = {
  id: 'tr3',
  type: SlideObjectType.Primitive,
  primitiveType: PrimitiveType.Triangle,
  color: '#158',
  position: {
    x: 42,
    y: 20,
  },
  size: {
    width: 110,
    height: 66,
  },
  rounding: 0,
  rotate: 0,
  selected: false,
}

const slide1: Slide = [
  imageObject2,
  textObject,
  imageObject,
  circleObject,
  squareObject,
  triangleObject,
]
const slide2: Slide = [triangle2Object, triangle3Object]

const presentation: Presentaion = {
  name: 'presentation',
  slides: [
    { id: 'slide1', slide: slide1, selected: false },
    { id: 'slide2', slide: slide2, selected: false },
    { id: 'slide3', slide: [], selected: false },
  ],
}

export { presentation }
