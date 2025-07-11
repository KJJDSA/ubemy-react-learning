import logo from '../assets/logo.png';
import style from "./Header.module.css" // Header.jsx 에 필요한 css를 분리해서 관리하는 것이 좋다.(vanilla css)

export default function Header() {
  return (
    <header>
      <img src={logo} alt="A canvas" />
      {/* 인라인 스타일 장점: 빠르고 쉽게 JSX 에 스타일을 부여할 수 있음 / 스코프가 가능하며 동적으로 스타일 부여가 가능함*/}
      {/* 인라인 스타일 단점: 모든 요소를 개별적으로 스타일해아함 / 디자이너가 스타일을 직접 수정할 때 어려움이 있음(JSX 코드에 합쳐져 있음으로)*/}
      
      {/* Header.css 가 아닌 Header.module.css 를 사용하면 import를 사용해 객체로 클래스를 명시해야 적용이 된다. */}
      <h1 class={style.paragraph}>ReactArt</h1>
      <p>A community of artists and art-lovers.</p>
    </header>
  );
}
