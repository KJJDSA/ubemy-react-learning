import { Fragment } from "react/jsx-runtime"

export default function Tabs({
  children, 
  buttons, // buttons는 일반값을 담은 속성이 아닌 슬롯속성이다. 
  ButtonsContainer = "menu"}) { // 기본값을 설정함으로서 매번 기술하지 않아도 된다.
  // 컴포넌트 식별자(컴포넌트 함수명)을 Props로 보낼 수 있으며, 일반적인 HTML 요소 또한 가능하다.
  // 만약 div 문자열을 buttonsContainer로(소문자) 전달한다면, 변수선언을 통해 ButtonsContainer 으로 바꾸어줘야한다.
  //  const ButtonsContainer = buttonsContainer;
  // 이러한 wrapper 패턴은 컴포넌트의 유연성을 높여주는 중요한 개념이다. 
  return (
    <>
      <ButtonsContainer>
        {buttons} { /* 래퍼 컴포넌트에 속성을 많이 집어넣는것은 재사용성을 낮춘다. 컨텐츠와 속성을 추가하는 대신, 슬롯으로 넣어줄 수 있다. */}
      </ButtonsContainer>
      {children} {/* 부모컴포넌트에서 제어하는게 낫다. */}
    </>
  )
}