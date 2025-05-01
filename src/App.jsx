import { useState } from 'react'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import Chatbot from './components/Chatbot'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <AppRoutes/>
    <Chatbot />
    </>
  )
}

export default App
