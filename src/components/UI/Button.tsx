import styles from './Button.module.css'

type ButtonProps = {
  width?: string
  height?: string
  onClick?: () => void
  children: React.ReactNode
}

const Button = (props: ButtonProps) => {
  const width = props.width ?? 'auto'
  const height = props.height ?? 'auto'
  const onClick = props.onClick

  const buttonSizes = {
    width: width,
    height: height,
  }

  return (
    <button className={styles.button} style={buttonSizes} onClick={onClick}>
      {props.children}
    </button>
  )
}

export default Button
