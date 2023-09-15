import { useState } from 'react'
import Button from "./../components/Button.tsx"
import TEXTS from "./../../i18n/Texts.ts"
import styles from "./Counter.module.css"

function Counter() {
    const [count, setCount] = useState<number>(0)

    return (
    <div className={styles.counter}>
        <Button label={TEXTS.APPLICATION_TITTLE} onClick={() => setCount(count + 1)}></Button>
        <div>
            {count}
        </div>
    </div>
    )
}

export default Counter
