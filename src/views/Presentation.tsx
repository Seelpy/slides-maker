import styles from './Presentation.module.css'
import {
  Char,
  CircleObject,
  ImageObject,
  Position,
  PrimitiveType,
  Size,
  SlideObjectType,
  SquareObject,
  TextObject,
  TriangleObject,
} from '../models/types.ts'
import Object from '../components/SlideObject.tsx'

function Presentation() {
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

  const position: Position = {
    x: 100,
    y: 100,
  }

  const size: Size = {
    width: 25,
    height: 25,
  }

  const char1: Char = {
    value: 'a',
    fontSize: 25,
    fontFamily: 'Corbila',
    color: '#333',
    bold: true,
    italic: true,
    underline: true,
  }
  const char2: Char = {
    value: 'a',
    fontSize: 30,
    fontFamily: 'Corbila',
    color: '#777',
    bold: true,
    italic: true,
    underline: true,
  }

  const char3: Char = {
    value: 'a',
    fontSize: 50,
    fontFamily: 'Corbila',
    color: '#999',
    bold: true,
    italic: true,
    underline: true,
  }

  const char4: Char = {
    value: 'G',
    fontSize: 50,
    fontFamily: 'Helvetica Neue',
    color: '#BB1',
    bold: false,
    italic: false,
    underline: true,
  }

  const char5: Char = {
    value: 'G',
    fontSize: 50,
    fontFamily: 'Helvetica Neue',
    color: '#B41',
    bold: true,
    italic: false,
    underline: false,
  }

  const textObject: TextObject = {
    id: 't1',
    type: SlideObjectType.Text,
    position: position,
    chars: [char1, char2, char3, char4, char5],
    size: size,
    rotate: 0,
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
      width: 30,
      height: 30,
    },
    rotate: 0,
  }

  const imageObject1: ImageObject = {
    id: 'i1',
    type: SlideObjectType.Image,
    data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=',
    position: {
      x: 70,
      y: 70,
    },
    size: {
      width: 50,
      height: 50,
    },
    rotate: 0,
  }

  return (
    <div className={styles.presentation}>
      <Object data={triangleObject}></Object>
      <Object data={squareObject}></Object>
      <Object data={circleObject}></Object>
      <Object data={textObject}></Object>
      <Object data={imageObject}></Object>
      <Object data={imageObject1}></Object>
    </div>
  )
}

export default Presentation
