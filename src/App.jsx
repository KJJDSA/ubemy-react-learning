import { useState } from "react"
import Header from "./components/Header.jsx"
import Input from "./components/Input.jsx"
import Result from "./components/Result.jsx"

function App() {
  const [investmentInput, setInvestmentInput] = useState({
    initialInvestment: 10000,
    annualInvestment:1200,
    expectedReturn:6,
    duration:10
  })

  function handleChangeInput(newValue, type) {
    setInvestmentInput((prev) => ({ // 새로운 객체를 만듦(리액트가 바뀌었다고 인식)
      ...prev, // 이전 값 가져오기
      [type]: newValue // [] 키값
    }))
  }
  return (
    <>
      <Header />
      <main id="user-input">
        <div className="input-group">
          <Input value={investmentInput.initialInvestment} type="initialInvestment" onChange={handleChangeInput}>INITIAL INVESTMENT</Input>   
          <Input value={investmentInput.annualInvestment} type="annualInvestment" onChange={handleChangeInput}>ANNUAL INVESTMENT</Input> 
          <Input value={investmentInput.expectedReturn} type="expectedReturn" onChange={handleChangeInput}>EXPECTED RETURN</Input>  
          <Input value={investmentInput.duration} type="duration" onChange={handleChangeInput}>DURATION</Input>  
          </div>
      </main>
      <Result data={investmentInput}/>
    </>
  )
}

export default App
