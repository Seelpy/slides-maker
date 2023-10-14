import { Char } from '../../models/types.ts'

type CharObjectProps = {
  data: Char;
}

const CharObject = (props: CharObjectProps) => {
  const data = props.data
  const style = {
    fontSize: data.fontSize,
    fontFamily: data.fontFamily,
    color: data.color,
    fontStyle: data.italic ? 'italic' : '',
    fontWeight: data.bold ? 'bold' : '',
    textDecoration: data.underline ? 'underline' : '',
  }

  return <span style={style}>{data.value}</span>
}

export default CharObject
