# Styling React Apps
## Static & Dynamic Styling for Pretty Apps
- Styling with **Vanilla Css**
- Scoping Styles with **Css Mocules**
- Css-in-JS Styling with **"Styled Components"**
- Static & Dynimic (conditional) Styling
---
---

# 스타일링 리액트 앱

## 예쁜 앱을 위한 정적 & 동적 스타일링하기
- **Vanilla Css**로 스타일링하기
- **Css Mocules**로 스타일 범위 지정하기
- **“스타일 컴포넌트”**를 사용한 Css-in-JS 스타일링
- 정적 & 동적(조건부) 스타일링

## Styled Components 사용해보기
- sytled Components 라이브러리는 쉽고 빠르게 어플리케이션에 추가할 수 있는 스타일 라이브러리이다. 
- 글자 그대로 **스타일링이 완료된 컴포넌트** 라는 컨셉을 가지고 있으며, 미리 스타일링된 컴포넌트를 제작하고 그 컴포넌트를 리액트에 그대로 사용이 가능하다. 
  - 빌드 후에는 해당 컴포넌트에 고유한 클래스명이 부여되어, 빌드 시 생성된 클래스 스타일이 적용된다.(style 속성을 사용하지 않으므로 우선순위 조절에 용이)
  - 자바스크립트의 태그된 템플릿 리터럴(Tagged Template Literals) 을 사용해 리액트 컴포넌트의 props를 다룰수 있으며 동적인 스타일 생성이 가능하다.
  - 스타일 문법으로 가상선택자, 중첩문 등을 지원하기 때문에 scss처럼 스타일 작성을 할 수 있다.
- styled Components 에서 컴포넌트를 다루는 방법이 리액트와 상당히 동일하기에 개념충돌 없이 쉽게 적용할 수 있다. 
- vanilla css 와 다르게 스코프가 존재하기 때문에, 다른 컴포넌트에 동일하게 적용될 걱정을 하지 않아도 된다. 
- 단, css와 jsx간 분리가 뚜렷하며, 오직 스타일링을 위해 크고작은 래퍼 컴포넌트를 많이 만들어야 한다는 점은 단점으로 꼽힌다.ㄹㅇㄴ