import logo from '../assets/logo.png';
import "./Header.css" // Header.jsx 에 필요한 css를 분리해서 관리하는 것이 좋다.(vanilla css)

export default function Header() {
  return (
    <header>
      <img src={logo} alt="A canvas" />
      <h1>ReactArt</h1>
      <p>A community of artists and art-lovers.</p>
    </header>
  );
}
