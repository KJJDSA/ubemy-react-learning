import { Fragment } from "react/jsx-runtime"

export default function Tabs({children, buttons}) {// buttons는 슬롯속성이다. 
  return (
    <>
      <menu>
        {buttons} { /* 래퍼 컴포넌트에 속성을 많이 집어넣는것은 재사용성을 낮춘다. 컨텐츠와 속성을 추가하는 대신, 슬롯으로 넣어줄 수 있다. */}
      </menu>
      {children} {/* 부모컴포넌트에서 제어하는게 낫다. */}
    </>
  )
}