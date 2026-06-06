import { useState } from 'react'
import InputForm from './components/InputForm'
import Report from './components/Report'

function App() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="min-h-screen bg-[#F9F8F6]">
      {!submitted ? (
        <InputForm onSubmit={() => setSubmitted(true)} />
      ) : (
        <Report />
      )}
    </div>
  )
}

export default App