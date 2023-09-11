import { useState } from 'react'
import Button from "./../components/Button.tsx"
import TEXTS from "./../../i18n/Texts.ts"
import styles from "./Counter.module.css"
import {CountType} from "../models/types.ts"

function Counter() {
    const [count, setCount] = useState<CountType>({value: 0})

    return (
    <div className={styles.counter}>
        <Button label={TEXTS.APPLICATION_TITTLE} onClick={() => setCount({value: count.value + 1})}></Button>
        <div>
            {count.value}
        </div>
    </div>
    )
}

export default Counter
