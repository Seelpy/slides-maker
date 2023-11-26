import {
  ImageObject,
  PrimitiveType,
  SlideObject,
  SlideObjectType,
  TextObject,
} from '../models/types'
import { v4 as uuidv4 } from 'uuid'

class SlideObjectGenerator {
  public Generate(
    type: string,
    subtype?: string,
    data?: string,
  ): SlideObject | undefined {
    switch (type) {
      case SlideObjectType.Image: {
        return data === undefined ? undefined : this.MakeImage(data)
      }
      case SlideObjectType.Primitive: {
        return this.GeneratePrimitive(subtype)
      }
      case SlideObjectType.Text: {
        return this.MakeText()
      }
    }
  }

  private MakeImage(data: string): ImageObject {
    return {
      id: uuidv4(),
      type: SlideObjectType.Image,
      data: data,
      position: {
        x: 20,
        y: 20,
      },
      size: {
        width: 500,
        height: 500,
      },
      rotate: 0,
      selected: false,
    }
  }

  private MakeText(): TextObject {
    return {
      id: uuidv4(),
      type: SlideObjectType.Text,
      value: "Text",
      fontSize: 14,
      fontFamily: 'Arial',
      color: 'black',
      bold: false,
      italic: false,
      underline: false,
      position: {
        x: 0,
        y: 0,
      },
      size: {
        width: 100,
        height: 100,
      },
      rotate: 0,
      selected: false,
    }
  }

  private GeneratePrimitive(type?: string): SlideObject | undefined {
    switch (type) {
      case PrimitiveType.Triangle: {
        return this.MakeTriangle()
      }
      case PrimitiveType.Circle: {
        return this.MakeCircle()
      }
      case PrimitiveType.Square: {
        return this.MakeSquare()
      }
    }
  }

  private MakeTriangle(): SlideObject {
    return {
      id: uuidv4(),
      type: SlideObjectType.Primitive,
      primitiveType: PrimitiveType.Triangle,
      color: '#FFF',
      position: {
        x: 0,
        y: 0,
      },
      size: {
        width: 100,
        height: 100,
      },
      rotate: 0,
      selected: false,
    }
  }

  private MakeCircle(): SlideObject {
    return {
      id: uuidv4(),
      type: SlideObjectType.Primitive,
      primitiveType: PrimitiveType.Circle,
      color: '#FFF',
      position: {
        x: 0,
        y: 0,
      },
      size: {
        width: 100,
        height: 100,
      },
      rotate: 0,
      selected: false,
    }
  }

  private MakeSquare(): SlideObject {
    return {
      id: uuidv4(),
      type: SlideObjectType.Primitive,
      primitiveType: PrimitiveType.Square,
      color: '#FFF',
      position: {
        x: 0,
        y: 0,
      },
      size: {
        width: 100,
        height: 100,
      },
      rotate: 0,
      selected: false,
    }
  }
}

export default new SlideObjectGenerator()
