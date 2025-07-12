import logo from '../assets/logo.png';
// import style from "./Header.module.css" // Header.jsx 에 필요한 css를 분리해서 관리하는 것이 좋다.(vanilla css)
import {styled} from "styled-components"

// styled comopnent 는 scss 문법을 지원한다! 
// 덕분에 미디어쿼리 등 일반적이지 않은 css 또한 기존의 vanilla css 를 그냥 붙여넣기만 하면 된다.
const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 2rem;

  & img {
    object-fit: contain;
    margin-bottom: 2rem;
    width: 11rem;
    height: 11rem;
  }


  & h1.paragraph {
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: 0.4em;
    text-align: center;
    text-transform: uppercase;
    color: #9a3412;
    font-family: 'Pacifico', cursive;
    margin: 0;
  }

  & p {
    text-align: center;
    color: #a39191;
    margin: 0;
  }
  
  @media (min-width: 768px) {
    margin-bottom: 4rem;

    & h1 {
      font-size: 2.25rem;
    }
  }
`

export default function Header() {
  return (
    <HeaderContainer>
      <img src={logo} alt="A canvas" />
      {/* 인라인 스타일 장점: 빠르고 쉽게 JSX 에 스타일을 부여할 수 있음 / 스코프가 가능하며 동적으로 스타일 부여가 가능함*/}
      {/* 인라인 스타일 단점: 모든 요소를 개별적으로 스타일해아함 / 디자이너가 스타일을 직접 수정할 때 어려움이 있음(JSX 코드에 합쳐져 있음으로)*/}
      
      {/* Header.css 가 아닌 Header.module.css 를 사용하면 import를 사용해 객체로 클래스를 명시해야 적용이 된다. */}
      {/* 빌드 과정중에 Header.module.css 의 클래스명이 모두 고유한 값으로 변형되기 때문이다.  */}
      {/* <h1 class={style.paragraph}>ReactArt</h1> */}
      
      <h1 className="paragraph">ReactArt</h1>
      <p>A community of artists and art-lovers.</p>
    </HeaderContainer>
  );
}
