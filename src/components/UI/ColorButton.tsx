import styles from './ColorButton.module.css'

type ColorButtonProps = {
  color: string
  onClick: (color: string) => void
}

const ColorButton = (props: ColorButtonProps) => {
  return (
    <i
      onClick={() => props.onClick(props.color)}
      className={styles.colorButton + ' fa-sharp fa-solid fa-square'}
      style={{ color: props.color }}
    />
  )
}

export default ColorButton
