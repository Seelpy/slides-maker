import styles from './ColorButton.module.css'

type ColorButtonProps = {
  color: string;
}

const ColorButton = (props: ColorButtonProps) => {
  return (
    <i className={styles.colorButton + " fa-sharp fa-solid fa-square"} style={{color: props.color, fontSize: `1.5rem`}}/>
  )
}

export default ColorButton
