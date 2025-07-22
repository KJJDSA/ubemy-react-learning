import logo from "../assets/investment-calculator-logo.png"

const Header = () => {
  return (
    <header id="header">
      <img src={logo} alt="Logo showing a money bag" /> {/** alt 를 작성할 떄 이미지 생김새를 자세히 설명한다 */}
      <h1>React Investment Calculator</h1>
    </header>
  )
}

export default Header