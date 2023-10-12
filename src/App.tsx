import './App.css'
import Presentation from "./views/Presentation.tsx";
import {Provider} from "react-redux";
import store from "./store/store.ts";

function App() {
    return (
        <Provider store={store}>
            <Presentation/>
        </Provider>
    )
}

export default App
