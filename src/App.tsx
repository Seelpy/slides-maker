import "./App.css"
import Presentation from "./views/Presentation.tsx"
import { Provider } from "react-redux"
import { setupStore } from "./store/store.ts"

function App() {
  const store = setupStore()

  return (
    <Provider store={store}>
      <ThemeProvider>
        <Presentation />
      </ThemeProvider>
    </Provider>
  )
}

export default App
