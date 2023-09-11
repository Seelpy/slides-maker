import styles from './Button.module.css'

type ButtonProps = {
    label: string,
    onClick: () => void,
}

const Button = (props: ButtonProps) => {
    const {
        label,
        onClick,
    } = props

    return (
        <button className={styles.button}
                onClick={onClick}
        >
            <div>
                {label}
            </div>
        </button>
    )
}

export default Button