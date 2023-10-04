import styles from './Button.module.css'

type ButtonProps = {
  label: string
  onClick: () => void
}

const Button = (props: ButtonProps) => {
  return (
    <button className={styles.button} onClick={props.onClick}>
      <div>{props.label}</div>
    </button>
  )
}

export default Button
