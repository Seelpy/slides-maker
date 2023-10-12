import styles from './Button.module.css'

type ButtonProps = {
  width?: string;
  height?: string;
  children: React.ReactNode;
}

const Button = (props: ButtonProps) => {
  const width = props.width || "auto";
  const height = props.height || "auto";

  const buttonSizes = {
    width: width,
    height: height,
  };

  return (
    <button className={styles.button} style={buttonSizes}>
      {props.children}
    </button>
  )
}

export default Button
