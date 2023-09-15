import './App.css'
import Counter from "./views/Counter.tsx";
import {Provider} from "react-redux";
import store from "./store/store.ts";

function App() {
    return (
        <Provider store={store}>
            <Counter/>
        </Provider>
    )
}

export default App
