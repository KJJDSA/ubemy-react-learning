import logo from '../assets/logo.png';
import "./Header.css" // Header.jsx 에 필요한 css를 분리해서 관리하는 것이 좋다.(vanilla css)

export default function Header() {
  return (
    <header>
      <img src={logo} alt="A canvas" />
      {/* 인라인 스타일 장점: 빠르고 쉽게 JSX 에 스타일을 부여할 수 있음 / 단점: 모든 요소를 개별적으로 스타일해아함*/}
      <h1 style={{
        fontSize: "1.5rem",
        fontWeight: "600",
        letterSpacing: "0.4em",
        textAlign: "center",
        textTransform: "uppercase",
        color: "#9a3412",
        fontFamily: ['Pacifico', "cursive"],
        margin: "0"
      }}>ReactArt</h1>
      <p>A community of artists and art-lovers.</p>
    </header>
  );
}
