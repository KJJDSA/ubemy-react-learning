import HeaderImg from "../assets/investment-calculator-logo.png"

const Header = () => {
  return (
    <header id="header">
      <img src={HeaderImg} alt="header-img" />
      <h1>React Investment Calculator</h1>
    </header>
  )
}

export default Header