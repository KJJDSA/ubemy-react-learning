import Input from "./Input.jsx"

const UserInput = ({data, onChange}) => {
  return (
    <div className="input-group">
      <Input value={data.initialInvestment} inputId="initialInvestment" onChange={onChange}>INITIAL INVESTMENT</Input>   
      <Input value={data.annualInvestment} inputId="annualInvestment" onChange={onChange}>ANNUAL INVESTMENT</Input> 
      <Input value={data.expectedReturn} inputId="expectedReturn" onChange={onChange}>EXPECTED RETURN</Input>  
      <Input value={data.duration} inputId="duration" onChange={onChange}>DURATION</Input>  
    </div>
  )
}

export default UserInput
