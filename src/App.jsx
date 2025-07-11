import { useState } from "react"
import Header from "./components/Header.jsx"
import Result from "./components/Result.jsx"
import UserInput from "./components/UserInput.jsx"

function App() {
  const [investmentInput, setInvestmentInput] = useState({
    initialInvestment: 10000,
    annualInvestment:1200,
    expectedReturn:6,
    duration:10
  })

  function handleChangeInput(newValue, inputId) {
    setInvestmentInput((prev) => ({ // 새로운 객체를 만듦(리액트가 바뀌었다고 인식)
      ...prev, // 이전 값 가져오기
      [inputId]: newValue // [] 키값
    }))
  }

  const inputIsValid = investmentInput.duration > 0
  
  return (
    <>
      <Header />
      <main id="user-input">
        <UserInput data={investmentInput} onChange={handleChangeInput}/>
      </main>
      {!inputIsValid && <p className="center">Please enter a duration greater than zero.</p>}
      {inputIsValid && <Result data={investmentInput}/>}
    </>
  )
}

export default App
