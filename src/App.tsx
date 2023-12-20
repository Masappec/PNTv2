import { useState } from 'react'
import LoginContainer from './components/Auth/Login/LoginContainer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <LoginContainer/>
    </>
  )
}

export default App
